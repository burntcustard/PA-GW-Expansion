# Galactic War Card Creation
Inside a Galactic War Card are a specific set of properties, ideally following the order and format they're listed in here.


## type (new in GWE)
A card in this mod has a **type** which determines what slot in the Galactic War inventory it takes up.
```
type: 'units',
```
The available types are:  
`commanderPrimary` `commanderSecondary` `commanderPassive` `units` `upgrades`


## describe
A description of the card.
```
describe: 'Enables building of the Inferno Heavy Flamethrower Tank from basic vehicle factories.',
```


## summarize
The title of the card. Can use a `<br>` tag to force a line break.
```
summarize: 'Inferno Heavy<br>Flamethrower Tank',
```


## icon
A file path to an icon for the card.
```
icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_vehicle.png',
```


## audio
A file path to an audio clip that plays when the card is placed in the player's inventory.
```
audio: '/VO/Computer/gw/board_tech_available_vehicle',
```


## getContext
Included in vanilla GW cards, _but does not need to be in GWE cards, unless weird stuff is going on (like in `gwc_minion.js`)_, as it has a fallback value of:
```
getContext: function(galaxy) {
    return {
        totalSize: galaxy.stars().length
    };
},
```


## deal
A function which determines when the card appears in the star map.
In this example:
 * The card (flamethrower range) won't appear if it's  already in the players inventory.
 * The card won't appear unless the player already has the 'enable infernos' card.
 * The card will only appear when the player is between 3 and 5 (inclusive) moves away from the GW start star.
 * The `40` is the chance, in relation to all the other valid cards, that this one gets chosen.

```
deal: function(system, context, inventory) {
    var chance = 0;
    var dist = system.distance();
    if (!inventory.hasCard('gwc_flamethrower_range') &&
        inventory.hasCard('gwc_enable_infernos')) {
        chance = (2 < dist && dist <= 5 ? 40 : 0);
    }
    return { chance: chance };
},
```


## buff

What the card actually does!

Units can be added or removed from the player's inventory with `inventory.addUnits([])` and `inventory.removeUnits([])`. - _Note that those **must** be arrays of units!_
```
buff: function(inventory, params) {
    inventory.addUnits([
        '/pa/units/land/tank_armor/tank_armor.json'
    ]);
}
```

Operations (ops) are used to perform mods to the properties of units and structures.
```
var units = [
    '/pa/units/land/tank_armor/tank_armor.json'
];
_.forEach(units, function(unit) {
    inventory.addMods([
        {
            file: unit,
            path: 'description',
            op: 'add',
            value: ' +25% range.'
        }
    ]);
});

var weaps = [
    '/pa/units/land/tank_armor/tank_armor_tool_weapon.json'
];
_.forEach(weaps, function(weap) {
    inventory.addMods([
        {
            file: weap,
            path: 'max_range',
            op: 'multiply',
            value: 1.25
        }
    ])
});
```


## Available buff ops

The ops are in `/shared/js/gw_specs.js`, but are explained here in detail. Some of these are _new to GWE_ rather than from vanilla PA GW. __GWE also allows modding of effects.__


### `multiply`
Float used to multiply a value, can be < 1.0 to reduce it. E.g. to reduce a unit 80% move speed:
```
file: unit,
path: 'navigation.move_speed',
op: 'multiply',
value: 0.8
```


### `add` & `sub` _(modified in GWE)_
Add or subtract from a value. Allows numerical addition, as well as string concatenation (e.g. to add to a units description).
```
file: unit,
path: 'description',
op: 'add',
value: ' Flamethrower Tech: ＋⁠40% range.'
```


### `replace`
Replace the value of an individual property. - _Prefer to use `add`, `sub`, and `multiply` when possible, so that in the event of game rebalances, percentage based card descriptions remain accurate._
```
file: weap,
path: 'max_range',
op: 'replace',
value: '30'
```


### `merge` _(unused)_
Uses [lodash _.extend](https://lodash.com/docs/4.17.11#assignIn) to merge property objects.


### `push`
Add a property or an array of properties. Can be used to e.g. add order options to units:
```
file: comm,
path: 'command_caps',
op: 'push',
value: 'ORDER_FireSecondaryWeapon'
```


### `pull` _(new in GWE)_
Remove a particular value from an array. Can be used to e.g. remove order options from units:
```
file: '/pa/units/commanders/base_commander/base_commander.json',
path: 'command_caps',
op: 'pull',
value: 'ORDER_FireSecondaryWeapon'
```


### `splice` _(new in GWE)_
Remove a value at a specified index from an array. E.g. to remove part of an effect:
```
file: effect,
path: 'emitters',
op: 'splice',
value: 1
```


### `eval` (unused)
Theoretically lets you run some JS function on value.


### `clone` & `tag` _(modified in GWE)_
Advanced ops that let you re-use and/or create new specs. An example can be found in `/media/ui/main/game/galactic_war/cards/gwc_commander_regen.js`


### `delete` _(new in GWE)_
Remove a property and it's value. - _Use this instead of attempting to `'replace'` with empty strings or 0 (which can cause errors)._
```
file: '/pa/units/land/bot_bomb/bot_bomb_ammo.json',
path: 'sim_fire_effect',
op: 'delete'
```
