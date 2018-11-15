// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) {
            return "Increase the damage, but also greatly increases the energy consumption of tesla weaponry.<br><br>Effects: Tesla Bot, Icarus Drone, Zeus Titan, Tesla Vanguard, Commander Tesla Uber Weapon";
        },
        summarize: function(params) {
            return 'Overcharged Tesla Weapons';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_energy.png';
        },
        audio: function (parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_weapon_upgrade'
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
            if (!inventory.hasCard('gwc_overchanged_tesla') &&
                // Only findable after Sparks or Icarus unlocked
                (inventory.hasCard('gwc_enable_sparks') ||
                 inventory.hasCard('gwc_enable_icarus'))) {
                chance = (dist <= 5) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var mods = [];

            var weaps = [
                '/pa/units/land/bot_tesla/bot_tesla_weapon.json',
                '/pa/units/air/solar_drone/solar_drone_tool_weapon.json',
                '/pa/units/air/titan_air/titan_air_tool_weapon.json'
            ];
            _.forEach(weaps, function(weap) {
                mods.push({
                    file: weap,
                    path: 'ammo_capacity',
                    op: 'multiply',
                    value: 2
                },
                {
                    file: weap,
                    path: 'ammo_demand',
                    op: 'multiply',
                    value: 2
                },
                {
                    file: weap,
                    path: 'ammo_per_shot',
                    op: 'multiply',
                    value: 2
                });
            });

            var ammos = [
                '/pa/units/land/bot_tesla/bot_tesla_ammo.json',     // Spark ammo 160 -> 240 damage
                '/pa/units/air/solar_drone/solar_drone_ammo.json', // Icarus ammo 160 -> 240 damage
                '/pa/units/air/titan_air/titan_air_ammo.json'      // Zeus ammo 1500 -> 2250 damage
            ];
            _.forEach(ammos, function(ammo) {
                mods.push({
                    file: ammo,
                    path: 'damage',
                    op: 'multiply',
                    value: 1.5
                });
            });

            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
