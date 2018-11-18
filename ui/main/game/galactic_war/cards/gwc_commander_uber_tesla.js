define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'commanderSecondary'; },
        describe: function(params) {
            return 'A powerful Uber Tesla Gun';
        },
        summarize: function(params) {
            return 'Uber Tesla Gun';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_energy.png';
        },
        audio: function(parms) {
            return {
                found: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade'
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
            if (!inventory.hasCard('gwc_commander_uber_tesla')) {
                chance = (dist >= 2) ? 40:0;
            }
            return { chance: 9000 };
        },
        buff: function(inventory, params) {

            // This is an example of how to use duplicated specs.  This would
            // only be necessary if the build arms were being shared, which they
            // currently are not.
//            var units = [
//                '/pa/units/land/fabrication_bot/fabrication_bot.json',
//                '/pa/units/land/fabrication_bot_combat/fabrication_bot_combat.json',
//                '/pa/units/land/fabrication_vehicle/fabrication_vehicle.json',
//                '/pa/air/fabrication_aircraft/fabrication_aircraft.json',
//                '/pa/sea/fabrication_ship/fabrication_ship.json',
//            ];
//            var mods = [];
//            var modUnit = function(unit) {
//                var newBuildArm = unit + '.' + params.id + '.build_arm.' + (inventory.mods().length + mods.length).toString();
//                mods = mods.concat([{
//                    file: unit,
//                    path: 'tools.0.spec_id',
//                    op: 'clone',
//                    value: newBuildArm
//                }, {
//                    file: newBuildArm,
//                    path: 'construction_demand.energy',
//                    op: 'multiply',
//                    value: params.multiplier
//                }, {
//                    file: unit,
//                    path: 'tools.0.spec_id',
//                    op: 'replace',
//                    value: newBuildArm
//                }, {
//                    file: unit,
//                    path: 'tools.0.spec_id',
//                    op: 'tag',
//                    value: ''
//                }]);
            //            };

            var weap = '/pa/tools/uber_cannon/uber_cannon.json';
            var comm = '/pa/units/commanders/base_commander/base_commander.json';
            var teslaWeap = '/pa/units/air/titan_air/titan_air_tool_weapon.json';
            var teslaAmmo = '/pa/units/air/titan_air/titan_air_ammo.json';
            var uberTeslaAmmo = teslaAmmo + '.' + params.id;
            // console.log("uberTeslaAmmo: " + uberTeslaAmmo);

            var newBuildArm = comm + '.' + params.id + '.build_arm.' + (inventory.mods().length).toString();
            console.log("newBuildArm: " + newBuildArm);
            inventory.addMods([
                {
                    file: comm,
                    path: 'tools.0.spec_id',
                    op: 'clone',
                    value: newBuildArm
                },
                {
                    file: newBuildArm,
                    path: 'construction_demand.energy',
                    op: 'multiply',
                    value: 0.001
                },
                {
                    file: comm,
                    path: 'tools.0.spec_id',
                    op: 'replace',
                    value: newBuildArm
                },
                {
                    file: comm,
                    path: 'tools.0.spec_id',
                    op: 'tag',
                    value: ''
                }
            ]);

            inventory.addMods([
                {
                    // Re-add secondary fire
                    file: comm,
                    path: 'command_caps',
                    op: 'push',
                    value: 'ORDER_FireSecondaryWeapon'
                },
                {
                    file: teslaWeap,
                    path: 'ammo_id',
                    op: 'clone',
                    value: uberTeslaAmmo
                },
                {
                    // Change uber cannon ammo
                    file: weap,
                    path: 'ammo_id',
                    op: 'replace',
                    value: uberTeslaAmmo
                },
                {
                    file: weap,
                    path: 'ammo_id',
                    op: 'tag',
                    value: ''
                }
            ]);
        }
    };
});
