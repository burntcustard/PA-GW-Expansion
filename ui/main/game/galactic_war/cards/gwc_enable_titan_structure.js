// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'units',
        describe: 'Enables construction of the Ragnarok Titan, built via any advanced fabricator.',
        summarize: 'Ragnarok Doomsday Titan',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_structure.png',
        audio: '/VO/Computer/gw/board_tech_available_titans_all',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_titan_structure')) {
                chance = (2 < dist && dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/land/titan_structure/titan_structure.json'
            ]);
        }
    };
});
