// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'upgrades'; },
        describe: function(params) {
            return 'Increases the speed and maneuverability of Drifters (+10%), Kaiju (+20%), and the Ares Titan (+30%).';
        },
        summarize: function(params) {
            return 'Hi-Tech Heavy Grav Tracks';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png';
        },
        audio: function (parms) {
            return {
                found: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade'
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
            if (!inventory.hasCard('gwc_hover_upgrade') &&
                inventory.hasCard('gwc_enable_drifters')) { // Only findable after drifters unlocked
                chance = (dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/land/tank_hover/tank_hover.json',      // 14 -> 15 speed
                '/pa/units/land/hover_ship/hover_ship.json',      // 11 -> 13 speed
                '/pa/units/land/titan_vehicle/titan_vehicle.json' // 10 -> 13 speed
            ];
            var i = 1;
            _.forEach(units, function(unit) {
                inventory.addMods([
                    {
                        file: unit,
                        path: 'navigation.acceleration',
                        op: 'multiply',
                        value: 1 + i / 10;
                    },
                    {
                        file: unit,
                        path: 'navigation.brake',
                        op: 'multiply',
                        value: 1 + i / 10;
                    },
                    {
                        // % Wise this is incorrect but gives nice numbers & is close enough
                        file: unit,
                        path: 'navigation.move_speed',
                        op: 'add',
                        value: i
                    },
                    {
                        file: unit,
                        path: 'navigation.turn_speed',
                        op: 'multiply',
                        value: 1 + i / 10;
                    },
                    {
                        file: unit,
                        path: 'description',
                        op: 'add',
                        value: ' +' + i + '0% Move Speed.'
                    }
                ]);
                i++;
            });
        }
    };
});
