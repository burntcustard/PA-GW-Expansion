// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: 'upgrades',
        describe: 'Decreases the metal build cost of all bots by 20%, and decreases the T1 and T2 bot factory roll off time by 30%',
        summarize: 'Bot Mass Production Tech',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png',
        audio: '/VO/Computer/gw/board_tech_available_cost_reduction',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_cost_bots')) {
                chance = (dist <= 5 ? 40 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory) {
            var mods = [];

            var facs = [
                '/pa/units/land/bot_factory/bot_factory.json',
                '/pa/units/land/bot_factory_adv/bot_factory_adv.json'
            ];
            _.forEach(facs, function(unit) {
                mods.push(
                    {
                        // 3s -> 2.1s
                        file: unit,
                        path: 'factory_cooldown_time',
                        op: 'multiply',
                        value: .7
                    },
                    {
                        file: unit,
                        path: 'description',
                        op: 'add',
                        value: ' Bot Mass Production Tech: All units －⁠20% cost, －⁠30% roll off time.'
                    }
                );
            });

            var bots = [
                // T1
                '/pa/units/land/fabrication_bot/fabrication_bot.json',
                '/pa/units/land/fabrication_bot_combat/fabrication_bot_combat.json',
                '/pa/units/land/assault_bot/assault_bot.json',
                '/pa/units/land/bot_bomb/bot_bomb.json',
                '/pa/units/land/bot_grenadier/bot_grenadier.json',
                '/pa/units/land/bot_tesla/bot_tesla.json',

                // T2
                '/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json',
                '/pa/units/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv.json',
                '/pa/units/land/assault_bot_adv/assault_bot_adv.json',
                '/pa/units/land/bot_sniper/bot_sniper.json',
                '/pa/units/land/bot_tactical_missile/bot_tactical_missile.json',
                '/pa/units/land/bot_nanoswarm/bot_nanoswarm.json',

                // Other
                '/pa/units/land/bot_support_commander/bot_support_commander.json',
                '/pa/units/land/titan_bot/titan_bot.json'
            ];
            _.forEach(bots, function(unit) {
                mods.push(
                    {
                        file: unit,
                        path: 'build_metal_cost',
                        op: 'multiply',
                        value: .8
                    },
                    {
                        file: unit,
                        path: 'description',
                        op: 'add',
                        value: ' Bot Mass Production Tech: －⁠20% cost.'
                    }
                );
            });

            inventory.addMods(mods);
        }
    };
});
