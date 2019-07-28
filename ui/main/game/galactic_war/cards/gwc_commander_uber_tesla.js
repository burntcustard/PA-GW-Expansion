// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'commanderSecondary'; },
        describe: 'A powerful Uber Tesla Gun',
        summarize: 'Uber Tesla Gun',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_energy.png',
        audio: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_commander_uber_tesla')) {
                chance = (dist >= 2) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            var comm = '/pa/units/commanders/base_commander/base_commander.json';
            var weap = '/pa/tools/uber_cannon/uber_cannon.json';
            var ammo = '/pa/ammo/cannon_uber/cannon_uber.json';
            inventory.addMods([
                {
                    // Re-add secondary fire
                    file: comm,
                    path: 'command_caps',
                    op: 'push',
                    value: 'ORDER_FireSecondaryWeapon'
                },
                {
                    file: ammo,
                    path: 'audio_loop',
                    op: 'replace',
                    value: '/SE/Weapons/air/titan_air_fire'
                },
                {
                    file: ammo,
                    path: 'events.died',
                    op: 'replace',
                    value: {
                        "audio_cue": "/SE/Impacts/bot_spark_impact",
                        "effect_spec": "/pa/units/air/titan_air/titan_air_ammo_beam_hit.pfx",
                        "effect_scale": 0.7
                    }
                },
                {
                    file: ammo,
                    path: 'initial_velocity',
                    op: 'replace',
                    value: 200
                },
                {
                    file: ammo,
                    path: 'max_velocity',
                    op: 'replace',
                    value: 200
                },
                {
                    file: ammo,
                    path: 'physics.radius',
                    op: 'replace',
                    value: 3
                },
                {
                    // Dodgy trail effect based off Tesla proj trail & Air Titan muzzle flash
                    file: '/pa/effects/specs/uber_proj_trail.pfx',
                    path: 'emitters',
                    op: 'replace',
                    value: [
                        {
                            "emissionBursts": 1,
                            "endDistance": 1400,
                            "killOnDeactivate": true,
                            "lifetime": 127,
                            "maxParticles": 1,
                            "offsetY": 1.5,
                            "sizeX": 2,
                            "sizeY": 4,
                            "sort": "NoSort",
                            "spec": {
                                "alpha": 1,
                                "baseTexture": "/pa/effects/textures/particles/gradient_tail.papa",
                                "blue": 2,
                                "facing": "EmitterX",
                                "green": 0.4,
                                "label": "LASER CORE",
                                "red": 0.2,
                                "shader": "particle_add_soft"
                            }
                        },
                        {
                            "emissionRate": 10,
                            "endDistance": 1400,
                            "killOnDeactivate": true,
                            "lifetime": 0.1,
                            "sizeX": 5,
                            "sizeY": 4,
                            "sort": "NoSort",
                            "spec": {
                                "alpha": [
                                    [
                                        0,
                                        1
                                    ],
                                    [
                                        1,
                                        0
                                    ]
                                ],
                                "baseTexture": "/pa/effects/textures/particles/softdot.papa",
                                "blue": [
                                    [
                                        0,
                                        2
                                    ],
                                    [
                                        1,
                                        1
                                    ]
                                ],
                                "green": 0.2,
                                "label": "GLOW",
                                "red": 0.1,
                                "shader": "particle_add",
                                "sizeX": [
                                    [
                                        0,
                                        1
                                    ],
                                    [
                                        1,
                                        2
                                    ]
                                ],
                                "sizeY": [
                                    [
                                        0,
                                        1
                                    ],
                                    [
                                        1,
                                        2
                                    ]
                                ]
                            }
                        },
                        {
                            "emissionBursts": 5,
                            "emissionRate": 10,
                            "endDistance": 1400,
                            "killOnDeactivate": true,
                            "lifetime": 0.4,
                            "rotationRate": 10,
                            "rotationRateRange": 5,
                            "sort": "NoSort",
                            "spec": {
                                "alpha": [
                                    [
                                        0,
                                        0.7
                                    ],
                                    [
                                        0.5,
                                        0.7
                                    ],
                                    [
                                        1,
                                        0
                                    ]
                                ],
                                "baseTexture": "/pa/effects/textures/particles/softdot.papa",
                                "blue": 1,
                                "cameraPush": 2,
                                "green": [
                                    [
                                        0,
                                        0.5
                                    ],
                                    [
                                        0.5,
                                        0.1
                                    ],
                                    [
                                        1,
                                        0
                                    ]
                                ],
                                "label": "ROTATING OVALS 01",
                                "red": [
                                    [
                                        0,
                                        0.3
                                    ],
                                    [
                                        0.5,
                                        0
                                    ],
                                    [
                                        1,
                                        0
                                    ]
                                ],
                                "shader": "particle_add_soft",
                                "sizeX": [
                                    [
                                        0,
                                        1
                                    ],
                                    [
                                        0.3,
                                        2
                                    ],
                                    [
                                        1,
                                        1
                                    ]
                                ],
                                "sizeY": [
                                    [
                                        0,
                                        1.5
                                    ],
                                    [
                                        0.3,
                                        3.5
                                    ],
                                    [
                                        1,
                                        1.5
                                    ]
                                ]
                            },
                            "velocity": 13,
                            "velocityRange": 3,
                            "velocityY": 1
                        },
                        {
                            "emissionBursts": 5,
                            "emissionRate": 10,
                            "endDistance": 1400,
                            "killOnDeactivate": true,
                            "lifetime": 0.4,
                            "rotationRate": -10,
                            "rotationRateRange": 5,
                            "sort": "NoSort",
                            "spec": {
                                "alpha": [
                                    [
                                        0,
                                        0.7
                                    ],
                                    [
                                        0.5,
                                        0.7
                                    ],
                                    [
                                        1,
                                        0
                                    ]
                                ],
                                "baseTexture": "/pa/effects/textures/particles/softdot.papa",
                                "blue": 1,
                                "cameraPush": 2,
                                "green": [
                                    [
                                        0,
                                        0.5
                                    ],
                                    [
                                        0.5,
                                        0.1
                                    ],
                                    [
                                        1,
                                        0
                                    ]
                                ],
                                "label": "ROTATING OVALS 02",
                                "red": [
                                    [
                                        0,
                                        0.3
                                    ],
                                    [
                                        0.5,
                                        0
                                    ],
                                    [
                                        1,
                                        0
                                    ]
                                ],
                                "shader": "particle_add_soft",
                                "sizeX": [
                                    [
                                        0,
                                        1
                                    ],
                                    [
                                        0.3,
                                        2
                                    ],
                                    [
                                        1,
                                        1
                                    ]
                                ],
                                "sizeY": [
                                    [
                                        0,
                                        1.5
                                    ],
                                    [
                                        0.3,
                                        3.5
                                    ],
                                    [
                                        1,
                                        1.5
                                    ]
                                ]
                            },
                            "velocity": 13,
                            "velocityRange": 3,
                            "velocityY": 1
                        },
                        {
                            "delay": 0,
                            "emissionBursts": 1,
                            "endDistance": 3000,
                            "killOnDeactivate": true,
                            "maxParticles": 1,
                            "sizeX": 10,
                            "spec": {
                                "blue": 0.8,
                                "green": 0.1,
                                "label": "LIGHT",
                                "red": 0.1,
                                "shape": "pointlight"
                            }
                        },
                        {
                            "bLoop": false,
                            "emissionBursts": 1,
                            "endDistance": 4000,
                            "lifetime": 0.25,
                            "maxParticles": 1,
                            "rotationRange": 3.1516,
                            "sizeX": 20,
                            "spec": {
                                "alpha": [
                                    [
                                        0,
                                        1
                                    ],
                                    [
                                        1,
                                        0
                                    ]
                                ],
                                "baseTexture": "/pa/effects/textures/particles/soft_flare.papa",
                                "cameraPush": 0.15,
                                "rgb": [
                                    2,
                                    [
                                        130,
                                        127,
                                        255
                                    ]
                                ],
                                "shader": "particle_add_soft",
                                "sizeX": [
                                    [
                                        0,
                                        0.8
                                    ],
                                    [
                                        1,
                                        1.5
                                    ]
                                ]
                            }
                        },
                        {
                            "bLoop": false,
                            "emissionBursts": 1,
                            "emissionRate": 10,
                            "emitterLifetime": 0.25,
                            "endDistance": 5000,
                            "lifetime": 0.2,
                            "lifetimeRange": 0.05,
                            "rotationRange": 3.14,
                            "sizeRandomFlip": true,
                            "sizeX": [
                                [
                                    0.2,
                                    10
                                ],
                                [
                                    0.5,
                                    5
                                ]
                            ],
                            "spec": {
                                "alpha": [
                                    [
                                        0,
                                        0
                                    ],
                                    [
                                        0.3,
                                        0.3
                                    ],
                                    [
                                        1,
                                        0
                                    ]
                                ],
                                "baseTexture": "/pa/effects/textures/particles/fire_puff.papa",
                                "rgb": [
                                    5,
                                    [
                                        84,
                                        140,
                                        255
                                    ]
                                ],
                                "shader": "particle_clip",
                                "sizeX": [
                                    [
                                        0,
                                        0.5
                                    ],
                                    [
                                        1,
                                        1.5
                                    ]
                                ]
                            }
                        },
                        {
                            "bLoop": false,
                            "emissionBursts": 1,
                            "endDistance": 4000,
                            "lifetime": 0.5,
                            "sizeX": 10,
                            "spec": {
                                "alpha": [
                                    [
                                        0.2,
                                        50
                                    ],
                                    [
                                        0.3,
                                        10
                                    ],
                                    [
                                        1,
                                        0
                                    ]
                                ],
                                "rgb": [
                                    1,
                                    [
                                        80,
                                        180,
                                        255
                                    ]
                                ],
                                "shape": "pointlight"
                            }
                        }
                    ]
                },
                {
                    file: ammo,
                    path: 'damage',
                    op: 'replace',
                    value: 1500
                },
                {
                    file: weap,
                    path: 'ammo_per_shot',
                    op: 'multiply',
                    value: 2
                },
                {
                    file: weap,
                    path: 'ammo_capacity',
                    op: 'multiply',
                    value: 2
                },
                {
                    file: weap,
                    path: 'ammo_demand',
                    op: 'multiply',
                    value: 2
                }
            ]);
        }
    };
});
