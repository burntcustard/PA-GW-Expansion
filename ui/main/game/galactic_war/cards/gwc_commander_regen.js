// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'commanderPassive',
        describe: 'The commander automatically repairs itself 125 health every 3 seconds, and the cost to repair it with fabricators is halved.',
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
        buff: function(inventory) {
            var mods = [];

            // Clone the base bot ammo into a 'regen_ammo' copy
            var oldWeap = '/pa/units/commanders/base_commander/base_commander_tool_aa_weapon.json';
            var regenAmmo = oldWeap + '.regen_ammo';
            mods.push(
                {
                    file: oldWeap,
                    path: 'ammo_id',
                    op: 'clone',
                    value: regenAmmo
                }
            );

            // Convert the ammo into regen ammo
            var regenAmmoStats = {
                'ammo_type': 'PBAOE',
                'damage': 1,
                'damage_volume': {
                  'initial_radius': 1.0
                },
                'splash_damages_allies': true,
                'splash_damage': 1,
                'splash_radius': 1,
                'full_damage_splash_radius': 1,
                'armor_damage_map': {
                  'AT_Air': 0,
                  'AT_Bot': 0,
                  'AT_Commander': -41,
                  'AT_Naval': 0,
                  'AT_None': 0,
                  'AT_Orbital': 0,
                  'AT_Structure': 0,
                  'AT_Vehicle': 0
                }
            };
            for (var prop in regenAmmoStats) {
                mods.push({
                    file: regenAmmo,
                    path: prop,
                    op: 'replace',
                    value: regenAmmoStats[prop]
                });
            }

            // Note: Commanders that aren't loaded may give "file not found" errors
            var units = [
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

            _.forEach(units, function(unit) {
                var regenWeap = unit + '.regen_weapon';

                // Clone the commander AA weapon into a 'regen_weapon' copy
                mods.push(
                    {
                        file: unit,
                        path: 'tools.3.spec_id', // The aa weap (hopefully?)
                        op: 'clone',
                        value: regenWeap
                    }
                );

                // Convert the new weapon into a regen weapon
                var regenWeapStats = {
                    'ammo_id': regenAmmo,
                    'ammo_source': 'time',
                    'ammo_capacity': 0,
                    'ammo_demand': 0,
                    'ammo_per_shot': 0,
                    'start_fully_charged': false,
                    'rate_of_fire': 1,
                    'max_range': 0,
                    'yaw_rate': 0,
                    'pitch_rate': 0,
                    'yaw_range': 0,
                    'pitch_range': 0,
                    'firing_arc_yaw': 360,
                    'firing_arc_pitch': 360,
                    'fire_delay': 0,
                    'auto_fire_when_charged': true
                };
                for (var prop in regenWeapStats) {
                    mods.push({
                        file: regenWeap,
                        path: prop,
                        op: 'replace',
                        value: regenWeapStats[prop]
                    });
                }

                mods.push(
                    {
                        file: regenWeap,
                        path: 'target_layers',
                        op: 'replace',
                        value: [
                            'WL_WaterSurface',
                            'WL_Underwater',
                            'WL_Seafloo'
                        ]
                    },
                    {
                        file: regenWeap,
                        path: 'ammo_id',
                        op: 'tag'
                    }
                );

                // Give the new weapon to the commander
                mods.push(
                    {
                        file: unit,
                        path: 'tools',
                        op: 'push',
                        value: {
                          'spec_id': regenWeap,
                          'aim_bone': 'bone_turret',
                          'muzzle_bone': 'socket_rightMuzzle',
                          'primary_weapon': false,
                          'show_range': false
                        }
                    },
                    {
                        file: unit,
                        path: 'tools.last.spec_id',
                        op: 'tag',
                        value: ''
                    },
                    {
                        file: unit,
                        path: 'tools.last.aim_bone',
                        op: 'replace',
                        value: 'bone_root'
                    },
                    {
                        file: unit,
                        path: 'tools.last.fire_event',
                        op: 'replace',
                        value: 'fired3'
                    },
                    {
                        file: unit,
                        path: 'tools.last.record_index',
                        op: 'replace',
                        value: -1
                    },
                    // Cheaper commander repair 25000 -> 12500
                    {
                        file: unit,
                        path: 'build_metal_cost',
                        op: 'multiply',
                        value: .5
                    }
                );

            });

            // Actually do all the things mentioned before
            inventory.addMods(mods);
        }
    };
});
