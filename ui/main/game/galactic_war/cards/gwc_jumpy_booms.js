// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'upgrades',
        describe: 'Gives Boom bots larger view distance and allows them to leap onto their enemies.',
        summarize: 'Leaping Boom bots',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png',
        audio: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_jumpy_booms') &&
                inventory.hasCard('gwc_enable_booms')) { // Only findable after booms unlocked
                chance = (dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addMods([
                // Boom bot
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb.json',
                    path: 'display_name',
                    op: 'replace',
                    value: 'Leaping Boom'
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb.json',
                    path: 'description',
                    op: 'replace',
                    value: 'Bomb bot- Self-Destructs to deal heavy damage over a small area. Jumps onto enemies.'
                },
                {
                    // Change explosion effect when the Boom dies (jumping or being killed).
                    file: '/pa/units/land/bot_bomb/bot_bomb.json',
                    path: 'events.died',
                    op: 'replace',
                    value: {
                      "audio_cue":"/SE/Death/Bot",
                      "effect_scale": 0.3,
                      "effect_spec": "/pa/effects/specs/default_explosion_bot.pfx"
                    }
                },
                {
                    // Make them a tiny bit slower to counteract the fast jumping 40 -> 38
                    file: '/pa/units/land/bot_bomb/bot_bomb.json',
                    path: 'navigation.move_speed',
                    op: 'replace',
                    value: 38
                },
                {
                    // Give 'em an aggressive distance so they attack from further away(?)
                    file: '/pa/units/land/bot_bomb/bot_bomb.json',
                    path: 'navigation.aggressive_distance',
                    op: 'replace',
                    value: 25
                },
                {
                    // Remove scorch mark when the Boom "jumps"
                    file: '/pa/units/land/bot_bomb/bot_bomb.json',
                    path: 'death.decals',
                    op: 'delete'
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb.json',
                    path: 'recon.observer',
                    op: 'replace',
                    value: {
                      "items":[
                        {
                          "channel": "sight",
                          "layer": "surface_and_air",
                          "radius": 30,
                          "shape": "capsule"
                        },
                        {
                          "channel": "sight",
                          "layer": "underwater",
                          "radius": 30,
                          "shape": "capsule"
                        }
                      ]
                    }
                },
                // Weapon
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                    path: 'rate_of_fire',
                    op: 'replace',
                    value: 1
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                    path: 'firing_standard_deviation',
                    op: 'replace',
                    value: 3
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                    path: 'max_range',
                    op: 'replace',
                    value: 27
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                    path: 'pitch_range',
                    op: 'replace',
                    value: 40
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                    path: 'pitch_rate',
                    op: 'replace',
                    value: 3600
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                    path: 'yaw_range',
                    op: 'replace',
                    value: 180
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                    path: 'yaw_rate',
                    op: 'replace',
                    value: 3600
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                    path: 'target_priorities',
                    op: 'replace',
                    value: [
                        "Fabber",
                        "MetalProduction",
                        "Structure - Wall",
                        "Mobile - Air",
                        "Wall"
                    ]
                },
                // Ammo (the tricky one)
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'damage_volume',
                    op: 'delete'
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'sim_fire_effect',
                    op: 'delete'
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'ammo_type',
                    op: 'replace',
                    value: 'AMMO_Projectile'
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'flight_type',
                    op: 'replace',
                    value: 'Ballistic'
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'physics',
                    op: 'replace',
                    value: {
                        "add_to_spatial_db": false,
                        "allow_underground": false,
                        "gravity_scalar": 10,
                        "radius": 1
                    }
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'spawn_layers',
                    op: 'replace',
                    value: 'WL_Air'
                },
                {
                    // Give the booms a fancy air streak tail thing when they jump
                    // Offsets probably needs tweaking to correctly emit from the center of the boom
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'fx_trail',
                    op: 'replace',
                    value: {
                        "filename": "/pa/effects/specs/shell_artillery_large_proj_trail.pfx",
                        "offset": [
                          0,
                          0,
                          0
                        ]
                    }
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'model.filename',
                    op: 'replace',
                    value: '/pa/units/land/bot_bomb/bot_bomb.papa'
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'recon',
                    op: 'replace',
                    value: {
                        "observer": {
                            items: [{
                                "channel": "sight",
                                "layer": "surface_and_air",
                                "radius": 20,
                                "shape": "capsule"
                            }]
                        }
                    }
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'splash_damage',
                    op: 'replace',
                    value: 400
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'damage',
                    op: 'replace',
                    value: 400
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'min_velocity',
                    op: 'replace',
                    value: 20
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'initial_velocity',
                    op: 'replace',
                    value: 60
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'max_velocity',
                    op: 'replace',
                    value: 80
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'lifetime',
                    op: 'replace',
                    value: 3
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'events',
                    op: 'replace',
                    value: {
                      "died": {
                        "audio_cue": "/SE/Impacts/bomb_bot_plasma",
                        "effect_spec": "/pa/units/land/bot_bomb/bot_bomb_ammo_explosion.pfx"
                      }
                    }
                },
                {
                    file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                    path: 'impact_decals',
                    op: 'replace',
                    value: ["/pa/effects/specs/scorch_a_01.json"]
                }
            ]);
        }
    };
});
