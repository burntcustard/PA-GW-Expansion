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
                var id = (inventory.mods().length).toString();
                var regenWeap = unit + '.regen_weapon.' + id;
                inventory.addMods([
                    {
                        file: unit,
                        path: 'tools.3.spec_id', // The aa weap (?)
                        op: 'clone',
                        value: regenWeap
                    },
                    // Make sure the old weapon doesn't vanish
                    // {
                    //     file: unit,
                    //     path: 'tools.3.spec_id',
                    //     op: 'replace',
                    //     value: '/pa/units/commanders/base_commander/base_commander_tool_aa_weapon.json'
                    // },
                    // {
                    //     file: unit,
                    //     path: 'tools.3.spec_id',
                    //     op: 'tag',
                    //     value: ''
                    // },
                    // Mods to turn aa weapon into a pew pew weapon
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
