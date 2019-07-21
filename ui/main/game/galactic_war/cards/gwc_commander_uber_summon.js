// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'commanderSecondary'; },
        describe: 'Lets the commander summon a single support commander per game',
        summarize: 'Summon Support Commander',
        icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_energy.png',
        audio: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade',
        deal: function(system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_commander_uber_summon')) {
                chance = (dist >= 2) ? 40:0;
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
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
                    path: 'max_range',
                    op: 'replace',
                    value: 200
                },
                {
                    file: ammo,
                    path: 'turn_rate',
                    op: 'replace',
                    value: 1000
                },
                {
                    file: ammo,
                    path: 'audio_loop',
                    op: 'delete'
                },
                {
                    file: ammo,
                    path: 'spawn_unit_on_death',
                    op: 'replace',
                    value: '/pa/units/land/bot_support_commander/bot_support_commander.json'
                },
                {
                    file: ammo,
                    path: 'events.died',
                    op: 'replace',
                    value: {
                        "audio_cue": "/SE/Movement/commander/Commander_game_start_landing",
                        "effect_spec": "/pa/effects/specs/default_commander_landing.pfx",
                        "effect_scale": 0.7
                    }
                },
                {
                    file: ammo,
                    path: 'initial_velocity',
                    op: 'replace',
                    value: 1000
                },
                {
                    file: ammo,
                    path: 'max_velocity',
                    op: 'replace',
                    value: 1000
                },
                {
                    file: ammo,
                    path: 'damage',
                    op: 'replace',
                    value: 0
                },
                {
                    file: weap,
                    path: 'ammo_per_shot',
                    op: 'replace',
                    value: 10000
                },
                {
                    file: weap,
                    path: 'ammo_capacity',
                    op: 'replace',
                    value: 10000
                },
                {
                    file: weap,
                    path: 'ammo_demand',
                    op: 'replace',
                    value: 1
                }
            ]);
        }
    };
});
