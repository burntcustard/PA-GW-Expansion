define([
    "require"
], function(
    require
) {
    var deck = [
        'gwc_bomber_capacity',
        //'gwc_commander_regen', // Disabled due to passive_health_regen not working
        'gwc_commander_servo',
        'gwc_commander_uber_dox',
        'gwc_commander_uber_summon',
        'gwc_commander_uber_tesla',
        'gwc_enable_booms',
        'gwc_enable_defenses_t1',
        'gwc_enable_defenses_t2',
        'gwc_enable_drifters',
        'gwc_enable_icarus',
        'gwc_enable_infernos',
        'gwc_enable_kaiju',
        'gwc_enable_lob_booms',
        'gwc_enable_lob_dox',
        'gwc_enable_sparks',
        'gwc_enable_t2_air',
        'gwc_enable_t2_bots',
        'gwc_enable_t2_naval',
        'gwc_enable_t2_vehicles',
        'gwc_enable_titan_air',
        'gwc_enable_titan_bot',
        'gwc_enable_titan_orbital',
        'gwc_enable_titan_structure',
        'gwc_enable_titan_vehicle',
        'gwc_flamethrower_gunships',
        'gwc_flamethrower_range',
        'gwc_flamethrower_slammers',
        'gwc_health_vehicles',
        'gwc_hover_upgrade',
        'gwc_icarus_gunships',
        'gwc_jumpy_booms',
        'gwc_laser_tanks_t1',
        'gwc_minion',
        'gwc_overcharged_tesla'
    ];

    var aiDeck = [
        'gwc_add_card_slot',
        'gwc_combat_structures',
        'gwc_combat_vehicles',
        'gwc_combat_sea',
        'gwc_combat_air',
        'gwc_combat_commander',
        'gwc_combat_bots',
        'gwc_combat_orbital',
        'gwc_enable_air_all',
        'gwc_enable_bots_all',
        'gwc_enable_artillery',
        'gwc_enable_defenses_t2',
        'gwc_enable_orbital_all',
        'gwc_enable_sea_all',
        'gwc_enable_super_weapons',
        'gwc_enable_vehicles_all',
        'gwc_bld_efficiency_cdr',
        'gwc_bld_efficiency_fabs',
        'gwc_storage_1',
        'gwc_storage_and_buff',
        'gwc_minion'
    ];

    var extraDeck = [
        'gwc_start_gwe',
        'gwc_start_vehicle',
        'gwc_start_air',
        'gwc_start_bot',
        'gwc_start_orbital',
        'gwc_start_artillery',
        'gwc_start_subcdr',
        'gwc_start_combatcdr',
        'gwc_start_allfactory'
    ];

    var cards = [];
    var aiCards = [];
    var extraCards = {};
    var cardContexts = {};

    var loadCount = deck.length + aiDeck.length + extraDeck.length;
    var loaded = $.Deferred();

    var saveDeck = deck;
    deck = [];
    _.forEach(saveDeck, function (cardId) {
        //console.log("Saving deck?");
        //api.debug.log('ADDING CARD: '+cardId);
        require(['cards/' + cardId], function (card) {
            card.id = cardId;
            cards.push(card);
            deck.push(cardId);
            if (--loadCount === 0)
                loaded.resolve();
        });
    })

    var saveAIDeck = aiDeck;
    aiDeck = [];
    _.forEach(saveAIDeck, function(cardId) {
        require(['cards/' + cardId], function(card) {
            card.id = cardId;
            aiCards.push(card);
            aiDeck.push(cardId);
            if (--loadCount === 0)
                loaded.resolve();
        });
    })

    _.forEach(extraDeck, function(cardId) {
        require(['cards/' + cardId], function(card) {
            card.id = cardId;
            extraCards[cardId] = card;
            if (--loadCount === 0)
                loaded.resolve();
        });
    })

    var allCards = [];
    var allDeck = [];
    loaded.then(function() {
        allCards = cards.concat(aiCards).concat(_.values(extraCards));
        allDeck = deck.concat(aiDeck).concat(extraDeck);
    });

    return {
        deal: function (params) {
            var galaxy = params.galaxy;
            var inventory = params.inventory;
            var ready = params.ready;
            var rng = params.rng || new Math.seedrandom();

            var result = $.Deferred();

            var run = function() {
                //api.debug.log("DEALER");
                var remainingAICards = aiCards.slice(0);
                var remainingAIDeck = aiDeck.slice(0);

                _.forEach(allCards, function(card) {
                    if (card.getContext && !cardContexts[card.id])
                        cardContexts[card.id] = card.getContext(galaxy, inventory);
                });

                var CARDS_PER_NORMAL_SYSTEM = 3;
                var CARDS_PER_LOADOUT_SYSTEM = 1;
                var first_pass = true;

                var loadout_systems = {};

                var dealCardToEachSystem = function () {

                    _.forEach(galaxy.stars(), function (system, systemIndex) {

                        var systemCards = [];
                        var systemDeck = [];
                        var fullHand = [];
                        var hand = [];
                        var resultIndex = undefined;
                        var predealtCard = false;

                        if (first_pass && !_.isEmpty(system.cardList())) {

                            var preCard = system.cardList()[0];
                            if (!_.isString(preCard))
                                return; // If the system already has a card, consider it dealt

                            loadout_systems[system.name()] = true;
                            predealtCard = true;

                            var extra = extraCards[preCard];
                            if (extra && extra.getContext && !cardContexts[preCard])
                                cardContexts[preCard] = extra.getContext(galaxy, inventory);
                            var context = cardContexts[preCard];
                            var deal = extra && extra.deal(system, context);
                            if (deal && _.isObject(deal)) {
                                systemCards = [extra];
                                systemDeck = [preCard];

                                fullHand = [deal];
                                hand = fullHand;
                                resultIndex = 0;
                            }
                        }

                        if (!hand.length)
                        {
                            var aiSystem = (system.ai() && !!remainingAICards.length);
                            var bossSystem = aiSystem && system.ai().boss;
                            systemCards = bossSystem ? remainingAICards : cards;
                            systemDeck = bossSystem ? remainingAIDeck : deck;

                            fullHand = _.map(systemCards, function(card, cardIndex) {
                                var context = cardContexts[card.id];
                                var match = _.any(system.cardList(), function (element) {
                                    return element.id === card.id;
                                });

                                var result = card.deal && card.deal(system, context, inventory);

                                // Stops two identical cards being in the same set to choose from?
                                if (match)
                                    result.chance = 0;

                                return result;
                            });
                            hand = _.map(fullHand, function(deal, index) {
                                if (!_.isObject(deal))
                                    return;
                                deal.index = index;
                                return deal;
                            });
                            hand = _.filter(hand, 'chance');
                        }

                        if (hand.length) {
                            if (resultIndex === undefined) {
                                var probability = _.reduce(hand, function(sum, card) {
                                    return sum + card.chance;
                                }, 0);
                                var roll = rng() * probability;
                                var index = 0;
                                for(; roll >= hand[index].chance && index < hand.length; ++index) {
                                    roll -= hand[index].chance;
                                }
                                if (index < hand.length) {
                                    var result = hand[index];
                                    resultIndex = result.index;
                                }
                            }
                            if (resultIndex !== undefined) {
                                var resultDeal = fullHand[resultIndex];
                                var params = resultDeal && resultDeal.params;
                                var cardId = systemDeck[resultIndex];
                                var systemCard = {
                                    id: cardId
                                };

                                if (params && _.isObject(params))
                                    _.extend(systemCard, params);

                                if (predealtCard)
                                    system.cardList([]);

                                var boss = loadout_systems[system.name()];
                                var done = boss
                                        ? system.cardList().length === CARDS_PER_LOADOUT_SYSTEM
                                        : system.cardList().length === CARDS_PER_NORMAL_SYSTEM;

                                if (!done)
                                    system.cardList().push(systemCard);
                            }
                        }

                        _.forEach(fullHand, function(params, index) {
                            var card = systemCards[index];
                            var cardId = systemDeck[index];
                            var context = cardContexts[cardId];
                            if (index === resultIndex) {
                                //api.debug.log("Keep: " + cardId);
                                card.keep && card.keep(params, context);
                            }
                            else {
                                card.discard && card.discard(params, context);
                            }
                        });

                        // Remove AI cards from the deck
                        if (system.ai()) {
                            remainingAICards.splice(index, 1);
                            remainingAIDeck.splice(index, 1);
                        }
                    });

                    first_pass = false;
                };

                _.times(CARDS_PER_NORMAL_SYSTEM, dealCardToEachSystem);

                _.forEach(allCards, function(card, index) {
                    var cardId = allDeck[index];
                    var context = cardContexts[cardId];
                    card.releaseContext && card.releaseContext(context);
                    if (context)
                        delete cardContexts[cardId];
                });

                if (ready)
                    ready();
                result.resolve();
            };

            loaded.then(run);
            return result.promise();
        },

        // Do everything necessary to deal a single card
        // params: (example)
        //      {
        //          id: 'gwc_minion',
        //          galaxy: game.galaxy(),
        //          inventory: game.inventory(),
        //          star: game.galaxy().stars()[0]
        //      }
        dealCard: function (params) {
            var result = $.Deferred();
            loaded.then(function() {
                var allCards = cards.concat(aiCards).concat(_.values(extraCards));
                var card = _.find(allCards, { id: params.id });

                // Simulate a deal
                var context = card.getContext && card.getContext(params.galaxy, params.inventory);

                var deal = (card.deal && card.deal(params.star, context));

                //console.log("Dealing this card out to a star:");
                //console.log(card);

                var product = {
                    id: params.id
                };
                var cardParams = deal && deal.params;
                if (cardParams && _.isObject(cardParams))
                    _.extend(product, cardParams);

                var tempType = (card.type && card.type()) || 'noTypeSad';
                _.extend(product, { type: tempType });

                card.keep && card.keep(deal, context);
                card.releaseContext && card.releaseContext(context);

                result.resolve(product, deal);

            });
            return result;
        },

        dealBossCards: function (params /* galaxy inventory */) {
            var inventory = params.inventory;
            var galaxy = params.galaxy;
            var result = $.Deferred();

            loaded.then(function () {
                var allCards = cards.concat(aiCards).concat(_.values(extraCards));
                _.forEach(galaxy.stars(), function (star) {
                    _.forEach(star.cardList(), function (id, cardIndex) {
                        var card = _.find(allCards, { id: id });
                        // Simulate a deal
                        //console.log("Trying to load a boss card: ");
                        //console.log(card);
                        var context = card.getContext && card.getContext(params.galaxy, params.inventory);

                        var deal = (card.deal && card.deal(params.star, context));
                        var product = { id: id };
                        var cardParams = deal && deal.params;
                        if (cardParams && _.isObject(cardParams))
                            _.extend(product, cardParams);
                        card.keep && card.keep(deal, context);
                        card.releaseContext && card.releaseContext(context);

                        star.cardList()[cardIndex] = product;
                    });
                });

                result.resolve({});
            });

            return result;
        },

        chooseCards: function (params) {
            var inventory = params.inventory;
            var ready = params.ready;
            var rng = params.rng || new Math.seedrandom();
            var count = params.count;
            var star = params.star;
            var galaxy = params.galaxy;

            var start = _.now();

            var result = $.Deferred();
            loaded.then(function () {

                _.forEach(allCards, function (card) {
                    if (card.getContext && !cardContexts[card.id])
                        cardContexts[card.id] = card.getContext(galaxy, inventory);
                });

                var list = [];

                _.times(count, function () {

                    var fullHand = [];
                    var hand = [];

                    fullHand = _.map(cards, function (card, cardIndex) {
                        var context = cardContexts[card.id];

                        var match = inventory.hasCard(card.id) || _.any(list, function (element) {
                            return element.id === card.id;
                        });

                        var result = card.deal && card.deal(star, context, inventory);

                        var tempType = (card.type && card.type()) || 'noTypeSad';
                        _.extend(result, { type: tempType });

                        if (match)
                            result.chance = 0;

                        return result;
                    });

                    fullHand = _.map(fullHand, function (deal, index) {
                        deal.index = index;
                        return deal;
                    });

                    hand = _.filter(fullHand, function (deal) {
                        if (!deal)
                            return false;

                        if (!deal.chance)
                            return false;

                        return true;
                    });

                    if (hand.length) {
                        var resultIndex;

                        var probability = _.reduce(hand, function (sum, card) {
                            return sum + card.chance;
                        }, 0);
                        var roll = rng() * probability;
                        var index = 0;
                        for (; roll >= hand[index].chance && index < hand.length; ++index) {
                            roll -= hand[index].chance;
                        }
                        if (index < hand.length) {
                            var result = hand[index];
                            resultIndex = result.index;
                        }

                        if (resultIndex !== undefined) {
                            var resultDeal = fullHand[resultIndex];
                            var params = resultDeal && resultDeal.params;
                            var type = resultDeal.type;
                            var cardId = deck[resultIndex];
                            var systemCard = {
                                id: cardId
                            };

                            if (params && _.isObject(params))
                                _.extend(systemCard, params);

                            _.extend(systemCard, { type: type });

                            list.push(systemCard);
                        }
                    }

                });

                result.resolve(list);
            });
            return result;
        },

        allCards: function() {
            var result = $.Deferred();
            loaded.then(function() {
                var allCards = cards.concat(aiCards).concat(_.values(extraCards));
                result.resolve(allCards);
            });
            return result;
        },
        addCards: function(ids) {
          var myLoad = $.Deferred();
          var count = ids.length;
          _.forEach(ids, function (cardId) {
              //api.debug.log('ADDING CARD: '+cardId);
              console.log("Adding Normal card: " + cardId);
              require(['cards/' + cardId], function (card) {
                  card.id = cardId;
                  cards.push(card);
                  deck.push(cardId);
                  if (--count === 0)
                      myLoad.resolve();
              });
          })
          return $.when(loaded, myLoad).then(function() {
            allCards = cards.concat(aiCards).concat(_.values(extraCards));
            allDeck = deck.concat(aiDeck).concat(extraDeck);
          })
        },
        removeCards: function(ids) {
          deck = _.difference(deck, ids);
          cards = cards.filter(function(card) {
            return ids.indexOf(card.id) == -1
          })
          return loaded.then(function() {
            allCards = cards.concat(aiCards).concat(_.values(extraCards));
            allDeck = deck.concat(aiDeck).concat(extraDeck);
          })
        },
        addAiCards: function(ids) {
          var myLoad = $.Deferred();
          var count = ids.length;
          _.forEach(ids, function (cardId) {
              //api.debug.log('ADDING CARD: '+cardId);
              console.log("Adding AI card: " + cardId);
              require(['cards/' + cardId], function (card) {
                  card.id = cardId;
                  aiCards.push(card);
                  aiDeck.push(cardId);
                  if (--count === 0)
                      myLoad.resolve();
              });
          })
          return $.when(loaded, myLoad).then(function() {
            allCards = cards.concat(aiCards).concat(_.values(extraCards));
            allDeck = deck.concat(aiDeck).concat(extraDeck);
          })
        },
        removeAiCards: function(ids) {
          aiDeck = _.difference(aiDeck, ids);
          aiCards = aiCards.filter(function(card) {
            return ids.indexOf(card.id) == -1
          })
          return loaded.then(function() {
            allCards = cards.concat(aiCards).concat(_.values(extraCards));
            allDeck = deck.concat(aiDeck).concat(extraDeck);
          })
        },
        addStartCards: function(ids) {
          var myLoad = $.Deferred();
          var count = ids.length;
          _.forEach(ids, function(cardId) {
              console.log("Adding start card: " + cardId);
              require(['cards/' + cardId], function(card) {
                  card.id = cardId;
                  extraCards[cardId] = card;
                  extraDeck.push(cardId);
                  if (--count === 0)
                      myLoad.resolve();
              })
          })
          return $.when(loaded, myLoad).then(function() {
            allCards = cards.concat(aiCards).concat(_.values(extraCards));
            allDeck = deck.concat(aiDeck).concat(extraDeck);
          })
        },
        // note that factions will need to be updated to not name removed cards
        removeStartCards: function(ids) {
          extraDeck = _.difference(extraDeck, ids);
          ids.forEach(function(cardId) {
            console.log("Removing start card: " + cardId);
            delete extraCards[cardId];
          })
          return loaded.then(function() {
            allCards = cards.concat(aiCards).concat(_.values(extraCards));
            allDeck = deck.concat(aiDeck).concat(extraDeck);
          })
        },
    };
});
