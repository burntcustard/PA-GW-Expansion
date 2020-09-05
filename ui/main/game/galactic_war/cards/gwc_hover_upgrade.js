// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'upgrades',
        describe: 'Increases the speed and maneuverability of Drifters (+⁠10%), Kaiju (+⁠20%), and the Ares Titan (+⁠30%).',
        summarize: 'Hi-Tech Heavy Grav Tracks',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png',
        audio: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_hover_upgrade')) {
                if (inventory.hasCard('gwc_enable_drifters') ||
                    inventory.hasCard('gwc_enable_kaiju') ||
                    inventory.hasCard('gwc_enable_titan_vehicle')) {
                        chance = (dist <= 5 ? 40 : 0);
                    }
                }
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            var units = [
                '/pa/units/land/tank_hover/tank_hover.json',      // 14 -> 15 speed
                '/pa/units/land/hover_ship/hover_ship.json',      // 11 -> 13 speed
                '/pa/units/land/titan_vehicle/titan_vehicle.json' // 10 -> 13 speed
            ];
            for (var i = 1; i <= units.length; i++) {
              inventory.addMods([
                  {
                      file: unit,
                      path: 'navigation.acceleration',
                      op: 'multiply',
                      value: 1 + i / 10
                  },
                  {
                      file: unit,
                      path: 'navigation.brake',
                      op: 'multiply',
                      value: 1 + i / 10
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
                      value: 1 + i / 10
                  },
                  {
                      file: unit,
                      path: 'description',
                      op: 'add',
                      value: ' Hi-Tech Grav Tracks: +⁠' + i + '0% speed.'
                  }
              ]);
            }
        }
    };
});
