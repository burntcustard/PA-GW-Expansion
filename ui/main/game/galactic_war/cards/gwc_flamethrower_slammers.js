// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type:'upgrades',
        describe: 'Upgrades the Slammer Assault Bot to the more heavily armored, flamethrower-wiedling Pyro Slammer. Built by advanced Bot Factories.',
        summarize: 'Flamethrower Slammer',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png',
        audio: '/VO/Computer/gw/board_tech_available_bot',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_flamethrower_slammers') &&
                inventory.hasCard('gwc_enable_t2_bots')) {
                chance = (dist >= 4) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            // Clone the tank_armour effect into a 'flameEffect' copy
            var tank = '/pa/units/land/tank_armor/tank_armor.json';
            var flameEffect = tank + '.flame_effect';
            inventory.addMods([
                {
                    file: tank,
                    path: 'events.fired.effect_spec',
                    op: 'clone',
                    value: flameEffect
                },
                {
                    // Remove the original flames effect
                    file: flameEffect,
                    path: 'emitters',
                    op: 'splice',
                    value: 1
                },
                {
                    // Add in longer flames effect
                    file: flameEffect,
                    path: 'emitters',
                    op: 'push',
                    value: {
                        "bLoop": false,
                        "drag": 0.92,
                        "emissionBursts": 1,
                        "emissionRate": 70,
                        "emitterLifetime": 0.6,
                        "endDistance": 3200,
                        "gravity": 25,
                        "lifetime": 1,
                        "sizeRangeY": 1.5,
                        "sizeX": 2,
                        "sizeY": 3.5,
                        "spec": {
                            "baseTexture": "/pa/effects/textures/particles/flamethrower.papa",
                            "blue": {
                                "keys": [
                                    [
                                        0,
                                        2
                                    ],
                                    [
                                        0.2,
                                        0.2
                                    ],
                                    [
                                        0.65,
                                        0.01
                                    ]
                                ]
                            },
                            "dataChannelFormat": "PositionColorAndAlignVector",
                            "facing": "velocity",
                            "green": {
                                "keys": [
                                    [
                                        0,
                                        2
                                    ],
                                    [
                                        0.2,
                                        0.6
                                    ],
                                    [
                                        0.65,
                                        0.05
                                    ]
                                ]
                            },
                            "red": {
                                "keys": [
                                    [
                                        0,
                                        2
                                    ],
                                    [
                                        0.2,
                                        2
                                    ],
                                    [
                                        0.65,
                                        1.5
                                    ]
                                ]
                            },
                            "shader": "particle_transparent",
                            "size": {
                                "keys": [
                                    [
                                        0,
                                        0.75
                                    ],
                                    [
                                        0.5,
                                        1.25
                                    ],
                                    [
                                        1,
                                        0
                                    ]
                                ]
                            }
                        },
                        "useWorldSpace": true,
                        "velocity": 85,
                        "velocityRange": 30,
                        "velocityRangeX": 0.07,
                        "velocityRangeZ": 0.07,
                        "velocityY": -1
                    }
                }
            ]);

            var unit = '/pa/units/land/assault_bot_adv/assault_bot_adv.json';
            inventory.addMods([
                {
                    file: unit,
                    path: 'display_name',
                    op: 'replace',
                    value: 'Pyro Slammer'
                },
                {
                    file: unit,
                    path: 'description',
                    op: 'replace',
                    value: 'Assault Bot - Devastating short range anti-ground.'
                },
                {
                    // 400 -> 600 HP
                    file: unit,
                    path: 'max_health',
                    op: 'multiply',
                    value: 1.5
                },
                {
                    file: unit,
                    path: 'events.fired',
                    op: 'replace',
                    value: {
                        "audio_cue":"/SE/Weapons/veh/tank_flame",
                        "effect_spec": flameEffect + ' socket_rightMuzzle ' + flameEffect + ' socket_leftMuzzle'
                    }
                },
                {
                    file: unit,
                    path: 'events.fired.effect_spec',
                    op: 'tag'
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
