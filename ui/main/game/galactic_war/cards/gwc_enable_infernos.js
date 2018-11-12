// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        type: function() { return 'units'; },
        visible: function(params) { return true; },
        describe: function(params) {
            return 'Enables building of the Inferno Heavy Flamethrower Tank from basic vehicle factories.';
        },
        summarize: function(params) {
            return 'Inferno Heavy<br>Flamethrower Tank';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_vehicle.png';
        },
        audio: function (parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_vehicle'
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
            if (!inventory.hasCard('gwc_enable_infernos')) {
                chance = (dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/land/tank_armor/tank_armor.json'
            ]);
        },
        dull: function(inventory) {
        }
    };
});
