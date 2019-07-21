// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'units',
        describe: 'Enables building of the Kauju Hover Destroyer from advanced naval factories.',
        summarize: 'Destroyer Class<br>Kaiju Hover',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_naval.png',
        audio: '/VO/Computer/gw/board_tech_available_sea',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_kaiju')) {
                chance = (2 < dist && dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/sea/hover_ship/hover_ship.json'
            ]);
        }
    };
});
