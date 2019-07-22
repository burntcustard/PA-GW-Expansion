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
            // Based off gwc_storage_1.js
            var units = [
              '/pa/units/commanders/base_commander/base_commander.json'
            ];
            _.forEach(units, function(unit) {
                var id = (inventory.mods().length).toString();
                var regenWeap = unit + '.' + params.id + '.tool_weapon_torpedo.' + id;
                inventory.addMods([
                    {
                        file: unit,
                        path: 'tools.4.spec_id', // The torpedo weap (?)
                        op: 'clone',
                        value: regenWeap
                    },
                    // Weapon mods to turn the torpedo launcher into a pew pew weapon
                    {
                        file: regenWeap,
                        path: 'ammo_id',
                        op: 'replace',
                        value: [
                            {
                                'layer': 'WL_AnyLand',
                                'id': '/pa/units/land/assault_bot_adv/assault_bot_adv_ammo.json'
                            }
                        ]
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
                        path: 'tools.4.spec_id',
                        op: 'replace',
                        value: regenWeap
                    },
                    {
                        file: unit,
                        path: 'tools.4.spec_id',
                        op: 'tag',
                        value: ''
                    }
                ]);
            });
        }
    };
});
