// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'units',
        describe: 'Enables building of the Inferno Heavy Flamethrower Tank from basic vehicle factories.',
        summarize: 'Inferno Heavy<br>Flamethrower Tank',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_vehicle.png',
        audio: '/VO/Computer/gw/board_tech_available_vehicle',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_infernos')) {
                chance = (dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            inventory.addUnits([
                '/pa/units/land/tank_armor/tank_armor.json'
            ]);
        }
    };
});
