// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'upgrades'; },
        describe: function(params) {
            return 'Replaces the Slammer Assault Bot with the flamethrower-wiedling _____. Built by advanced Bot Factories.';
        },
        summarize: function(params) {
            return 'Flamethrower Slammer';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png';
        },
        audio: function(parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_bot'
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
            if (!inventory.hasCard('gwc_flamethrower_slammers') &&
                inventory.hasCard('gwc_enable_t2_bots')) {
                chance = (dist >= 4) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var unit = '/pa/units/land/assault_bot_adv/assault_bot_adv.json';
            inventory.addMods([
                {
                    file: unit,
                    path: 'display_name',
                    op: 'replace',
                    value: 'Flamethrower Slammer'
                },
                {
                    file: unit,
                    path: 'description',
                    op: 'replace',
                    value: 'Advanced Assault Bot- Devastating short range anti-ground.'
                },
                {
                    // 400 -> 600 HP
                    file: unit,
                    path: 'max_health',
                    op: 'multiply',
                    value: 1.5
                },
                {
                    // 500 -> 550 build cost
                    file: unit,
                    path: 'build_metal_cost',
                    op: 'multiply',
                    value: 1.1
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
                    path: 'tools.0.spec_id',
                    op: 'replace',
                    value: '/pa/units/land/tank_armor/tank_armor_tool_weapon.json'
                }
            ]);
        }
    };
});
