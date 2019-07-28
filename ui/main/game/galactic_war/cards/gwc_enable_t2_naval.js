// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'units',
        describe: 'Enables construction of advanced naval units (Kraken, Stringray, Leviathan) from the Advanced Naval Factory, built via any naval fabricator.',
        summarize: 'Advanced Naval Tech',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_naval.png',
        audio: '/VO/Computer/gw/board_tech_available_sea',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_t2_naval')) {
                chance = (2 < dist && dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            inventory.addUnits([
                '/pa/units/sea/naval_factory_adv/naval_factory_adv.json'
            ]);
        }
    };
});
