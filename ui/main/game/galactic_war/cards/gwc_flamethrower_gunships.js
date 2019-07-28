// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'upgrades',
        describe: 'Replaces the Kestrel gunship with the flamethrower-wiedling Fire Raptor. Built by advanced Air Factories.',
        summarize: 'Fire Raptor Gunship',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_combat_air.png',
        audio: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_flamethrower_gunships') &&
                inventory.hasCard('gwc_enable_t2_air')) {
                chance = (dist >= 4) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            var unit = '/pa/units/air/gunship/gunship.json';
            inventory.addMods([
                {
                    file: unit,
                    path: 'display_name',
                    op: 'replace',
                    value: 'Fire Raptor'
                },
                {
                    file: unit,
                    path: 'description',
                    op: 'replace',
                    value: 'Fire Raptor Gunship- Devastating short range anti-ground.'
                },
                {
                    // 300 -> 450 HP
                    file: unit,
                    path: 'max_health',
                    op: 'multiply',
                    value: 1.5
                },
                {
                    // 600 -> 900 build cost
                    file: unit,
                    path: 'build_metal_cost',
                    op: 'multiply',
                    value: 1.5
                },
                {
                    file: unit,
                    path: 'navigation.aggressive_distance',
                    op: 'replace',
                    value: 20
                },
                {
                    file: unit,
                    path: 'events.fired',
                    op: 'replace',
                    value: {
                        "audio_cue":"/SE/Weapons/veh/tank_flame",
                        "effect_spec":"/pa/units/land/tank_armor/tank_armor_muzzle_flame.pfx socket_rightMuzzle /pa/units/land/tank_armor/tank_armor_muzzle_flame.pfx socket_leftMuzzle"
                    }
                },
                {
                    file: unit,
                    path: 'events.died',
                    op: 'replace',
                    value: {
                      "audio_cue":"/SE/Impacts/bomb_bot_plasma",
                      "effect_spec":"/pa/units/land/bot_bomb/bot_bomb_ammo_explosion.pfx"
                    }
                },
                {
                    file: unit,
                    path: 'tools',
                    op: 'replace',
                    value: [
                        {
                          "spec_id":"/pa/units/land/tank_armor/tank_armor_tool_weapon.json",
                          "aim_bone":"bone_rightRecoil",
                          "muzzle_bone":"socket_rightMuzzle"
                        },
                        {
                          "spec_id":"/pa/units/land/tank_armor/tank_armor_tool_weapon.json",
                          "aim_bone":"bone_leftRecoil",
                          "muzzle_bone":"socket_leftMuzzle"
                        }
                    ]
                }
            ]);
        }
    };
});
