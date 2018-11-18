// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        type: function() { return 'units'; },
        describe: function(params) {
            return 'Enables construction of the Holkins T2 artillery cannon via any advanced fabricator.';
        },
        summarize: function(params) {
            return 'Artillery Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_artillery.png';
        },
        audio: function(parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_artillery'
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
            if (!inventory.hasCard('gwc_enable_defenses_t2')) {
                chance = (2 < dist && dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/land/air_defense_adv/air_defense_adv.json',
                '/pa/units/land/laser_defense_adv/laser_defense_adv.json',
                '/pa/units/land/artillery_long/artillery_long.json',
                '/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json',
                '/pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv.json',
            ]);
        }
    };
});
