// !LOCNS:galactic_war
define(['shared/gw_common'], function(GW) {
    return {
        type: function() { return 'upgrades'; },
        describe: function(params) {
            return 'Increases the range of flamethrowers by 20%';
        },
        summarize: function(params) {
            return 'Flamethrower range +20%';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_super_weapons.png';
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
            if (!inventory.hasCard('gwc_flamethrower_range') &&
                inventory.hasCard('gwc_enable_infernos')) { // Only enabled after you unlock infernos!
                chance = (dist <= 5) ? 400:0;
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            var weaps = [
                '/pa/units/land/tank_armor/tank_armor_tool_weapon.json',
            ];
            _.forEach(weaps, function(weap) {
                inventory.addMods([
                    {
                    // Range 20 -> 24
                    file: weap,
                    path: 'max_range',
                    op: 'multiply',
                    value: 1.2
                }//,
                //{
                    // // Make the gunships circle around enemies at slightly longer distance.
                    // // May cause issues with non-flamethrower gunships...
                    // file: '/pa/units/air/gunship/gunship.json',
                    // path: 'navigation.aggressive_distance',
                    // op: 'multiply',
                    // value: 1.2
                //}
                ]);
            });
            inventory.addMods([
                {
                    file: '/pa/units/land/tank_armor/tank_armor_muzzle_flame.pfx',
                    path: 'emitters',
                    op: 'replace',
                    value: [
                        {
                          "spec":{
                            "shape":"pointlight",
                            "red":1.0,
                            "green":0.4,
                            "blue":0.0,
                            "alpha":{
                              "keys":[
                                [
                                  0,
                                  0
                                ],
                                [
                                  0.5,
                                  10
                                ],
                                [
                                  1,
                                  0
                                ]
                              ]
                            }
                          },
                          "velocityY":-1,
                          "velocity":0.0,
                          "sizeX":10,
                          "sizeRangeX":1,
                          "emissionBursts":[
                            {
                              "time":0,
                              "count":1
                            },
                            {
                              "time":0.15,
                              "count":1
                            }
                          ],
                          "lifetime":0.3,
                          "emitterLifetime":0.3,
                          "killOnDeactivate":true,
                          "bLoop":false,
                          "endDistance":850
                        },
                        {
                          "spec":{
                            "shader":"particle_transparent",
                            "facing":"velocity",
                            "size":{
                              "keys":[
                                [
                                  0,
                                  0.75
                                ],
                                [
                                  0.5,
                                  1.25
                                ],
                                [
                                  1,
                                  0
                                ]
                              ]
                            },
                            "red":{
                              "keys":[
                                [
                                  0,
                                  2.0
                                ],
                                [
                                  0.2,
                                  2.0
                                ],
                                [
                                  0.65,
                                  1.5
                                ]
                              ]
                            },
                            "green":{
                              "keys":[
                                [
                                  0,
                                  2.0
                                ],
                                [
                                  0.2,
                                  0.6
                                ],
                                [
                                  0.65,
                                  0.05
                                ]
                              ]
                            },
                            "blue":{
                              "keys":[
                                [
                                  0,
                                  2.0
                                ],
                                [
                                  0.2,
                                  0.2
                                ],
                                [
                                  0.65,
                                  0.01
                                ]
                              ]
                            },
                            "baseTexture":"/pa/effects/textures/particles/flamethrower.papa",
                            "dataChannelFormat":"PositionColorAndAlignVector"
                          },
                          "velocityY":-1,
                          "velocityRangeX":0.07,
                          "velocityRangeZ":0.07,
                          "velocity":130.0,
                          "velocityRange":30.0,
                          "drag":0.96,
                          "gravity":25,
                          "sizeX":2,
                          "sizeY":3.5,
                          "sizeRangeY":1.5,
                          "emissionBursts":1,
                          "emissionRate":85,
                          "lifetime":2.5,
                          "emitterLifetime":1.5,
                          "useWorldSpace":true,
                          "endDistance":8000,
                          "bLoop":false
                        },
                        {
                          "spec":{
                            "shader":"particle_add_soft",
                            "size":{
                              "keys":[
                                [
                                  0,
                                  0.75
                                ],
                                [
                                  0.5,
                                  1.25
                                ],
                                [
                                  1,
                                  0
                                ]
                              ]
                            },
                            "red":{
                              "keys":[
                                [
                                  0,
                                  2.0
                                ],
                                [
                                  0.2,
                                  2.0
                                ],
                                [
                                  0.65,
                                  1.5
                                ]
                              ]
                            },
                            "green":{
                              "keys":[
                                [
                                  0,
                                  2.0
                                ],
                                [
                                  0.2,
                                  0.6
                                ],
                                [
                                  0.65,
                                  0.05
                                ]
                              ]
                            },
                            "blue":{
                              "keys":[
                                [
                                  0,
                                  2.0
                                ],
                                [
                                  0.2,
                                  0.2
                                ],
                                [
                                  0.65,
                                  0.01
                                ]
                              ]
                            },
                            "alpha":{
                              "keys":[
                                [
                                  0,
                                  0
                                ],
                                [
                                  0.2,
                                  1
                                ],
                                [
                                  1,
                                  0
                                ]
                              ]
                            },
                            "cameraPush":0.5,
                            "baseTexture":"/pa/effects/textures/particles/softdot.papa",
                            "dataChannelFormat":"PositionAndColor"
                          },
                          "offsetY":-0.3,
                          "velocityY":-1,
                          "velocity":5.0,
                          "sizeX":4,
                          "emissionBursts":1,
                          "emissionRate":10,
                          "lifetime":0.25,
                          "lifetimeRange":0.1,
                          "emitterLifetime":0.3,
                          "useWorldSpace":true,
                          "endDistance":400,
                          "bLoop":false,
                          "sort":"NoSort"
                        }
                    ]
                }
            ]);
        }
    };
});
