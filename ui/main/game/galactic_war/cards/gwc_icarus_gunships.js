// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        type: function() { return 'upgrades'; },
        describe: function(params) {
            return 'Redirects a portion of the Icarus solar drones energy to it\'s engines and modified navigation systems, converting it into a light gunship';
        },
        summarize: function(params) {
            return 'Icarus Gunship<br>Modifications';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_air_engine.png';
        },
        audio: function (parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_air'
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
            if (!inventory.hasCard('gwc_icarus_gunships') &&
                inventory.hasCard('gwc_enable_icarus')) {
                chance = (dist <= 5 ? 400 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var mods = [];
            var units = [
                '/pa/units/air/solar_drone/solar_drone.json'
            ];
            _.forEach(units, function(unit) {
                mods.push(
                    // Giving it gunship-like movement
                    {
                        file: unit,
                        path: 'navigation.aggressive_behavior',
                        op: 'replace',
                        value: 'circle'
                    },
                    {
                        file: unit,
                        path: 'navigation.aggressive_distance',
                        op: 'replace',
                        value: 60
                    },
                    {
                        file: unit,
                        path: 'navigation.bank_factor',
                        op: 'replace',
                        value: 1
                    },
                    {
                        file: unit,
                        path: 'navigation.circle_max_time',
                        op: 'replace',
                        value: 2
                    },
                    {
                        file: unit,
                        path: 'navigation.circle_min_time',
                        op: 'replace',
                        value: 1
                    },
                    // General movement speed increases
                    {
                        // Acceleration 30 -> 60
                        file: unit,
                        path: 'navigation.acceleration',
                        op: 'multiply',
                        value: 2
                    },
                    {
                        // Move speed 30 -> 60
                        file: unit,
                        path: 'navigation.move_speed',
                        op: 'multiply',
                        value: 2
                    },
                    {
                        // Turn speed 90 -> 120
                        file: unit,
                        path: 'navigation.turn_speed',
                        op: 'multiply',
                        value: 1.33
                    },
                    // Reducing the energy from 175 -> 150
                    {
                        file: unit,
                        path: 'production.energy',
                        op: 'replace',
                        value: 125
                    }
                );
            });
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
