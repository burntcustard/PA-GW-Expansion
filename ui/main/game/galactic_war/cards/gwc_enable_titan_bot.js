// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'units'; },
        describe: function(params) {
            return 'Enables construction of the Atlas Titan, built via advanced bot fabricators.';
        },
        summarize: function(params) {
            return 'Atlas Titan';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_enable_titans.png';
        },
        audio: function(parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_titans_all'
            }
        },
        getContext: function(galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_titan_bot')) {
                // TODO: Make boss card
                chance = (2 < dist && dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/land/titan_bot/titan_bot.json'
            ]);
        }
    };
});
