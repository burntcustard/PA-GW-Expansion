// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'commanderPrimary',
        describe: 'Gives the commander a Tesla Gun, similar to the Spark weapon. Uses the commanders internal generator for power, rather than consuming power on reload.',
        summarize: 'Commander Tesla Gun',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_super_weapons.png',
        audio: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_commander_tesla_gun') &&
                inventory.hasCard('gwc_enable_sparks')) {
                chance = (dist <= 5 ? 40 : 0);
            }
            return { chance: 999 };
        },
        buff: function(inventory) {
            var mods = [];

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
                mods.push(
                    {
                        file: unit,
                        path: 'tools.1.fire_event',
                        op: 'replace',
                        value: 'fired1'
                    },
                    {
                        file: unit,
                        path: 'events.fired1',
                        op: 'replace',
                        value: {
                            'audio_cue': '/SE/Weapons/bot/spark_fire',
                            'effect_spec': '/pa/effects/specs/tesla_muzzle_flash.pfx socket_rightMuzzle'
                        }
                    },
                    {
                        file: unit,
                        path: 'events.fired0',
                        op: 'replace',
                        value: {
                            'effect_spec': '/pa/effects/specs/default_muzzle_flash.pfx socket_rightMuzzle'
                        }
                    },
                    {
                        file: unit,
                        path: 'tools.3.fire_event',
                        op: 'replace',
                        value: 'fired0'
                    },
                    {
                        file: unit,
                        path: 'tools.4.fire_event',
                        op: 'replace',
                        value: 'fired0'
                    }
                );
            });

            var weaps = [
                '/pa/units/commanders/base_commander/base_commander_tool_bullet_weapon.json',
                '/pa/units/commanders/base_commander/base_commander_tool_laser_weapon.json',
                '/pa/units/commanders/base_commander/base_commander_tool_missile_weapon.json'
            ];
            _.forEach(weaps, function(weap) {
                mods.push(
                    {
                        file: weap,
                        path: 'rate_of_fire',
                        op: 'replace',
                        value: 1
                    }
                );

                if (inventory.hasCard('gwc_overcharged_tesla')) {
                    // apply tesla overcharge to this card somehow?
                } else {
                    // or don't
                }
            });

            var ammos = [
                '/pa/units/commanders/base_commander/base_commander_ammo_bullet.json',
                '/pa/units/commanders/base_commander/base_commander_ammo_laser.json',
                '/pa/units/commanders/base_commander/base_commander_ammo_missile.json'
            ];
            var teslaAmmoProps = {
                'flight_type': 'Direct',
                'model': {
                    'filename': ''
                },
                'splash_radius': 10,
                'initial_velocity': 180,
                'max_velocity': 180,
                'fx_trail': {
                    'filename': '/pa/effects/specs/tesla_proj_trail.pfx'
                },
                'events': {
                    'spawned' : {
                        'audio_cue': '/SE/Weapons/bot/spark_fire'
                    },
                    'died': {
                        'audio_cue': '/SE/Impacts/bot_spark_impact',
                        'effect_spec': '/pa/effects/specs/tesla_hit.pfx'
                    }
                }
            };
            _.forEach(ammos, function(ammo) {
                _.forEach(teslaAmmoProps, function(value, prop) {
                    mods.push(
                        {
                            file: ammo,
                            path: prop,
                            op: 'replace',
                            value: value
                        }
                    )
                });

                if (inventory.hasCard('gwc_overcharged_tesla')) {
                    mods.push(
                        {
                            file: ammo,
                            path: 'damage',
                            op: 'replace',
                            value: 224
                        },
                        {
                            file: ammo,
                            path: 'splash_damage',
                            op: 'replace',
                            value: 70
                        },
                        {
                            file: ammo,
                            path: 'full_damage_splash_radius',
                            op: 'replace',
                            value: 5 // Boosted a bit more than the 1.4x for the comm
                        }
                    );
                } else {
                    mods.push(
                        {
                            file: ammo,
                            path: 'damage',
                            op: 'replace',
                            value: 160
                        },
                        {
                            file: ammo,
                            path: 'splash_damage',
                            op: 'replace',
                            value: 50
                        },
                        {
                            file: ammo,
                            path: 'full_damage_splash_radius',
                            op: 'replace',
                            value: 3 // Slightly bigger than the sparks 2
                        }
                    );
                }
            });

            inventory.addMods(mods);
        }
    };
});
