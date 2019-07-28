// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'units',
        describe: 'Enables building of the Icarus solar drone from basic air factories.',
        summarize: 'Icarus Solar Drone',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_air_engine.png',
        audio: '/VO/Computer/gw/board_tech_available_air',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_icarus')) {
                chance = (dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            var unit = '/pa/units/air/solar_drone/solar_drone.json';
            inventory.addUnits([unit]);
            inventory.addMods([
                {
                    // Shrink the select icon 21 -> 20
                    file: unit,
                    path: 'selection_icon.diameter',
                    op: 'replace',
                    value: 20
                },
                {
                    // Make the units in formation not spread out so much 13.5 -> 11
                    file: unit,
                    path: 'mesh_bounds',
                    op: 'replace',
                    value: [
                        11,
                        10,
                        4
                    ]
                }
            ]);
        }
    };
});
