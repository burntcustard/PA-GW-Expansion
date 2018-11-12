// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        type: function() { return 'units'; },
        describe: function(params) {
            return 'Enables building of the Spark bot from basic bot factories.';
        },
        summarize: function(params) {
            return 'Sparks';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png';
        },
        audio: function (parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_bot'
            }
        },
        getContext: function (galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function (system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_sparks')) {
                chance = (dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/land/bot_tesla/bot_tesla.json'
            ]);
        },
        dull: function(inventory) {
        }
    };
});
