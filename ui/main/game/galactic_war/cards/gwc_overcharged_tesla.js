// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'upgrades',
        describe: "Increase the damage and the energy consumption of tesla weaponry.<br><br>Effects: Tesla Bot, Icarus Drone, Zeus Titan, Tesla Vanguard, Commander Tesla Uber Weapon",
        summarize: 'Overcharged Tesla Weapons',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_energy.png',
        audio: '/VO/Computer/gw/board_tech_available_weapon_upgrade',
        deal: function (system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_overchanged_tesla') &&
                // Only findable after Sparks or Icarus
                (inventory.hasCard('gwc_enable_sparks') ||
                 inventory.hasCard('gwc_enable_icarus'))) {
                chance = (dist <= 5) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory) {

            var units = [
                '/pa/units/land/bot_tesla/bot_tesla.json',
                '/pa/units/air/solar_drone/solar_drone.json',
                '/pa/units/air/titan_air/titan_air.json'
            ];
            _.forEach(units, function(unit) {
                inventory.addMods([
                    {
                        file: unit,
                        path: 'description',
                        op: 'add',
                        value: ' Overcharged Tesla: ＋40% damage.'
                    }
                ]);
            });

            var weaps = [
                '/pa/units/land/bot_tesla/bot_tesla_weapon.json',
                '/pa/units/air/solar_drone/solar_drone_tool_weapon.json',
                '/pa/units/air/titan_air/titan_air_tool_weapon.json'
            ];
            _.forEach(weaps, function(weap) {
                inventory.addMods([
                    {
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
                    }
                ]);
            });

            var ammos = [
                '/pa/units/land/bot_tesla/bot_tesla_ammo.json',    // Spark ammo damage 160 -> 224
                '/pa/units/air/solar_drone/solar_drone_ammo.json', // Icarus ammo damage 25 -> 35
                '/pa/units/air/titan_air/titan_air_ammo.json'      // Zeus ammo damage 1600 -> 2100
            ];
            _.forEach(ammos, function(ammo) {
                inventory.addMods([
                    {
                        file: ammo,
                        path: 'damage',
                        op: 'multiply',
                        value: 1.4
                    }
                ]);
            });

        }
    };
});
