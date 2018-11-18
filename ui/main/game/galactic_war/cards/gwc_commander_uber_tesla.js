define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'commanderSecondary'; },
        describe: function(params) {
            return 'A powerful Uber Tesla Gun';
        },
        summarize: function(params) {
            return 'Uber Tesla Gun';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_energy.png';
        },
        audio: function(parms) {
            return {
                found: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade'
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
            if (!inventory.hasCard('gwc_commander_uber_tesla')) {
                chance = (dist >= 2) ? 40:0;
            }
            return { chance: 9000 };
        },
        buff: function(inventory, params) {
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
                    path: 'burn_damage',
                    op: 'delete'
                },
                {
                    file: ammo,
                    path: 'burn_radius',
                    op: 'delete'
                },
                {
                    file: ammo,
                    path: 'events',
                    op: 'delete'
                },
                {
                    file: ammo,
                    path: 'flight_type',
                    op: 'delete'
                },
                {
                    file: ammo,
                    path: 'fx_trail',
                    op: 'delete'
                },
                {
                    file: ammo,
                    path: 'initial_velocity',
                    op: 'delete'
                },
                {
                    file: ammo,
                    path: 'max_velocity',
                    op: 'delete'
                },
                {
                    file: ammo,
                    path: 'physics',
                    op: 'delete'
                },
                {
                    file: ammo,
                    path: 'spawn_layers',
                    op: 'delete'
                },
                {
                    file: ammo,
                    path: 'turn_rate',
                    op: 'delete'
                },
                {
                    file: ammo,
                    path: 'ammo_type',
                    op: 'replace',
                    value: 'AMMO_Beamn'
                },
                {
                    file: ammo,
                    path: 'collision_check',
                    op: 'replace',
                    value: 'target'
                },
                {
                    file: ammo,
                    path: 'collision_response',
                    op: 'replace',
                    value: 'impact'
                },
                {
                    file: ammo,
                    path: 'collision_audio',
                    op: 'replace',
                    value: '/SE/Impacts/laser_blast'
                },
                {
                    file: ammo,
                    path: 'damage',
                    op: 'replace',
                    value: 1500
                },
                {
                    file: ammo,
                    path: 'damage_volume',
                    op: 'replace',
                    value: {
                        "delay": 0.1,
                        "initial_radius": 5,
                        "radius_accel": 0,
                        "radius_velocity": 80
                    }
                },
                {
                    file: ammo,
                    path: 'full_damage_splash_radius',
                    op: 'replace',
                    value: 5
                },
                // {
                //     file: ammo,
                //     path: 'fx_beam_spec',
                //     op: 'replace',
                //     value: '/pa/units/air/titan_air/titan_air_ammo_beam.pfx'
                // },
                // {
                //     file: ammo,
                //     path: 'fx_collision_spec',
                //     op: 'replace',
                //     value: '/pa/units/air/titan_air/titan_air_ammo_beam_hit.pfx'
                // },
                {
                    file: ammo,
                    path: 'splash_damage',
                    op: 'replace',
                    value: 500
                },
                {
                    file: ammo,
                    path: 'splash_radius',
                    op: 'replace',
                    value: 50
                }
            ]);
        }
    };
});
