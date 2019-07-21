// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'units',
        describe: 'Enables construction of advanced bots (Slammer, Bluehawk, Gil-E) from the Advanced Bot Factory, built via any bot fabricator.',
        summarize: 'Advanced Bot Tech',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png',
        audio: '/VO/Computer/gw/board_tech_available_bot',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_t2_bots')) {
                chance = (2 < dist && dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/land/bot_factory_adv/bot_factory_adv.json'
            ]);
        }
    };
});
