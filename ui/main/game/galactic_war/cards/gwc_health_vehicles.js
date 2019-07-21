// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'upgrades',
        describe: 'Increases health of all vehicles by 30%',
        summarize: 'Vehicle Armor Tech',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_vehicle_armor.png',
        audio: '/VO/Computer/gw/board_tech_available_armor',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_health_vehicles')) {
                chance = (dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/land/fabrication_vehicle/fabrication_vehicle.json',
                '/pa/units/land/tank_light_laser/tank_light_laser.json',
                '/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json',
                '/pa/units/land/tank_armor/tank_armor.json',
                '/pa/units/land/land_scout/land_scout.json',
                '/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json',
                '/pa/units/land/tank_laser_adv/tank_laser_adv.json',
                '/pa/units/land/tank_heavy_armor/tank_heavy_armor.json',
                '/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json',
                '/pa/units/land/tank_hover/tank_hover.json',
                '/pa/units/land/tank_flak/tank_flak.json',
                '/pa/units/land/tank_nuke/tank_nuke.json'
            ];
            _.forEach(units, function(unit) {
                inventory.addMods([
                    {
                        file: unit,
                        path: 'max_health',
                        op: 'multiply',
                        value: 1.3
                    },
                    {
                        file: unit,
                        path: 'description',
                        op: 'add',
                        value: ' Armor Tech: ＋30% health.'
                    }
                ]);
            });
        }
    };
});
