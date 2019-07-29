// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'commanderPrimary',
        describe: 'Gives the commander a short range flamethrower primary weapon',
        summarize: 'Commander Flamethrower',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_super_weapons.png',
        audio: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_commander_flamethrower') &&
                inventory.hasCard('gwc_enable_infernos')) {
                chance = (dist <= 5 ? 40 : 0);
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

            var comms = [
                '/pa/units/commanders/base_commander/base_commander.json',
                '/pa/units/commanders/quad_zancrowe/quad_zancrowe.json',
                '/pa/units/commanders/imperial_thechessknight/imperial_thechessknight.json',
                '/pa/units/commanders/imperial_enzomatrix/imperial_enzomatrix.json',
                '/pa/units/commanders/imperial_sangudo/imperial_sangudo.json',
                '/pa/units/commanders/imperial_nagasher/imperial_nagasher.json',
                '/pa/units/commanders/quad_twoboots/quad_twoboots.json',
                '/pa/units/commanders/quad_spartandano/quad_spartandano.json',
                '/pa/units/commanders/quad_tokamaktech/quad_tokamaktech.json',
                '/pa/units/commanders/raptor_nefelpitou/raptor_nefelpitou.json',
                '/pa/units/commanders/quad_mobiousblack/quad_mobiousblack.json',
                '/pa/units/commanders/raptor_nemicus/raptor_nemicus.json',
                '/pa/units/commanders/imperial_chronoblip/imperial_chronoblip.json',
                '/pa/units/commanders/imperial_mjon/imperial_mjon.json',
                '/pa/units/commanders/tank_aeson/tank_aeson.json',
                '/pa/units/commanders/raptor_raizell/raptor_raizell.json',
                '/pa/units/commanders/raptor_betadyne/raptor_betadyne.json',
                '/pa/units/commanders/quad_theflax/quad_theflax.json',
                '/pa/units/commanders/quad_locust/quad_locust.json',
                '/pa/units/commanders/quad_potbelly79/quad_potbelly79.json',
                '/pa/units/commanders/imperial_mostlikely/imperial_mostlikely.json',
                '/pa/units/commanders/quad_calyx/quad_calyx.json',
                '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                '/pa/units/commanders/imperial_tykus24/imperial_tykus24.json',
                '/pa/units/commanders/imperial_kevin4001/imperial_kevin4001.json',
                '/pa/units/commanders/quad_raventhornn/quad_raventhornn.json',
                '/pa/units/commanders/raptor_spz58624/raptor_spz58624.json',
                '/pa/units/commanders/imperial_vidicarus/imperial_vidicarus.json',
                '/pa/units/commanders/imperial_gnugfur/imperial_gnugfur.json',
                '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                '/pa/units/commanders/raptor_centurion/raptor_centurion.json',
                '/pa/units/commanders/raptor_damubbster/raptor_damubbster.json',
                '/pa/units/commanders/quad_osiris/quad_osiris.json',
                '/pa/units/commanders/quad_commandonut/quad_commandonut.json',
                '/pa/units/commanders/imperial_toddfather/imperial_toddfather.json',
                '/pa/units/commanders/raptor_stickman9000/raptor_stickman9000.json',
                '/pa/units/commanders/quad_xinthar/quad_xinthar.json',
                '/pa/units/commanders/quad_armalisk/quad_armalisk.json',
                '/pa/units/commanders/imperial_jt100010117/imperial_jt100010117.json',
                '/pa/units/commanders/raptor_beniesk/raptor_beniesk.json',
                '/pa/units/commanders/imperial_gamma/imperial_gamma.json',
                '/pa/units/commanders/imperial_delta/imperial_delta.json',
                '/pa/units/commanders/raptor_beast/raptor_beast.json',
                '/pa/units/commanders/tank_reaver/tank_reaver.json',
                '/pa/units/commanders/imperial_kapowaz/imperial_kapowaz.json',
                '/pa/units/commanders/raptor_enderstryke71/raptor_enderstryke71.json',
                '/pa/units/commanders/imperial_theta/imperial_theta.json',
                '/pa/units/commanders/imperial_invictus/imperial_invictus.json',
                '/pa/units/commanders/imperial_able/imperial_able.json',
                '/pa/units/commanders/tank_sadiga/tank_sadiga.json',
                '/pa/units/commanders/imperial_aryst0krat/imperial_aryst0krat.json',
                '/pa/units/commanders/raptor_diremachine/raptor_diremachine.json',
                '/pa/units/commanders/raptor_xov/raptor_xov.json',
                '/pa/units/commanders/quad_sacrificiallamb/quad_sacrificiallamb.json',
                '/pa/units/commanders/imperial_stelarch/imperial_stelarch.json',
                '/pa/units/commanders/imperial_alpha/imperial_alpha.json',
                '/pa/units/commanders/imperial_progenitor/imperial_progenitor.json',
                '/pa/units/commanders/tank_banditks/tank_banditks.json',
                '/pa/units/commanders/quad_shadowdaemon/quad_shadowdaemon.json',
                '/pa/units/commanders/raptor_iwmiked/raptor_iwmiked.json',
                '/pa/units/commanders/quad_ajax/quad_ajax.json',
                '/pa/units/commanders/raptor_majuju/raptor_majuju.json',
                '/pa/units/commanders/imperial_aceal/imperial_aceal.json',
                '/pa/units/commanders/quad_gambitdfa/quad_gambitdfa.json',
                '/pa/units/commanders/imperial_seniorhelix/imperial_seniorhelix.json',
                '/pa/units/commanders/imperial_visionik/imperial_visionik.json',
                '/pa/units/commanders/imperial_fiveleafclover/imperial_fiveleafclover.json',
                '/pa/units/commanders/quad_xenosentryprime/quad_xenosentryprime.json',
                '/pa/units/commanders/raptor_zaazzaa/raptor_zaazzaa.json'
            ];
            _.forEach(comms, function(unit) {
                inventory.addMods([
                    {
                        file: unit,
                        path: 'events.fired',
                        op: 'replace',
                        value: {
                            'audio_cue': '/SE/Weapons/veh/tank_flame',
                            'effect_spec': flameEffect + ' socket_rightMuzzle'
                        }
                    },
                    {
                        file: unit,
                        path: 'events.fired.effect_spec',
                        op: 'tag'
                    }
                ]);
            });

            var weaps = [
                '/pa/units/commanders/base_commander/base_commander_tool_bullet_weapon.json',
                '/pa/units/commanders/base_commander/base_commander_tool_laser_weapon.json',
                '/pa/units/commanders/base_commander/base_commander_tool_missile.json'
            ];
            _.forEach(weaps, function(weap) {
                inventory.addMods([
                    {
                        file: weap,
                        path: 'ammo_id',
                        op: 'replace',
                        value: '/pa/units/land/tank_armor/tank_armor_ammo.json'
                    },
                    {
                        file: weap,
                        path: 'rate_of_fire',
                        op: 'replace',
                        value: 4
                    }
                ]);

                if (inventory.hasCard('gwc_flamethrower_range')) {
                    inventory.addMods([
                        {
                            file: weap,
                            path: 'max_range',
                            op: 'replace',
                            value: '42' // 30 * 1.4 = 42
                        }
                    ]);
                } else {
                    inventory.addMods([
                        {
                            file: weap,
                            path: 'max_range',
                            op: 'replace',
                            value: '30' // Inferno flamethrowers are 20
                        }
                    ]);
                }
            });
        }
    };
});
