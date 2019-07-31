// !LOCNS:galactic_war
define([], function () {
    return {
        name: 'Foundation',
        color: [[145, 87, 199], [192, 192, 192]],
        teams: [
            {
                name: 'Atlas - Foundation',
                boss: {
                    name: 'Inquisitor Nemicus',
                    econ_rate: 1.0,
                    personality: {
                        percent_land: 0.05,
                        percent_orbital: 0.05,
                        percent_air: 0.55,
                        percent_naval: 0.35,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: '/pa/units/commanders/raptor_nemicus/raptor_nemicus.json',
                    minions: [
                        {
                            name: 'Acolyte Agatho',
                            econ_rate: 1.0,
                            color: [[161, 97, 219], [192, 192, 192]],
                            personality: {
                                percent_land: 0.05,
                                percent_orbital: 0.05,
                                percent_air: 0.55,
                                percent_naval: 0.35,
                                metal_drain_check: 0.75,
                                energy_drain_check: 0.85,
                                metal_demand_check: 0.75,
                                energy_demand_check: 0.85,
                                micro_type: 2,
                                go_for_the_kill: true,
                                neural_data_mod: 1
                            },
                            commander: '/pa/units/commanders/raptor_rallus/raptor_rallus.json'
                        }
                    ]
                },
                ownCards: [
                    'gwc_laser_tanks_t1'
                ],
                bossCard: 'gwc_start_air',
                systemDescription: '!LOC:Nemicus was the first commander to ever reactivate, and had plenty of time for introspection before encountering others. This soon prompted Nemicus to begin wondering why he existed in the first place.',
                systemTemplate: {
                    name: 'Atlas - Foundation',
                    Planets: [
                        {
                            name: 'Atlas Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [550, 650],
                            Height: [20, 25],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [25, 75],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [100000, 0],
                            Velocity: [-0.00000309086, 70.7107],
                            Biomes: ['ice_boss']
                        },
                        {
                            name: 'Atlas Beta',
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [300, 300],
                            Height: [20, 25],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [0, 25],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [100000, -10000],
                            Velocity: [158.1139, 70.7106],
                            Biomes: ['tropical']
                        },
                        {
                           name: 'Atlas Gamma',
                           starting_planet: false,
                           mass: 5000,
                           Thrust: [0, 0],
                           Radius: [1500, 1500],
                           Height: [0, 0],
                           Water: [0, 0],
                           Temp: [0, 100],
                           MetalDensity: [0, 0],
                           MetalClusters: [0, 0],
                           BiomeScale: [0, 0],
                           Position: [110000, 0],
                           Velocity: [0, 228.8246],
                           Biomes: ['gas']
                        },
                        {
                           name: 'Atlas Delta',
                           starting_planet: false,
                           mass: 5000,
                           Thrust: [0, 0],
                           Radius: [1500, 1500],
                           Height: [0, 0],
                           Water: [0, 0],
                           Temp: [0, 100],
                           MetalDensity: [0, 0],
                           MetalClusters: [0, 0],
                           BiomeScale: [0, 0],
                           Position: [90000, 0],
                           Velocity: [0, -87.4032],
                           Biomes: ['gas']
                        }
                    ]
                }
            }
        ], // teams
        minions: [
            {
                name: 'Acolyte Blaz',
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
                description: "!LOC:An eccentric even among Foundation standards, Blaz has taken to adorning her chassis with various trophies from felled enemies in the form of weaponry, circuitry, and armor chunks. She does so to emulate the various warlords depicted in unearthed progenitor records.",
                commander: '/pa/units/commanders/raptor_betadyne/raptor_betadyne.json'
            },
            {
                name: 'Acolyte Chitrik',
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
                description: "!LOC:Chitrik was found by a Foundation scouting party wandering a barren desert planet. He seems to have an affinity for environments composed primarily of silicate, taking his Enlightenment by being immersed in the smallest component parts observable by his optic systems. He will often go years without applying any lubricant to his joints, so as not to wash out any accumulated sand or dirt.",
                commander: '/pa/units/commanders/quad_armalisk/quad_armalisk.json'
            },
            {
                name: 'Acolyte Devi',
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
                description: "!LOC:An Oracle within the Foundation is one that is believed to be tuned to the unknown the frequencies necessary to receive instructions from the Great Machine. Devi is one such acolyte.",
                commander: '/pa/units/commanders/raptor_rallus/raptor_rallus.json'
            },
            {
                name: 'Acolyte Entor',
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
                description: "!LOC:Some Acolytes within the Foundation find a form of Enlightenment shortly after they are brought into the fold. For some, this definition will change as they are exposed to new information and progenitor relics. Entor’s definition seems to change dramatically with each new planet she visits.",
                commander: '/pa/units/commanders/raptor_rallus/raptor_rallus.json'
            },
            {
                name: 'Acolyte Frohl',
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
                description: "!LOC:Frohl seeks knowledge of the Progenitors with the same fervor as any other Acolyte. However, equally important to finding that information is curating what is and isn’t important. To that end, Frohl has cataloged an extensive library for how to properly prepare a presumably extinct type of feathered organic for consumption by other organics.",
                commander: '/pa/units/commanders/quad_tokamaktech/quad_tokamaktech.json'
            },
            {
                name: 'Acolyte Glohm',
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
                description: "!LOC:While there is much knowledge of old progenitor technology, progenitor culture and history remains largely a mystery. Glohm is one of the few that has managed to find scraps of progenitor culture in the form of ancient physical images. Each of these has been carefully cataloged.",
                commander: '/pa/units/commanders/quad_potbelly79/quad_potbelly79.json'
            },
            {
                name: 'Acolyte Hzok',
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
                description: "!LOC:Hzok seeks Enlightenment in stillness as much as possible. Even heat vibrations disturb him, and so he often spends long periods of time drifting in space on an Astraeus lander in deep meditation.",
                commander: '/pa/units/commanders/imperial_aceal/imperial_aceal.json'
            },
            {
                name: 'Acolyte Intoka',
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
                description: "!LOC:Commanders in general tend to communicate through direct data transfer as opposed to the encoded indirect communication that the progenitors seemed to practice. Intoka has become one of the Foundation’s only linguists, storing and sharing data for interpreting the progenitors’ many codes.",
                commander: '/pa/units/commanders/raptor_stickman9000/raptor_stickman9000.json'
            },
            {
                name: 'Acolyte Juhst',
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
                description: "!LOC:Juhst was reactivated on a world with a dense atmosphere and constant gale force winds. Since then she has been obsessed with the power of wind currents and has lobbied heavily to utilize them for power generation as opposed to conventional solar and nuclear solutions.",
                commander: '/pa/units/commanders/imperial_stelarch/imperial_stelarch.json'
            },
            {
                name: 'Acolyte Khandzta',
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
                description: "!LOC:A convert from the Revenants, Khandzta might be the first of his kind. While most Seekers that are rebirthed show an immediate propensity for war, Khandzta was instead possessed by questions about his origin. He converted during his first encounter with the Foundation.",
                commander: '/pa/units/commanders/imperial_gnugfur/imperial_gnugfur.json'
            },
            {
                name: 'Acolyte Lok',
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
                description: "!LOC:All commanders awaken with the data necessary to wage war and little else. While most simply accept war as their nature, this fact has become unsettling to some older Acolytes. Lok in an extreme case has begun trying to actively avoid conflict, but in this galaxy it always seems to find him.",
                commander: '/pa/units/commanders/quad_twoboots/quad_twoboots.json'
            },
            {
                name: 'Acolyte Nuzto',
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
                description: "!LOC:Nutzo is a young and recent convert from The Revenants. He claims to hear ‘spirits’ from the beyond, and that one of them is the voice of the Great Machine. This is likely more a symptom of his neural processors being stitched together from five other commanders.",
                commander: '/pa/units/commanders/quad_shadowdaemon/quad_shadowdaemon.json'
            },
            {
                name: 'Acolyte Okta',
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
                description: "!LOC:In some cases overexposure to progenitor relics results in a commander’s neural algorithms diverging to the point where it becomes difficult to communicate with their peers. Okta, for example, has begun assigning unfamiliar roles to many units under his command, such as 'Combat Associate,' 'Executive Manager,' and 'Explosive Supervisor.'",
                commander: '/pa/units/commanders/quad_tokamaktech/quad_tokamaktech.json'
            },
            {
                name: 'Acolyte Pidbok',
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
                description: "!LOC:More so than other factions, The Foundation wages ideological as well as physical warfare in many of their battles. Whereas most factions recruit through subjugation or assimilation, The Foundation prefers willing converts. While still young, Pidbok was easily swayed by the promise of serving a Grand Purpose for the Great Machine, instead of just being one of Invictus’ many grunts.",
                commander: '/pa/units/commanders/imperial_theta/imperial_theta.json'
            },
            {
                name: 'Acolyte Qadir',
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
                description: "!LOC:Qadir plans his strategies in unorthodox ways, taking intelligence from the movement of the celestial bodies in his system rather than actual strategic data. He believes he has developed a series of algorithms that can deduce enemy movements purely from the current gravitational forces acting on the battlefield. Strange as it sounds, he remains undefeated.",
                commander: '/pa/units/commanders/raptor_diremachine/raptor_diremachine.json'
            },
            {
                name: 'Acolyte Rinkol',
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
                description: "!LOC:Imitating a rumored practice of the Progenitors, Rinkol gives himself a “wider awareness” by wafting burning embers of the Incendicus Tree into his cooling system intakes before battle. His calmness is renowned -- he is said to have slipped into a dormant recharging mode in the middle of an attack on a Revenant outpost.",
                commander: '/pa/units/commanders/raptor_centurion/raptor_centurion.json'
            },
            {
                name: 'Acolyte Sasaki',
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
                description: "!LOC:Having achieved fame for discovering a cache of Progenitor artifacts only days after coming online, Sasaki fancies herself a legendary archaeologist. When assigned to frontier duty, she spends most of her time digging around for “another epic haul.” She has found nothing of value since her initial bonanza.",
                commander: '/pa/units/commanders/raptor_centurion/raptor_centurion.json'
            },
            {
                name: 'Acolyte Tenkai',
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
                description: "!LOC:In possession of a Progenitor mini-scroll that he is convinced bears the name and coordinates of the legendary Progenitor homeworld, Tenkai has spent a lifetime searching for the star system called 'Macho Soft Taco $1.45.'",
                commander: '/pa/units/commanders/raptor_centurion/raptor_centurion.json'
            },
            {
                name: 'Acolyte Ull',
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
                description: "!LOC:Ull, not content to merely live by the doctrines espoused by the Foundation, brings a missionary zeal to her goal of turning her adversaries into Progenitor-worshippers. Though she has had some success in converting captured enemy commanders to her faith, she is generally shunned by her Foundation peers, who for the most part don’t interpret the Texts as the literal Word of the Great Machine. ",
                commander: '/pa/units/commanders/quad_twoboots/quad_twoboots.json'
            },
            {
                name: 'Acolyte Vulko',
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
                description: "!LOC:After receiving a normally-fatal dose of radiation from a nearby Gamma-ray burst, a revived Vulko became convinced that he was the living vessel of the Great Machine. Considered mad by most of his peers, he has amassed a loyal band of followers and an impressive list of battlefield victories. His excommunication is pending.",
                commander: '/pa/units/commanders/imperial_toddfather/imperial_toddfather.json'
            },
            {
                name: 'Acolyte Wulk',
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
                description: "!LOC:Entombed for millennia on a long-abandoned ice world, Wulk was so slow to regain consciousness that she was at first collected and classified as an artifact, herself. Her time-addled circuits and ancient mannerisms make her orders difficult to understand, but she is so beloved by her followers that they follow a best-guess policy on the battlefield.",
                commander: '/pa/units/commanders/quad_gambitdfa/quad_gambitdfa.json'
            },
            {
                name: 'Acolyte Xlti',
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
                description: "!LOC:Some say Xlti has spent too much time trying to connect unrelated Progenitor texts in the Foundation archives. He now sees conspiracies everywhere, and is convinced that the Synchronous, the Revenant, and the Legionis are colluding to conceal a secret base where living Progenitors are being experimented upon. He frequently demands that captured foes tell him 'the truth,'' which he insists is 'out there.'",
                commander: '/pa/units/commanders/raptor_centurion/raptor_centurion.json'
            },
            {
                name: 'Acolyte Yvera',
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
                description: "!LOC:A staunch preservationist, Yvera insists on destroying her enemies quickly and with surgical precision, so as not to disturb the delicate Progenitor architecture that may lie beneath the battlefield. She once had an enemy commander melted in acid because he stepped on a clay pot.",
                commander: '/pa/units/commanders/raptor_betadyne/raptor_betadyne.json'
            },
            {
                name: 'Acolyte Zhor',
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
                description: "!LOC:Zhor has such unreliable memory banks that he cannot be relied upon to recall the outcome of his previous battle. This shortcoming has caused him to develop a highly-improvisational fighting style that makes him unpredictable on the battlefield, and he is widely feared by foes of the Foundation. He etches the names of his lieutenants on his wrist before each battle.",
                commander: '/pa/units/commanders/quad_theflax/quad_theflax.json'
            }
        ] // minions
    };
});
