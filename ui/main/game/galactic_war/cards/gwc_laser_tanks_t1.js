// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'upgrades',
        describe: 'Replaces the T1 tank with a more manuverable laser equipped variANT.<br><br>＋20% speed, ＋20% RoF, ＋20% damage',
        summarize: 'Light Laser Tank',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_vehicle.png',
        audio: '/VO/Computer/gw/board_tech_available_vehicle',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_laser_tanks_t1')) {
                chance = (dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            var unit = '/pa/units/land/tank_light_laser/tank_light_laser.json';
            var weap =  '/pa/units/land/tank_light_laser/tank_light_laser_tool_weapon.json';
            var ammo =  '/pa/units/land/tank_light_laser/tank_light_laser_ammo.json';
            var mods = [
                {
                    file: unit,
                    path: 'display_name',
                    op: 'replace',
                    value: 'Laser Ant'
                },
                {
                    file: unit,
                    path: 'description',
                    op: 'replace',
                    value: 'Light Tank - Fast, low damage variANT. ＋⁠20% speed ＋⁠20% RoF －⁠30% damage.'
                },
                {
                    // 10 to 12 move speed
                    file: unit,
                    path: 'navigation.move_speed',
                    op: 'multiply',
                    value: 1.2
                },
                {
                    file: unit,
                    path: 'events.fired',
                    op: 'replace',
                    value: {
                        'audio_cue':'/SE/Weapons/orb/defense_satellite_fire_in_orbit',
                        'effect_spec':'/pa/effects/specs/tank_muzzle_flash.pfx socket_muzzle'
                    }
                },
                {
                    // Rate of fire to  .5/s -> .6/s
                    file: weap,
                    path: 'rate_of_fire',
                    op: 'multiply',
                    value: 1.2
                },
                {
                    file: ammo,
                    path: 'base_spec',
                    op: 'delete'
                },
                {
                    file: ammo,
                    path: 'ammo_type',
                    op: 'replace',
                    value: 'AMMO_Beam'
                },
                {
                    file: ammo,
                    path: 'audio_loop',
                    op: 'replace',
                    value: '/SE/Impacts/laser_blast'
                },
                {
                    file: ammo,
                    path: 'collision_audio',
                    op: 'replace',
                    value: '/SE/Impacts/laser_blast'
                },
                {
                    file: ammo,
                    path: 'model',
                    op: 'delete'
                },
                {
                    file: ammo,
                    path: 'fx_trail',
                    op: 'delete'
                },
                {
                    file: ammo,
                    path: 'damage',
                    op: 'replace',
                    value: '65'
                },
                {
                    file: ammo,
                    path: 'initial_velocity',
                    op: 'replace',
                    value: 500
                },
                {
                    file: ammo,
                    path: 'max_velocity',
                    op: 'replace',
                    value: 500
                },
                {
                    file: ammo,
                    path: 'collision_check',
                    op: 'replace',
                    value: 'target'
                },
                {
                    file: ammo,
                    path: 'fx_beam_spec',
                    op: 'replace',
                    value: '/pa/units/orbital/defense_satellite/defense_satellite_ammo_orbital_beam.pfx',
                },
                {
                    file: ammo,
                    path: 'fx_collision_spec',
                    op: 'replace',
                    value: '/pa/units/orbital/defense_satellite/defense_satellite_ammo_orbital_beam_hit.pfx',
                }
            ];

            if (inventory.hasCard('gwc_laser_damage')) {
                mods.push(
                    {
                        file: unit,
                        path: 'description',
                        op: 'add',
                        value: ' Overcharged Capacitors: ＋⁠30% damage.'
                    },
                    {
                        file: ammo,
                        path: 'damage',
                        op: 'replace',
                        value: '84' // Should be 84.5 but we're rounding for nice UI
                    }
                );
            } else {
                mods.push(
                    {
                        file: ammo,
                        path: 'damage',
                        op: 'replace',
                        value: '65'
                    }
                );
            }

            inventory.addMods(mods);
        }
    };
});
