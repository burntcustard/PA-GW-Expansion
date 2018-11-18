// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'commanderPassive'; },
        describe: function(params) {
            return 'Commander Regen Tech automatically repairs the commander 1% every 3 seconds and makes it much cheaper to repair with fabricators.';
        },
        summarize: function(params) {
            return 'Commander Regen Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_commander_armor.png';
        },
        audio: function(parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_armor'
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
            if (!inventory.hasCard('gwc_commander_regen')) {
                chance = (dist <= 5) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var unit = '/pa/units/commanders/base_commander/base_commander.json';
            inventory.addMods([
                {
                    file: unit,
                    path: 'passive_health_regen',
                    op: 'replace',
                    value: 41.66
                },
                {
                    file: unit,
                    path: 'wreckage_health_frac',
                    op: 'replace',
                    value: 0
                },
                {
                    // Cheaper to repair. Default = 25000
                    file: unit,
                    path: 'build_metal_cost',
                    op: 'replace',
                    value: 5000
                }
            ]);
        }
    };
});
