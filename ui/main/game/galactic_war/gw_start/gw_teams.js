define([
    'main/game/galactic_war/shared/js/systems/template-loader',
    'shared/gw_factions',
    'shared/gw_inventory'
], function(
    activeStarSystemTemplates,
    GWFactions,
    GWInventory
) {
    return {
        getTeam: function(index) {
            var faction = GWFactions[index],
                team = _.sample(faction.teams);
            return _.extend({}, team, {
                color: faction.color,
                faction: faction,
                remainingMinions: _.clone(faction.minions)
            });
        },

        makeBoss: function(star, ai, team, sst) {
            if (team.boss) {
                _.assign(ai, team.boss);
            }
            else {
                ai.econ_rate = ai.econ_rate * 2;
            }
            if (team.bossCard) {
                star.cardList().push(team.bossCard);
            }
            if (team.systemTemplate) {
                var generatorConfig = {
                    name: team.systemTemplate.name,
                    template: {
                        Planets: team.systemTemplate.Planets
                    }
                };
                return activeStarSystemTemplates().generate(generatorConfig)
                    .then(function(system) {
                        if (team.systemDescription)
                            system.description = team.systemDescription;
                        system.biome = system.planets[0].generator.biome;
                        star.system(system);
                        return ai;
                    });
            }
            else
                return $.when(ai);
        },

        makeWorker: function(star, ai, team) {
            console.log("Making a worker");

            ai.ownCards = ['gwc_commander_servo2'];

            // New stuff trying to give cards to AI
            ai.inventory = ko.observable(new GWInventory());

            console.log("Made the ai have an inventory wohoo?");
            console.log(JSON.stringify(ai.inventory()));

            if (ai.ownCards && ai.ownCards[0]) {
                console.log("Giving the cards to the AI inventory");
                _.forEach(ai.ownCards, function(card) {
                    console.log("Adding card: " + card);
                    ai.inventory().cards.push(card);
                });
                console.log("Now the AI has these cards(?):");
                console.log(JSON.stringify(ai.inventory().cards);
                console.log("Applying all the AI cards(?)");
                ai.inventory().applyCards();
                console.log("AI mods:");
                console.log(JSON.stringify(ai.inventory().mods));
                console.log(JSON.stringify(ai.inventory().mods()));
            }

            if (team.workers) {
                _.assign(ai, _.sample(team.workers));
            } else if (team.remainingMinions) {
                var minion = _.sample(team.remainingMinions.length ? team.remainingMinions : team.faction.minions)
                _.assign(ai, minion);
                _.remove(team.remainingMinions, function(minion) { return minion.name === ai.name; });
            }
            // if (team.ownCards) {
            //     console.log("Team has own cards so trying to give them to the AI");
            //     ai.ownCards = team.ownCards;
            // }
            return $.when(ai);
        }
    };
});
