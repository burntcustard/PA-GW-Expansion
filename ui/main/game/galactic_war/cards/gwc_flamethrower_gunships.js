define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'upgrades'; },
        describe: function(params) {
            return 'Replaces the Kestrel gunship with the flamethrower-wiedling Phoenix. Built by advanced Air Factories.';
        },
        summarize: function(params) {
            return 'Phoenix Gunship';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_combat_air.png';
        },
        audio: function (parms) {
            return {
                found: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade'
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
            if (!inventory.hasCard('gwc_flamethrower_gunships') &&
                inventory.hasCard('gwc_enable_air_t2')) {
                chance = (dist >= 4) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var mods = [];
            mods.push({
                file: '/pa/units/air/gunship/gunship.json',
                path: 'display_name',
                op: 'replace',
                value: 'Phoenix'
            },
            {
                file: '/pa/units/air/gunship/gunship.json',
                path: 'description',
                op: 'replace',
                value: 'Phoenix Gunship: Strong short range anti-ground.'
            },
            {
                // 300 to 450 HP
                file: '/pa/units/air/gunship/gunship.json',
                path: 'max_health',
                op: 'multiply',
                value: 1.5
            },
            {
                // 600 to 900 build cost
                file: '/pa/units/air/gunship/gunship.json',
                path: 'build_metal_cost',
                op: 'multiply',
                value: 1.5
            },
            {
                file: '/pa/units/air/gunship/gunship.json',
                path: 'navigation.aggressive_distance',
                op: 'replace',
                value: 20
            },
            {
                file: '/pa/units/air/gunship/gunship.json',
                path: 'events.fired',
                op: 'replace',
                value: {
                    "audio_cue":"/SE/Weapons/veh/tank_flame",
                    "effect_spec":"/pa/units/land/tank_armor/tank_armor_muzzle_flame.pfx socket_rightMuzzle /pa/units/land/tank_armor/tank_armor_muzzle_flame.pfx socket_leftMuzzle"
                }
            },
            {
                file: '/pa/units/air/gunship/gunship.json',
                path: 'events.died',
                op: 'replace',
                value: {
                  "audio_cue":"/SE/Impacts/bomb_bot_plasma",
                  "effect_spec":"/pa/units/land/bot_bomb/bot_bomb_ammo_explosion.pfx"
                }
            },
            {
                file: '/pa/units/air/gunship/gunship.json',
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
            });
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
