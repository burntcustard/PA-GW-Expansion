// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'commanderPassive',
        describe: 'A card for making AI extra zoomy',
        summarize: 'Commander Servo Tech 2',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_commander_armor.png',
        audio: '/VO/Computer/gw/board_tech_available_armor',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_commander_servo')) {
                chance = (dist <= 5) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            var unit = '/pa/units/commanders/base_commander/base_commander.json';
            inventory.addMods([
                {
                    file: unit,
                    path: 'navigation.move_speed',
                    op: 'multiply',
                    value: 3
                },
                {
                    file: unit,
                    path: 'navigation.brake',
                    op: 'multiply',
                    value: 3
                },
                {
                    file: unit,
                    path: 'navigation.acceleration',
                    op: 'multiply',
                    value: 3
                },
                {
                    file: unit,
                    path: 'navigation.turn_speed',
                    op: 'multiply',
                    value: 3
                }
            ]);
        }
    };
});
