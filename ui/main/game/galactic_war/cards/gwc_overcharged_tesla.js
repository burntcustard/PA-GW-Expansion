// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) {
            return "Overcharged Tesla Weapons tech increases the damage but also greatly increases the energy consumption of tesla weaponry.<br><br>Effects: Tesla Bot,<br>Icarus Drone,<br>Zeus Titan (if tech acquired),<br>Tesla Vanguard (if tech acquired),<br>Commander Tesla Uber Weapon (if tech acquired)";
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
                inventory.hasCard('gwc_enable_sparks')) { // Only findable after sparks unlocked
                chance = (dist <= 5) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var weaps = [
                '/pa/units/land/bot_tesla/bot_tesla_weapon.json',
                '/pa/units/air/solar_drone/solar_drone_tool_weapon'
            ];
            var mods = [];
            var modWeap = function (weap) {
                mods.push({
                    file: weap,
                    path: 'ammo_capacity',
                    op: 'multiply',
                    value: 2
                });
                mods.push({
                    file: weap,
                    path: 'ammo_demand',
                    op: 'multiply',
                    value: 2
                });
                mods.push({
                    file: weap,
                    path: 'ammo_per_shot',
                    op: 'multiply',
                    value: 2
                });
            };
            _.forEach(weaps, modWeap);

            mods.push({
                // Spark ammo 160 -> 240 damage
                file: '/pa/units/land/bot_tesla/bot_tesla_ammo.json',
                path: 'damage',
                op: 'multiply',
                value: 1.5
            },
            {
                // Icarus ammo 160 -> 240 damage
                file: '/pa/units/land/solar_drone/solar_drone_ammo.json',
                path: 'damage',
                op: 'multiply',
                value: 1.5
            },
            {
                // Zeus ammo 1500 -> 2250 damage
                file: '/pa/units/land/titan_air/titan_air_ammo.json',
                path: 'damage',
                op: 'multiply',
                value: 1.5
            });

            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
