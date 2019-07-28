// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'commanderSecondary',
        describe: 'Gives the commander a powerful Uber Cannon, activated via alternative fire.',
        summarize: 'Uber Cannon',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_energy.png',
        audio: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade',
        deal: function(system, context) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_commander_uber_basic')) {
                chance = (dist <= 3) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            inventory.addMods([
                {
                    // Re-add secondary fire
                    file: '/pa/units/commanders/base_commander/base_commander.json',
                    path: 'command_caps',
                    op: 'push',
                    value: 'ORDER_FireSecondaryWeapon'
                }
            ]);
        }
    };
});
