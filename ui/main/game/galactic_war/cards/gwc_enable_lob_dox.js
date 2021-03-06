// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'units',
        describe: 'Enables building of the Lob Bot Launcher by basic fabricators.',
        summarize: 'Dox Bot Launcher Tech',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_artillery.png',
        audio: '/VO/Computer/gw/board_tech_available_bot',
        deal: function (system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_enable_lob_dox')) {
                chance = (0 < dist && dist <= 5 ? 40 : 0);
            }
            return { chance: chance };

        },
        buff: function(inventory) {
            inventory.addUnits([
                '/pa/units/land/artillery_unit_launcher/artillery_unit_launcher.json'
            ]);
            inventory.addMods([
                {
                    file: '/pa/units/land/artillery_unit_launcher/artillery_unit_launcher.json',
                    path: 'display_name',
                    op: 'replace',
                    value: 'Dox Lob'
                },
                {
                    file: '/pa/units/land/artillery_unit_launcher/artillery_unit_launcher.json',
                    path: 'description',
                    op: 'replace',
                    value: 'Assault Bot Launcher- Builds and fires Dox at nearby targets.'
                }
            ]);
        }
    };
});
