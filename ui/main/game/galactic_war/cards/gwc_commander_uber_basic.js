define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'commanderSecondary'; },
        describe: function(params) {
            return 'Gives the commander a powerful Uber Cannon, activated via alternative fire.';
        },
        summarize: function(params) {
            return 'Uber Cannon';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_energy.png';
        },
        audio: function(parms) {
            return {
                found: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade'
            }
        },
        getContext: function(galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function(system, context) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_commander_uber_basic')) {
                chance = (dist <= 3) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addMods([
                {
                    // Re-add secondary fire
                    file: '/pa/units/commanders/base_commander/base_commander.json',
                    path: 'command_caps',
                    op: 'push',
                    value: 'ORDER_FireSecondaryWeapon'
                },
                {
                    // Do more damage than vanilla to other commanders & structures .25 -> .5
                    file: '/pa/ammo/cannon_uber',
                    path: 'armour_damage_map',
                    op: 'replace',
                    value: {
                        "AT_Commander": 0.5,
                        "AT_Structure": 0.5
                    }
                }
            ]);
        }
    };
});
