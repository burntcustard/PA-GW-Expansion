// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'units',
        describe: 'Enables building of the Boom bot from basic bot factories.',
        summarize: 'Boom Bots',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png',
        audio: '/VO/Computer/gw/board_tech_available_bot',
        getContext: function(galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_booms')) {
                chance = (dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/land/bot_bomb/bot_bomb.json',
            ]);
        }
    };
});
