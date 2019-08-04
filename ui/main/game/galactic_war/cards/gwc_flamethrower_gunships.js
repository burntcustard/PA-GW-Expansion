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
                inventory.hasCard('gwc_enable_infernos') &&
                inventory.hasCard('gwc_enable_t2_air')) {
                chance = (dist >= 4) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            var mods = [];

            // Clone the tank_armour effect into a 'flameEffect' copy
            var tank = '/pa/units/land/tank_armor/tank_armor.json';
            var flameEffect = tank + '.flame_effect';
            mods.push(
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
            );

            var unit = '/pa/units/air/gunship/gunship.json';
            var weap = '/pa/units/air/gunship/gunship_tool_weapon.json';
            mods.push(
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
                    // 600 -> 750 build cost
                    file: unit,
                    path: 'build_metal_cost',
                    op: 'multiply',
                    value: 1.25
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
                    path: 'events.died.effect_scale',
                    op: 'replace',
                    value: 1
                },
                {
                    file: weap,
                    path: 'ammo_id',
                    op: 'replace',
                    value: '/pa/units/land/tank_armor/tank_armor_ammo.json'
                },
                {
                    // Don't let 'em shoot underwater anymore.
                    // Gunships attacking Seafloor might get patched out soon anyway
                    file: weap,
                    path: 'target_layers',
                    op: 'pull',
                    value: 'WL_Seafloor'
                }
            );


            if (inventory.hasCard('gwc_flamethrower_range')) {
                mods.push(
                    {
                        file: unit,
                        path: 'description',
                        op: 'add',
                        value: ' Flamethrower Tech: ＋⁠40% range.'
                    },
                    {
                        file: unit,
                        path: 'navigation.aggressive_distance',
                        op: 'replace',
                        value: 40
                    },
                    {
                        file: weap,
                        path: 'max_range',
                        op: 'replace',
                        value: '42' // 30 * 1.4 = 42
                    }
                );
            } else {
                mods.push(
                    {
                        file: unit,
                        path: 'navigation.aggressive_distance',
                        op: 'replace',
                        value: 28
                    },
                    {
                        file: weap,
                        path: 'max_range',
                        op: 'replace',
                        value: '30' // Inferno flamethrowers are 20
                    }
                );
            }

            inventory.addMods(mods);
        }
    };
});
