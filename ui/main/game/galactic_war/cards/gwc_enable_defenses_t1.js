// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'units',
        describe: 'Enables building of the double laser defense tower, walls, and short range artillery by basic fabricators.',
        summarize: 'Defensive Tech',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_turret.png',
        audio: '/VO/Computer/gw/board_tech_available_artillery',
        getContext: function(galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_defences_t1')) {
                chance = (dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/land/land_barrier/land_barrier.json',
                '/pa/units/land/laser_defense/laser_defense.json',
                '/pa/units/land/artillery_short/artillery_short.json',
            ]);
        }
    };
});
