// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'commanderPassive'; },
        describe: function(params) {
            return 'Commander Servo Tech upgrades the armor and increases movement speed of the commander.<br><br> • +50% max health<br> • +25% movement speed';
        },
        summarize: function(params) {
            return 'Commander Servo Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_commander_armor.png';
        },
        audio: function (parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_armor'
            }
        },
        getContext: function (galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function (system, context) {
            var chance = 0;
            var dist = system.distance();
                chance = (dist < 5) ? 40:0;
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/commanders/base_commander/base_commander.json',
            ];
            var mods = [];
            var modUnit = function (unit) {
                mods.push({
                    file: unit,
                    path: 'max_health',
                    op: 'multiply',
                    value: 1.5
                },
                {
                    file: unit,
                    path: 'navigation.move_speed',
                    op: 'multiply',
                    value: 1.25
                },
                {
                    file: unit,
                    path: 'navigation.brake',
                    op: 'multiply',
                    value: 1.25
                },
                {
                    file: unit,
                    path: 'navigation.acceleration',
                    op: 'multiply',
                    value: 1.25
                },
                {
                    file: unit,
                    path: 'navigation.turn_speed',
                    op: 'multiply',
                    value: 1.25
                });
            };
            _.forEach(units, modUnit);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
