// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'units',
        describe: 'Enables construction of the Ares Titan, built via advanced vehicle fabricators.',
        summarize: 'Ares Titan',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_vehicle.png',
        audio: '/VO/Computer/gw/board_tech_available_titans_all',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_t2_vehicles')) {
                chance = (2 < dist && dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            inventory.addUnits([
                '/pa/units/land/titan_vehicle/titan_vehicle.json'
            ]);
        }
    };
});
