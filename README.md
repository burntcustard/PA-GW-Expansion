# PA-GW-Expansion
A mod for Planetary Annihilation that updates and improves Galactic War (GW).

This mod will not be in the community mods list for a while. If you'd like to test it out, you need to download or clone it into your [Planetary Annihilation Data Directory's](https://wiki.palobby.com/wiki/Planetary_Annihilation_Data_Directory) client_mods folder, then enable it in game.

If you'd like to help development, please fork this repo, work on the dev branch, and submit a pull request!

### Currently Implemented
* Galactic War card __types__: Commander Primary, Commander Uber, Commander Passive, Units and Structures (unlocks), and upgrades (buffs).
* Being able to modify PA effects (rather than just units/weapons/ammo stats).
* New buff operations (pull, splice, delete).

### Work In Progress
* New GW cards.
* GW card chance balancing. - E.g. when they become available.
* New UI to fit card types including _many_ unit card slots.

### Planned features (plz send help)
* New way to specify a map set with appropriate rules for choosing systems.
* New hardcoded map set.
* New effects - could be copied from or "inspired by" More Pew Pew and/or Legion(?).
* AI improvements and/or compatibility with [Quitch's Galactic War AI overhaul](https://forums.planetaryannihilation.com/threads/client-galactic-war-ai-overhaul-v0-4.72360/).
* New icons for GW cards.

### Feature ideas that are hard and might not happen
* Linking systems, AI, and card unlocks more closely. - _E.g. having a battle on a lava planet against an AI that uses infernos, then unlocking flamethrower tech._
* New set of factions: Different colors, icons, AI personality, and modified units using GW cards). E.g. a faction that has most of it's units converted to fire lasers.
* Being able to spawn in with extra units beside your commander at the start of games.


### Concepts

##### General
* No old vanilla GW cards, with a few excpetions like Sub Commanders.
* No more Additional Data Bank cards, they are boring. You just start with a lot of slots!
* For now, we're not trying to use Legion units. If enough is learnt creating this, then maybe in the future a full MLA versus Legion campaign can happen.
* Only one starting loadout. Being rewarded with a loadout unlock that you can't use unless you completely start over sucks, so we're having none of that.
* Only one GW size - balancing multiple different Galactic War sizes is hard.
* Aiming for ~10 hours gameplay. At 20 minutes a game, that's 30 games. Should be enough to have seen all of the cards in reward screens, and not be so long that it gets boring.

##### AI (WIP)
* The dificulty range of vanilla GW is insane. On the easiest difficulty starting games the AI only builds a few structures and doesn't attack you. In the late games on the hardest difficulty there are multiple enemy commanders with 2x eco that are nasty. The range does not need to be that big.
* Avoid eco multipliers. If there _needs_ to be modifiers to keep things challenging, then it must be clearly stated before starting games - in the system description(?)

##### Maps (WIP)
* Most systems should not _require_ orbital. - E.g. most should have your commander spawn on the same planet as the enemy, so that you can defeat them before they get off planet.
* Most systems should not _require_ naval. - I.e. >50% water maps should be uncommon, and only one or two 100% naval maps per entire Galactic War.
* Natural looking maps should be non-symmetrical, "non-organic" maps like metal planets can be symmetrical.
* Maps should include "realistic scenery" like gas giants and moons _that are moons_.
* In general, maps should contain fewer planets than vanilla galactic war - E.g. be only 1, 2, or occasionally 3 planets.
* There needs to be variety. In vanilla GW the further you get, the more planets there are, and the larger they are. There should be tiny and medium systems thrown in late game to break up the giant multi-planet systems.

##### Galactic War Expansion cards should try to:
* Effect a single or small set of units. - _It's better than unlocking a whole factory worth of units at once and not having the opportunity to try everything out the following game._
* Be as noticable in-game as possible. - _To make sure you don't forget mid-way through a game that you're using a non-standard unit. Using e.g. new effects and modified unit descriptions._
* Not create massively overpowered units. - _As this would encourage a low amount of unit diversity in games._
* Focus more on the "underpowered" or "underused" units within the game, e.g. Icarus.
* Be fun! - _E.g. slower units that cost less metal: not fun. Jumping boom bots: fun._
