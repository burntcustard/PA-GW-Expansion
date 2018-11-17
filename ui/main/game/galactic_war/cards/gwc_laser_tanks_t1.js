// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        type: function() { return 'upgrades'; },
        describe: function(params) {
            return 'Replaces the T1 tank with a more manuverable laser equipped variANT.<br><br>+20% speed, +20% RoF, -20% damage';
        },
        summarize: function(params) {
            return 'Light Laser Tank';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_vehicle.png';
        },
        audio: function (parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_vehicle'
            }
        },
        getContext: function (galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function (system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_laser_tanks_t1')) {
                chance = (dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var unit = '/pa/units/land/tank_light_laser/tank_light_laser.json';
            var weap =  '/pa/units/land/tank_light_laser/tank_light_laser_tool_weapon.json';
            inventory.addMods([
                {
                    file: unit,
                    path: 'display_name',
                    op: 'replace',
                    value: 'Light Laser Tank'
                },
                {
                    file: unit,
                    path: 'description',
                    op: 'replace',
                    value: 'Tank: More maneuverable/lower damage variANT.<br>+20% speed, +20% RoF, -20% damage'
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
                        "audio_cue":"/SE/Weapons/orb/defense_satellite_fire_in_orbit",
                        "effect_spec":"/pa/effects/specs/tank_muzzle_flash.pfx socket_muzzle"
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
                    // Give it the anchor anti-orbital ammo (65 damage)
                    file: weap,
                    path: 'ammo_id',
                    op: 'replace',
                    value: '/pa/units/orbital/defense_satellite/defense_satellite_ammo_orbital.json'
                }
            ]);
        }
    };
});
