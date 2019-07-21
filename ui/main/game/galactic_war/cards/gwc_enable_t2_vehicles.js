// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'units',
        describe: 'Enables construction of advanced vehicles (Leveler, Storm, Sheller, Vanguard) from the Advanced Vehicle Factory, built via any vehicle fabricator.',
        summarize: 'Advanced Vehicle Tech',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_vehicle.png',
        audio: '/VO/Computer/gw/board_tech_available_vehicle',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_t2_vehicles')) {
                chance = (2 < dist && dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json'
            ]);
        }
    };
});
