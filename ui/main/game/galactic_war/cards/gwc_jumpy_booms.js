// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'upgrades'; },
        describe: function(params) {
            return 'Gives Boom bots longer view distance and allows them to POUNCE on their enemies.';
        },
        summarize: function(params) {
            return 'Pouncing Boom bots';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png';
        },
        audio: function (parms) {
            return {
                found: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade'
            }
        },
        getContext: function (galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function (system, context, inventory) {
            var chance = 0;
            var dist = system.distance();
            if (!inventory.hasCard('gwc_jumpy_booms') &&
                inventory.hasCard('gwc_enable_booms')) { // Only findable after booms unlocked
                chance = (dist <= 5 ? 400 : 0);
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var mods = [];
            mods.push(
            // Boom bot
            {
                file: '/pa/units/land/bot_bomb/bot_bomb.json',
                path: 'display_name',
                op: 'replace',
                value: 'Pouncing Boom'
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb.json',
                path: 'description',
                op: 'replace',
                value: 'Pouncing bomb bot- Equipped with Self Destruction mechanism. Jumps onto enemies.'
            },
            {
                // Remove explosion effect when the Boom dies (jumping or being killed).
                file: '/pa/units/land/bot_bomb/bot_bomb.json',
                path: 'events.died.effect_spec',
                op: 'replace',
                value: ''
            },
            {
                // Remove scorch mark when the Boom "jumps"
                file: '/pa/units/land/bot_bomb/bot_bomb.json',
                path: 'death.decals',
                op: 'replace',
                value: ''
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb.json',
                path: 'recon.observer',
                op: 'replace',
                value: {
                  "items":[
                    {
                      "channel": "sight",
                      "layer": "surface_and_air",
                      "radius": 30,
                      "shape": "capsule"
                    },
                    {
                      "channel": "sight",
                      "layer": "underwater",
                      "radius": 30,
                      "shape": "capsule"
                    }
                  ]
                }
            },
            // Weapon
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                path: 'firing_standard_deviation',
                op: 'replace',
                value: 3
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                path: 'max_range',
                op: 'replace',
                value: 25
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                path: 'pitch_range',
                op: 'replace',
                value: 40
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                path: 'pitch_rate',
                op: 'replace',
                value: 3600
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                path: 'yaw_range',
                op: 'replace',
                value: 180
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                path: 'yaw_rate',
                op: 'replace',
                value: 3600
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_tool_weapon.json',
                path: 'target_priorities',
                op: 'replace',
                value: [
                    "Fabber",
                    "MetalProduction",
                    "Structure - Wall",
                    "Mobile - Air",
                    "Wall"
                ]
            },
            // Ammo (the tricky one)
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'ammo_type',
                op: 'replace',
                value: 'AMMO_Projectile'
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'flight_type',
                op: 'replace',
                value: 'Ballistic'
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'physics',
                op: 'replace',
                value: {
                    "add_to_spatial_db": false,
                    "allow_underground": false,
                    "gravity_scalar": 10,
                    "radius": 1
                }
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'spawn_layers',
                op: 'replace',
                value: 'WL_Air'
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'sim_fire_effect',
                op: 'remove'
            },
            // {
            //     file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
            //     path: 'impact_decals',
            //     op: 'replace',
            //     value: ''
            // },
            // {
            //     file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
            //     path: 'damage_volume',
            //     op: 'replace',
            //     value: ''
            // },
            // {
            //     file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
            //     path: 'base_spec',
            //     op: 'replace',
            //     value: '/pa/ammo/base_artillery/base_artillery.json'
            // },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'model.filename',
                op: 'replace',
                value: '/pa/units/land/bot_bomb/bot_bomb.papa'
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'recon.observer.items',
                op: 'replace',
                value: [{
                    "channel": "sight",
                    "layer": "surface_and_air",
                    "radius": 10,
                    "shape": "capsule"
                }]
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'splash_damage',
                op: 'replace',
                value: 400
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'damage',
                op: 'replace',
                value: 400
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'min_velocity',
                op: 'replace',
                value: 20
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'initial_velocity',
                op: 'replace',
                value: 60
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'max_velocity',
                op: 'replace',
                value: 80
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'lifetime',
                op: 'replace',
                value: 3
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'events',
                op: 'replace',
                value: {
                  "died": {
                    "audio_cue": "/SE/Impacts/bomb_bot_plasma",
                    "effect_spec": "/pa/units/land/bot_bomb/bot_bomb_ammo_explosion.pfx"
                  }
                }
            },
            {
                file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
                path: 'impact_decals',
                op: 'replace',
                value: ["/pa/effects/specs/scorch_a_01.json"]
            }
        );
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
