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
            //
            // With no tag, nothing happens.
            // with tag, no commander spawns(!?)
            // Just replacing AA instead of pushing works though hmm
            var units = [
              '/pa/units/commanders/base_commander/base_commander.json'
            ];
            _.forEach(units, function(unit) {
                var regenWeap = unit + '.regen_weapon';
                var regenWeapStats = {
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
                var mods = [
                    {
                        file: unit,
                        path: 'tools.3.spec_id', // The aa weap (?)
                        op: 'clone',
                        value: regenWeap
                    }
                ];
                for (var prop in regenWeapStats) {
                    mods.push({
                        file: regenWeap,
                        path: prop,
                        op: 'replace',
                        value: regenWeapStats[prop]
                    });
                }
                inventory.addMods([
                    {
                        file: unit,
                        path: 'tools.3.spec_id', // The aa weap (?)
                        op: 'clone',
                        value: regenWeap
                    },
                    // Mods to turn aa weapon into regen weapon

                    {
                        file: regenWeap,
                        path: 'ammo_source',
                        op: 'replace',
                        value: 'time'
                    },
                    {
                        file: regenWeap,
                        path: 'ammo_capacity',
                        op: 'replace',
                        value: '0'
                    },
                    {
                        file: regenWeap,
                        path: 'ammo_demand',
                        op: 'replace',
                        value: '0'
                    },
                    {
                        file: regenWeap,
                        path: 'ammo_per_shot',
                        op: 'replace',
                        value: '0'
                    },
                    {
                        file: regenWeap,
                        path: 'start_fully_charged',
                        op: 'replace',
                        value: 'false'
                    },
                    {
                        file: regenWeap,
                        path: 'rate_of_fire',
                        op: 'replace',
                        value: '1'
                    },
                    {
                        file: regenWeap,
                        path: 'max_range',
                        op: 'replace',
                        value: '0'
                    },
                    {
                        file: regenWeap,
                        path: 'yaw_rate',
                        op: 'replace',
                        value: '0'
                    },
                    {
                        file: regenWeap,
                        path: 'pitch_rate',
                        op: 'replace',
                        value: '0'
                    },
                    {
                        file: regenWeap,
                        path: '',
                        op: 'replace',
                        value: ''
                    },
                    {
                        file: regenWeap,
                        path: '',
                        op: 'replace',
                        value: ''
                    },
                    {
                        file: regenWeap,
                        path: '',
                        op: 'replace',
                        value: ''
                    },
                      //
                    {
                        file: regenWeap,
                        path: 'ammo_id',
                        op: 'replace',
                        value: '/pa/units/land/assault_bot_adv/assault_bot_adv_ammo.json'
                    },
                    {
                        file: regenWeap,
                        path: 'rate_of_fire',
                        op: 'replace',
                        value: 8
                    },
                    {
                        file: regenWeap,
                        path: 'target_layers',
                        op: 'replace',
                        value: [
                            'WL_LandHorizontal',
                            'WL_WaterSurface'
                        ]
                    },
                    // Give the new weapon to the commander
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
                    }
                ]);
            });
        }
    };
});
