// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'units'; },
        describe: function (params) {
            return 'Enables construction of advanced naval units (Kraken, Stringray, Leviathan) from the Advanced Naval Factory, built via any naval fabricator.';
        },
        summarize: function(params) {
            return 'Advanced Naval Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_naval.png';
        },
        audio: function(parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_sea'
            }
        },
        getContext: function(galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_t2_naval')) {
                chance = (2 < dist && dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/sea/naval_factory_adv/naval_factory_adv.json'
            ]);
        }
    };
});
