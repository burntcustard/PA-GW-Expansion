// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'commanderSecondary',
        describe: 'Gives the commander a Dox launcher alt fire ability!',
        summarize: 'Commander Dox Launcher',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_energy.png',
        audio: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade',
        getContext: function(galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_commander_uber_dox')) {
                chance = (dist >= 2) ? 40:0;
            }
            return { chance: 999 };
        },
        buff: function(inventory) {
            var comm = '/pa/units/commanders/base_commander/base_commander.json';
            var weap = '/pa/tools/uber_cannon/uber_cannon.json';
            var ammo = '/pa/ammo/cannon_uber/cannon_uber.json';
            inventory.addMods([
                {
                    // Re-add secondary fire
                    file: comm,
                    path: 'command_caps',
                    op: 'push',
                    value: 'ORDER_FireSecondaryWeapon'
                },
                {
                    file: weap,
                    path: 'ammo_capacity',
                    op: 'replace',
                    value: 60
                },
                {
                    file: weap,
                    path: 'ammo_demand',
                    op: 'replace',
                    value: 2
                },
                {
                    file: weap,
                    path: 'ammo_id',
                    op: 'replace',
                    value: '/pa/units/land/artillery_unit_launcher/artillery_unit_launcher_ammo.json'
                },
                {
                    file: weap,
                    path: 'ammo_per_shot',
                    op: 'replace',
                    value: 60
                },
                {
                    file: weap,
                    path: 'ammo_source',
                    op: 'replace',
                    value: 'metal'
                },
                {
                    file: weap,
                    path: 'max_firing_velocity',
                    op: 'replace',
                    value: 125
                },
                {
                    file: weap,
                    path: 'max_range',
                    op: 'replace',
                    value: 300
                },
                {
                    file: weap,
                    path: 'min_firing_velocity',
                    op: 'replace',
                    value: 100
                }
            ]);
        }
    };
});
