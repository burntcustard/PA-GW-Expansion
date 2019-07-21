// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'commanderPassive',
        describe: 'Commander Servo Tech upgrades the armor and increases movement speed of the commander.<br><br>+50% max health, +25% movement speed',
        summarize: 'Commander Servo Tech',
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
        buff: function(inventory, params) {
            var unit = '/pa/units/commanders/base_commander/base_commander.json';
            inventory.addMods([
                {
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
                }
            ]);
        }
    };
});
