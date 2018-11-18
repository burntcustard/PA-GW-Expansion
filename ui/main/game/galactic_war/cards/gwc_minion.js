// !LOCNS:galactic_war
define([
    'shared/gw_common',
    'shared/gw_factions'
], function(
    GW,
    GWFactions
) {
    return {
        type: function() { return 'units'; },
        describe: function(params) {
            var minion = params.minion;
            var result = [];
            result.push('!LOC:Adds a Sub Commander that will join you in battles.');
            result.push('<br><br>');
            result.push('!LOC:Name: ');
            result.push(minion.name);
            if (minion.color) {
                result.push('<br>');
                result.push('!LOC:Favorite color: ');
                result.push('<div class="colorswatch" style="background-color: rgb(' + minion.color[0].join(',') + ')"></div>');
            }
            if (minion.econ_rate && minion.econ_rate != 1) {
                result.push('<br>');
                result.push('!LOC:Economy boost: ')
                result.push(Math.round(minion.econ_rate * 100 - 100).toString() + '%');
            }
            return result;
        },
        summarize: function(params) {
            return '!LOC:Sub Commander';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/shared/img/red-commander.png';
        },
        audio: function(parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_subcommander'
            }
        },
        getContext: function(galaxy, inventory) {
            return {
                totalSize: galaxy.stars().length,
                faction: inventory.getTag('global', 'playerFaction') || 0
            };
        },
        deal: function (system, context, inventory) {
            var minion = _.sample(GWFactions[context.faction].minions);
            var chance = 0;
            var dist = system.distance();
            return {
                params: {
                    minion: minion,
                    unique: Math.random()
                },
                chance: (dist <= 5 ? 40 : 0)
            };
        },
        buff: function(inventory, params) {
            // Note: Storing only the name allows changing the parameters, which
            // is easier for testing.  Every time the cards get re-applied, the
            // minion parameters will be updated.
            var minion = params.minion;
            inventory.minions.push(minion);
            if (minion.commander)
                inventory.addUnits([minion.commander]);
        },
        dull: function(inventory) {
        },
        keep: function (params, context) {
            //api.debug.log("Sub CDR: KEEP");
            context.chance = 50;
        },
        discard: function (params, context) {
            context.chance *= Math.log(context.totalSize) * 0.25;
            //api.debug.log("discard: chance: " + context.chance);
        },
    };
});
