// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'commanderPassive',
        describe: 'Commander Regen Tech automatically repairs the commander 1% every 3 seconds and makes it much cheaper to repair with fabricators.',
        summarize: 'Commander Regen Tech',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_commander_armor.png',
        audio: '/VO/Computer/gw/board_tech_available_armor',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_commander_regen')) {
                chance = (dist <= 5) ? 40:0;
            }
            return { chance: 999 };
        },
        buff: function(inventory, params) {
            // gwc_storage_1.js helped, a little

            var ammoMods = [];

            // Clone the base bot ammo into a 'regen_ammo' copy
            var oldWeap = '/pa/units/commanders/base_commander/base_commander_tool_aa_weapon.json';
            var regenAmmo = oldWeap + '.regen_ammo';
            ammoMods.push(
                {
                    file: oldWeap,
                    path: 'ammo_id',
                    op: 'clone',
                    value: regenAmmo
                }
            );

            // Convert the ammo into regen ammo
            var regenAmmoStats = {
                'ammo_type': 'PBAOE',
                'damage': 1,
                'damage_volume': {
                  'initial_radius': 1.0
                },
                'splash_damages_allies': true,
                'splash_radius': 1,
                'armor_damage_map': {
                  'AT_Air': 0,
                  'AT_Bot': 0,
                  'AT_Commander': -60,
                  'AT_Naval': 0,
                  'AT_None': 0,
                  'AT_Orbital': 0,
                  'AT_Structure': 0,
                  'AT_Vehicle': 0
                }
            };
            for (var prop in regenAmmoStats) {
                ammoMods.push({
                    file: regenAmmo,
                    path: prop,
                    op: 'replace',
                    value: regenAmmoStats[prop]
                });
            }

            inventory.addMods(ammoMods);

            var mods = [];

            var units = [
                '/pa/units/commanders/base_commander/base_commander.json'
            ];

            _.forEach(units, function(unit) {
                var regenWeap = unit + '.regen_weapon';

                // Clone the commanders AA weapon into a 'regen_weapon' copy

                mods.push(
                    {
                        file: unit,
                        path: 'tools.3.spec_id', // The aa weap (hopefully?)
                        op: 'clone',
                        value: regenWeap
                    }
                );

                // Convert the new weapon into a regen weapon
                var regenWeapStats = {
                    'ammo_id': regenAmmo,
                    'ammo_source': 'time',
                    'ammo_capacity': 0,
                    'ammo_demand': 0,
                    'ammo_per_shot': 0,
                    'start_fully_charged': false,
                    'rate_of_fire': 1,
                    'max_range': 0,
                    'yaw_rate': 0,
                    'pitch_rate': 0,
                    'yaw_range': 0,
                    'pitch_range': 0,
                    'firing_arc_yaw': 360,
                    'firing_arc_pitch': 360,
                    'fire_delay': 0,
                    'auto_fire_when_charged': true
                };
                for (var prop in regenWeapStats) {
                    mods.push({
                        file: regenWeap,
                        path: prop,
                        op: 'replace',
                        value: regenWeapStats[prop]
                    });
                }

                mods.push(
                    {
                        file: regenWeap,
                        path: 'target_layers',
                        op: 'replace',
                        value: [
                            'WL_WaterSurface',
                            'WL_Underwater',
                            'WL_Seafloo'
                        ]
                    },
                    {
                        file: regenWeap,
                        path: 'ammo_id',
                        op: 'tag'
                    }
                );

                // Give the new weapon to the commander
                mods.push(
                    {
                        file: unit,
                        path: 'tools',
                        op: 'push',
                        value: {
                          'spec_id': regenWeap,
                          'aim_bone': 'bone_turret',
                          'muzzle_bone': 'socket_rightMuzzle',
                          'primary_weapon': false,
                          'show_range': false
                        }
                    },
                    {
                        file: unit,
                        path: 'tools.last.spec_id',
                        op: 'tag',
                        value: ''
                    },
                    {
                        file: unit,
                        path: 'tools.last.aim_bone',
                        op: 'replace',
                        value: 'bone_root'
                    },
                    {
                        file: unit,
                        path: 'tools.last.fire_event',
                        op: 'replace',
                        value: 'fired3'
                    },
                    {
                        file: unit,
                        path: 'tools.last.record_index',
                        op: 'replace',
                        value: -1
                    }
                );

            });

            // Actually do all the things mentioned before
            inventory.addMods(mods);
        }
    };
});
