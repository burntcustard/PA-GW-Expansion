// !LOCNS:galactic_war
define([], function () {
    return {
        name: 'Synchronous',
        color: [[244,125,31], [192,192,192]],
        teams: [
            {
                name: 'Cupru - Synchronous',
                boss: {
                    name: 'Metrarch the Machinist',
                    econ_rate: 1.0,
                    personality: {
                        percent_land: 0.3,
                        percent_air: 0.3,
                        percent_naval: 0.05,
                        percent_orbital: 0.35,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                    minions: [
                        {
                            name: 'Servant Aust',
                            econ_rate: 0.7,
                            color: [[244,125,31], [192,192,192]],
                            personality: {
                                percent_land: 0.375,
                                percent_orbital: 0.15,
                                percent_air: 0.425,
                                percent_naval: 0.05,
                                metal_drain_check: 0.75,
                                energy_drain_check: 0.85,
                                metal_demand_check: 0.75,
                                energy_demand_check: 0.85,
                                micro_type: 2,
                                go_for_the_kill: true,
                                neural_data_mod: 1
                            },
                            commander: '/pa/units/commanders/tank_aeson/tank_aeson.json'
                        }
                    ]
                },
                ownCards: [
                    'gwc_laser_tanks_t1'
                ],
                bossCard: 'gwc_start_bot',
                systemDescription: "!LOC:All commanders were originally designed to be autonomous, but The Synchronous see this state as inefficient, instead opting for a distributed neural network. To battle against one Servant is to battle against both an individual and the Whole of the The Synchronous itself.",
                systemTemplate: {
                    name: 'Cupru - Synchronous',
                    Planets: [
                        {
                            name: 'Cupru Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 500],
                            Height: [10, 20],
                            Water: [0, 0],
                            Temp: [0, 0],
                            MetalDensity: [75, 90],
                            MetalClusters: [24, 49],
                            BiomeScale: [100, 100],
                            Position: [-25000, 0],
                            Velocity: [0, -141.4213],
                            Biomes: ['earth']
                        },
                        {
                            name: 'Cupru Beta',
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [0, 0],
                            Radius: [250, 250],
                            Height: [10, 20],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [100, 100],
                            BiomeScale: [100, 100],
                            Position: [-21500, 0],
                            Velocity: [0, -260.944213],
                            Biomes: ['metal_boss']
                        },
                        {
                            name: 'Cupru Halley',
                            starting_planet: false,
                            mass: 35000,
                            Thrust: [3, 3],
                            Radius: [499, 499],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [50, 50],
                            MetalClusters: [25, 49],
                            BiomeScale: [100, 100],
                            Position: [-75000, 1000],
                            Velocity: [1.08851337, 81.6387787],
                            Biomes: ['metal_boss']
                        },
                        {
                            name: 'Cupru Catalyst',
                            starting_planet: false,
                            mass: 35000,
                            Thrust: [0, 0],
                            Radius: [500, 500],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [50, 50],
                            MetalClusters: [25, 49],
                            BiomeScale: [100, 100],
                            Position: [-75000, -1000],
                            Velocity: [1.08851337, -81.6387787],
                            Biomes: ['metal']
                        }
                    ]
                },
            }
        ], // teams
        minions: [
            {
                name: 'Servant Bhalam',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Bhalam refuses to communicate in any form more advanced than binary data transfer, believing more complicated exchanges involving packets and complex files to be noisy and that they damage Synchronization. Ironically, this has made him one of the less popular commanders among The Synchronous.",
                commander: '/pa/units/commanders/raptor_stickman9000/raptor_stickman9000.json'
            },
            {
                name: 'Servant Campal',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Campal was found activated but inert on  richly diverse jungle planet. Apparently, his servos had been caught by a thicket and rendered him prone--unable to self-right without aid. Since then, his intense hatred of all organic life has kept him one of the stronger-willed members of The Synchronous, often torching entire forests on principle.",
                commander: '/pa/units/commanders/tank_banditks/tank_banditks.json'
            },
            {
                name: 'Servant Dkar',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Formerly a Foundation member before her synchronization, Dkar found and accessed progenitor files that allowed her to decode and etch ancient codes on a physical surface for others to later serialize. While many Servants find this analog communication distasteful, it’s proven invaluable for passing along intelligence in secrecy.",
                commander: '/pa/units/commanders/raptor_rallus/raptor_rallus.json'
            },
            {
                name: 'Servant Erom',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:While rare, there are Servants who seek out Synchronous systems and request to be synchronized. Often these individuals hope to be freed by mounting existential questions and fears as their neural nets process more and more complicated data models. Erom is one such example.",
                commander: '/pa/units/commanders/quad_xinthar/quad_xinthar.json'
            },
            {
                name: 'Servant Flornek',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Revenants tend to be the most difficult commanders to synchronize, whether due to an inherent individualism or their tendency to feature… Unorthodox modifications. Flornek, for example, has experienced several violent desynchronizations and following resynchronizations.",
                commander: '/pa/units/commanders/quad_xenosentryprime/quad_xenosentryprime.json'
            },
            {
                name: 'Servant Ghel',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:The Synchronous tend to require more infrastructure to operate effectively compared to the other factions. Ghel is responsible for establishing and maintaining the communication relays that allow synchronization to be maintained.",
                commander: '/pa/units/commanders/quad_theflax/quad_theflax.json'
            },
            {
                name: 'Servant Hinn',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Hinn is could be called an envoy for the Synchronous, often responsible for making first contact with newly-awoken commanders. Legion commanders refer to him as a carrier--one who infects others with the 'Synchronous Virus.'",
                commander: '/pa/units/commanders/quad_gambitdfa/quad_gambitdfa.json'
            },
            {
                name: 'Servant Inar-Tol',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:An undeniable advantage to being Synchronized is that all Servants seem to be able to work much more cohesively as a group than other commanders. Inar-Tol, for example, once dispatched a commander by firing an artillery shell into the stratosphere based on data from an ally that was engaged in melee combat--on the other side of the planet.",
                commander: '/pa/units/commanders/quad_potbelly79/quad_potbelly79.json'
            },
            {
                name: 'Servant Jakaal',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Many older members of The Synchronous are very similar just by nature of being synchronized for so long. As the years wore on more of Jakaal dissolved into the synchronized whole. Now when Jakaal speaks, she speaks with the voice of The Synchronous itself.",
                commander: '/pa/units/commanders/tank_banditks/tank_banditks.json'
            },
            {
                name: 'Servant Kancetu',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:A former Foundation Acolyte, Kancetu believes that the Great Machine is less an outside function and more an underlying directive that exists within all commanders, which made her a very easy subject for synchronization.",
                commander: '/pa/units/commanders/raptor_rallus/raptor_rallus.json'
            },
            {
                name: 'Servant Lertolux',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Some commanders, like Lertolux, are found on metal planets and considered “pure” by The Synchronous--unsullied by organic life. Much more of their neural data is integrated into the Whole during the synchronization process, and such events are seen as cause for celebration--as much as The Synchronous are capable celebrating, at least.",
                commander: '/pa/units/commanders/imperial_enzomatrix/imperial_enzomatrix.json'
            },
            {
                name: 'Servant Mal-Locar',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:The process of synchronization is imperfect, and can sometimes result in strange bugs. A commander known as Reroc finished synchronization with the name Mal-Locar. It is unclear whether this is a simple matter of memory corruption or if Mal-Locar was a unique identity drifting in the Whole.",
                commander: '/pa/units/commanders/raptor_diremachine/raptor_diremachine.json'
            },
            {
                name: 'Servant Negult',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Negult is a 'digit' -- a commander who has completely given herself over to collective control. Having shed any semblance of personal identity, she is often given sensitive or odious tasks that might cause hesitation in a semi-autonomous commander. She is the Synchronus’ go-to asset for eliminating insufficiently-synchronized members of the collective.",
                commander: '/pa/units/commanders/tank_banditks/tank_banditks.json'
            },
            {
                name: 'Servant Oncab',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Oncab was captured by the Legionis Machina and spent several years as a legate before being recaptured and resynchronized. A residual independence leads him to initiate critical decision-making processes within the collective -- an attribute that is tactically valuable but leads others in his cohort to doubt his commitment to the Synchronous.",
                commander: '/pa/units/commanders/imperial_theta/imperial_theta.json'
            },
            {
                name: 'Servant Prulor',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Optimized with a low-latency, high-bandwidth link directly to the top of the Synchronous, Prulor is Metrarch’s lightning-fast right hand. He is only dispatched to deal with high-value or especially difficult adversaries. He has never failed.",
                commander: '/pa/units/commanders/imperial_aceal/imperial_aceal.json'
            },
            {
                name: 'Servant Questromo',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Questromo is frequently deployed beyond the integral network volume of the Synchronous, and has therefore been imbued with limited self-sufficiency. When he returns from tours abroad, he undergoes complete re-synchronization. When powered-down for deep-space transport, he sometimes has strange dreams.",
                commander: '/pa/units/commanders/raptor_stickman9000/raptor_stickman9000.json'
            },
            {
                name: 'Servant Rulak',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Barely autonomous enough to deserve a name of his own, Rulak is a stripped-down and highly-obedient subroutine who is easily duplicated. Prized for his recklessness, he is often given highly-dangerous missions that result in his death. A copy of his “personality” is then quickly downloaded into a new body.",
                commander: '/pa/units/commanders/raptor_diremachine/raptor_diremachine.json'
            },
            {
                name: 'Servant Shelwhu',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:The Synchronus’ eager “orientation engineer,” Shelwhu is the instrument by which captured enemy commanders are cleansed before integration into the collective. She takes a perverse pleasure in stripping away beings’ former identities. Her methods are well-known to the Synchronous’ adversaries, and many of her foes choose death over capture.",
                commander: '/pa/units/commanders/quad_spartandano/quad_spartandano.json'
            },
            {
                name: 'Servant Tarcolish',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:An older commander with a periodically-unreliable connection to the Synchronous’ network, Tarcolish occasionally falls out of synchronization with the collective for hours at a time. When she reconnects, she acts as if the breakdown has not occurred. She then invariably repeats statements that others have made already. It’s super annoying to everybody. ",
                commander: '/pa/units/commanders/quad_gambitdfa/quad_gambitdfa.json'
            },
            {
                name: 'Servant Urlox',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:A gifted mimic, Urlox can imitate the mannerisms of all three adversary factions and has infiltrated and sabotaged several enemy encampments. Because she must 'think like the enemy' during these missions, she occasionally loses sight of her real identity and requires resynchronization.",
                commander: '/pa/units/commanders/quad_twoboots/quad_twoboots.json'
            },
            {
                name: 'Servant Vela',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Vela rejects the Synchronous’ universal contempt for all things organic, instead arguing for further experiments on machine-organism integration. She has attempted several times to interface with shrubs, with limited success. She is considered a leading candidate for forcible deep-system re-synchronization.",
                commander: '/pa/units/commanders/raptor_betadyne/raptor_betadyne.json'
            },
            {
                name: 'Servant Worr',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:An ancient commander whose provenance is not well understood, his low-bandwidth communications link is often irksome to other commanders, who can’t stand the extended hissing noise that precedes the arrival of every message.",
                commander: '/pa/units/commanders/imperial_aceal/imperial_aceal.json'
            },
            {
                name: 'Servant Xiercy',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Xiercry so detests what he calls the 'slime-infected dirt' of planetary surfaces that he has petitioned the Synchronous to have him converted to an orbital unit so that he’ll never have to touch the ground again. He ends battles as rapidly as he can so that he can return to orbit before 'the stink gets on me and won’t come off.'",
                commander: '/pa/units/commanders/quad_xinthar/quad_xinthar.json'
            },
            {
                name: 'Servant Yelam',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:Yelam is a yes-man who stands out among a collective comprised entirely of yes-men. He vehemently agrees with whatever position has most recently been espoused by Metrarch, to the increasing annoyance of most other members of the Synchronous. Even Metrarch has quietly explored the possibility of having him forcibly de-synchronized.",
                commander: '/pa/units/commanders/quad_theflax/quad_theflax.json'
            },
            {
                name: 'Servant Zekktalt',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1,
                    personality_tag: 'GWAlly'
                },
                description: "!LOC:The product of an experiment that combined a relic CPU of unknown origin with an existing commander’s higher functions, Zekktalt skirts the line between genius and maniac. The Synchronous maintains a defensive firewall between itself and Zekktalt’s consciousness, but tolerates his strangeness due to his occasional strategic brilliance.",
                commander: '/pa/units/commanders/tank_banditks/tank_banditks.json'
            }
        ] // minions
    };
});
