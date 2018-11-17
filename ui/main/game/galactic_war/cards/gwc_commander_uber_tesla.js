define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'commanderUber'; },
        describe: function(params) {
            return 'Replaces the commanders Uber Cannon with a powerful Uber Tesla Gun';
        },
        summarize: function(params) {
            return 'Uber Tesla Gun';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_energy.png';
        },
        audio: function (parms) {
            return {
                found: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade'
            }
        },
        getContext: function (galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function (system, context) {
            var chance = 0;
            var dist = system.distance();
                chance = (dist >= 2) ? 200:0;
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var weap = '/pa/tools/uber_cannon/uber_cannon.json'
            inventory.addMods([
                {
                    file: weap,
                    path: 'ammo_capacity',
                    op: 'multiply',
                    value: 2.0
                },
                {
                    // Draws twice as much power as default Uber Cannon while recharging
                    file: weap,
                    path: 'ammo_demand',
                    op: 'multiply',
                    value: 2.0
                },
                {
                    file: weap,
                    path: 'ammo_per_shot',
                    op: 'multiply',
                    value: 2.0
                },
                {
                    file: weap,
                    path: 'ammo_id',
                    op: 'replace',
                    value: '/pa/units/air/titan_air_ammo/titan_air_ammo.json'
                }
            ]);
        }
    };
});
