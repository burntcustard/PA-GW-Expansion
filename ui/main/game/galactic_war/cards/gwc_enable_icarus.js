// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        type: function() { return 'units'; },
        describe: function(params) {
            return 'Enables building of the Icarus solar drone from basic air factories.<br><br>Icarus are mobile solar energy generators that can become formidable tesla gunships with suitable upgrade tech.';
        },
        summarize: function(params) {
            return 'Icarus Solar Drone';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_air_engine.png';
        },
        audio: function (parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_air'
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
            if (!inventory.hasCard('gwc_enable_icarus')) {
                chance = (dist <= 5 ? 400 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var mods = [];
            var units = [
                '/pa/units/air/solar_drone/solar_drone.json'
            ];
            _.forEach(units, function(unit) {
                inventory.addUnits([unit]);
                mods.push(
                    {
                        // Shrink the select icon 21 -> 20
                        file: unit,
                        path: 'selection_icon.diameter',
                        op: 'replace',
                        value: 20
                    },
                    {
                        // Make the units in formation not spread out so much 13.5 -> 11
                        file: unit,
                        path: 'mesh_bounds',
                        op: 'replace',
                        value: [
                            11,
                            10,
                            4
                        ]
                    }
                );
            });
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
