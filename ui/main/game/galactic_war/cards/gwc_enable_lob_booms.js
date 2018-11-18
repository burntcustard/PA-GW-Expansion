// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        type: function() { return 'units'; },
        describe: function(params) {
            return 'Enables building of the Boom Bot Launcher by basic fabricators.';
        },
        summarize: function(params) {
            return 'Boom Bot Launcher Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_artillery.png';
        },
        audio: function(parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_bot'
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
            if (!inventory.hasCard('gwc_enable_lob_booms')) {
                chance = (0 < dist && dist <= 5 ? 40 : 0);
            }
            return { chance: chance };

        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/land/artillery_unit_launcher/artillery_unit_launcher.json'
            ]);
            inventory.addMods([
                {
                    file: '/pa/units/land/artillery_unit_launcher/artillery_unit_launcher.json',
                    path: 'display_name',
                    op: 'replace',
                    value: 'Boom Lob'
                },
                {
                    file: '/pa/units/land/artillery_unit_launcher/artillery_unit_launcher.json',
                    path: 'description',
                    op: 'replace',
                    value: 'Boom Launcher- Builds and fires Boom bots at nearby targets.'
                },
                {
                    file: '/pa/units/land/artillery_unit_launcher/artillery_unit_launcher_ammo.json',
                    path: 'spawn_unit_on_death',
                    op: 'replace',
                    value: '/pa/units/land/bot_bomb/bot_bomb.json'
                }
            ]);
        }
    };
});
