// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'units',
        describe: 'Enables construction of the Atlas Titan, built via advanced bot fabricators.',
        summarize: 'Atlas Titan',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_enable_titans.png',
        audio: '/VO/Computer/gw/board_tech_available_titans_all',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_titan_bot')) {
                if (inventory.hasCard('gwc_enable_t2_bots')) {
                    chance = (2 < dist && dist <= 5 ? 40 : 0);
                }
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            inventory.addUnits([
                '/pa/units/land/titan_bot/titan_bot.json'
            ]);
        }
    };
});
