// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'upgrades'; },
        describe: function(params) {
            return 'Increases the range of flamethrowers by 20%';
        },
        summarize: function(params) {
            return 'Flamethrower range +20%';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_super_weapons.png';
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
            if (!inventory.hasCard('gwc_flamethrower_range') &&
                inventory.hasCard('gwc_enable_infernos')) { // Only enabled after you unlock infernos!
                chance = (dist <= 5) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/land/tank_armor/tank_armor_tool_weapon.json',
            ];
            var mods = [];
            var modUnit = function(unit) {
                mods.push({
                    file: unit,
                    path: 'max_range',
                    op: 'multiply',
                    value: 1.2
                }//,
                //{
                    // // Make the gunships circle around enemies at slightly longer distance.
                    // // May cause issues with non-flamethrower gunships...
                    // file: '/pa/units/air/gunship/gunship.json',
                    // path: 'navigation.aggressive_distance',
                    // op: 'multiply',
                    // value: 1.2
                //}
                );
            };
            _.forEach(units, modUnit);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
