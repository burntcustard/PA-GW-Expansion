// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'upgrades',
        describe: 'Increases the damage of lasers by 30%',
        summarize: 'Overcharged Capacitors',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_super_weapons.png',
        audio: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_laser_damage')) {
                chance = (dist <= 5) ? 40 : 0;
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            var units = [
                '/pa/units/land/laser_defense/laser_defense.json',
                '/pa/units/land/laser_defense_adv/laser_defense_adv.json',
                '/pa/units/land/laser_defense_single/laser_defense_single.json',
                '/pa/units/orbital/defense_satellite/defense_satellite.json'
            ];
            _.forEach(units, function(unit) {
                inventory.addMods([
                    {
                        file: unit,
                        path: 'description',
                        op: 'add',
                        value: ' Overcharged Capacitors: +30% damage.'
                    }
                ]);
            });

            var ammos = [                                                                 // Damage
                '/pa/units/land/laser_defense/laser_defense_ammo.json',                   // 75 -> 97.5
                '/pa/units/land/laser_defense_adv/laser_defense_adv_ammo.json',           // 150 -> 195
                '/pa/units/land/laser_defense_single/laser_defense_single_ammo.json',     // 40 -> 52
                '/pa/units/orbital/defense_satellite/defense_satellite_ammo_ground.json', // 65 -> 84.5
                '/pa/units/orbital/defense_satellite/defense_satellite_ammo_orbital.json' // 65 -> 84.5
            ];
            _.forEach(ammos, function(ammo) {
                inventory.addMods([
                    {
                        file: ammo,
                        path: 'damage',
                        op: 'multiply',
                        value: 1.3
                    }
                ]);
            });
        }
    };
});
