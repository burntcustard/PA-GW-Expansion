// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'upgrades',
        describe: 'Equips the Bumblebee basic bomber with a larger bomb bay.<br><br>+100% ammo capacity',
        summarize: 'Extra Bombs',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_combat_air.png',
        audio: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_bomber_capacity')) {
                chance = (dist <= 5) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            inventory.addMods([
                {
                    file: '/pa/units/air/bomber/bomber.json',
                    path: 'description',
                    op: 'replace',
                    value: 'Bomber- Equipped with basic anti-land and anti-naval bombs. Extra bombs tech: +100% ammo capacity'
                },
                {
                    file: '/pa/units/air/bomber/bomber_tool_weapon.json',
                    path: 'ammo_capacity',
                    op: 'multiply',
                    value: 2
                }
            ]);
        }
    };
});
