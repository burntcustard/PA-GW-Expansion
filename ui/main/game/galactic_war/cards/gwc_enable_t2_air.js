// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'units',
        describe: 'Enables construction of advanced air units (Kestrel, Phoenix, Hornet, Angel) from the Advanced Air Factory, built via any air fabricator.',
        summarize: 'Advanced Air Tech',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_combat_air.png',
        audio: '/VO/Computer/gw/board_tech_available_air',
        getContext: function(galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_t2_air')) {
                chance = (2 < dist && dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/air/air_factory_adv/air_factory_adv.json'
            ]);
        }
    };
});
