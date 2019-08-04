define([
    'shared/gw_common'
], function(
    GW
) {

    var GWReferee = function(game) {
        var self = this;

        self.game = ko.observable(game);

        self.files = ko.observable();
        self.localFiles = ko.observable();
        self.config = ko.observable();
    };

    var generateGameFiles = function() {
        var self = this;

        var game = self.game();
        var galaxy = game.galaxy();
        var battleGround = galaxy.stars()[game.currentStar()];
        var system = battleGround.system();
        var ai = battleGround.ai();

        console.log("battleGround var(?):");
        console.log(JSON.stringify(battleGround));

        // Game file generation cannot use previously mounted files.  That would be bad.
        var done = $.Deferred();

// community mods will hook unmountAllMemoryFiles to remount client mods
        api.file.unmountAllMemoryFiles().always(function() {
        var titans = api.content.usingTitans();

        var aiFileGen = $.Deferred();
        var playerFileGen = $.Deferred();
        var unitsLoad = $.get('spec://pa/units/unit_list.json');
        var aiMapLoad = $.get('spec://pa/ai/unit_maps/ai_unit_map.json');
        var aiX1MapLoad = titans ? $.get('spec://pa/ai/unit_maps/ai_unit_map_x1.json') : {};
        $.when(unitsLoad, aiMapLoad, aiX1MapLoad).then(function(
            unitsGet,
            aiMapGet,
            aiX1MapGet
        ) {
            console.log("Generating unit stuffs");
            var units = parse(unitsGet[0]).units;

            var aiUnitMap = parse(aiMapGet[0]);
            var aiX1UnitMap = parse(aiX1MapGet[0]);

            var enemyAIUnitMap = GW.specs.genAIUnitMap(aiUnitMap, '.ai');
            var enemyX1AIUnitMap = GW.specs.genAIUnitMap(aiX1UnitMap, '.ai');

            var aiInventory = ai.inventory ? ai.inventory() : null;

            GW.specs.genUnitSpecs(units, '.ai').then(function(aiSpecFiles) {
                console.log("Generating AI units stuff");
                var aiFilesClassic = _.assign({'/pa/ai/unit_maps/ai_unit_map.json.ai': enemyAIUnitMap}, aiSpecFiles);
                var aiFilesX1 = titans ? _.assign({'/pa/ai/unit_maps/ai_unit_map_x1.json.ai': enemyX1AIUnitMap}, aiSpecFiles) : {};
                var aiFiles = _.assign({}, aiFilesClassic, aiFilesX1);
                console.log("ai");
                console.log(JSON.stringify(ai));
                console.log("ai.inventory");
                console.log(JSON.stringify(ai.inventory));
                console.log("ai.inventory()");
                console.log(JSON.stringify(ai.inventory()));
                //console.log(JSON.stringify(aiInventory));
                //console.log("ai.mods infos if there is any:");
                //console.log(JSON.stringify(aiInventory.mods()));
                GW.specs.modSpecs(aiFiles, aiInventory.mods(), '.ai');
                aiFileGen.resolve(aiFiles);
            });

            var playerAIUnitMap = GW.specs.genAIUnitMap(aiUnitMap, '.player');
            var playerX1AIUnitMap = titans ? GW.specs.genAIUnitMap(aiX1UnitMap, '.player') : {};

            var inventory = self.game().inventory();

            GW.specs.genUnitSpecs(inventory.units(), '.player').then(function(playerSpecFiles) {
                console.log("Generating player units stuff");
                var playerFilesClassic = _.assign({'/pa/ai/unit_maps/ai_unit_map.json.player': playerAIUnitMap}, playerSpecFiles);
                var playerFilesX1 = titans ? _.assign({'/pa/ai/unit_maps/ai_unit_map_x1.json.player': playerX1AIUnitMap}, playerSpecFiles) : {};
                var playerFiles = _.assign({}, playerFilesClassic, playerFilesX1);
                console.log("Player inventory:");
                console.log(JSON.stringify(inventory));
                console.log("Player inventory.mods():");
                console.log(JSON.stringify(inventory.mods()));
                GW.specs.modSpecs(playerFiles, inventory.mods(), '.player');
                playerFileGen.resolve(playerFiles);
            });
        });
        $.when(aiFileGen, playerFileGen).then(function(
            aiFiles,
            playerFiles
        ) {
            var files = _.assign({}, aiFiles, playerFiles);
            self.files(files);
            done.resolve();
        });
        });
        return done.promise();
    };

    // The commanders changed from an object notation to a string.  In order to
    // process old save games properly, we need to patch up the commander spec
    // before sending to the server.
    var fixupCommander = function(commander) {
        if (_.isObject(commander) && _.isString(commander.UnitSpec))
           return commander.UnitSpec;
        return commander;
    };

    var generateConfig = function() {
        var self = this;

        var game = self.game();
        var galaxy = game.galaxy();
        var battleGround = galaxy.stars()[game.currentStar()];
        var system = battleGround.system();
        var ai = battleGround.ai();
        var inventory = game.inventory();
        var playerColor = inventory.getTag('global', 'playerColor');
        var playerCommander = inventory.getTag('global', 'commander');
        var armies = [];
        armies.push({
            slots: [{ name: 'Player' }],
            color: playerColor,
            econ_rate: 1,
            spec_tag: '.player',
            alliance_group: 1
        });
        _.forEach(inventory.minions(), function(minion) {
            armies.push({
                slots: [{
                    ai: true,
                    name: minion.name || 'Helper',
                    commander: fixupCommander(minion.commander || playerCommander)
                }],
                color: minion.color || [playerColor[1], playerColor[0]],
                econ_rate: minion.econ_rate || 1,
                personality: minion.personality,
                spec_tag: '.player',
                alliance_group: 1
            });
        });
        armies.push({
            slots: [{
                ai: true,
                name: ai.name,
                commander: fixupCommander(ai.commander)
            }],
            color: ai.color,
            econ_rate: ai.econ_rate,
            personality: ai.personality,
            spec_tag: '.ai',
            alliance_group: 2
        });
        _.forEach(ai.minions, function(minion) {
            armies.push({
                slots: [{
                    ai: true,
                    name: minion.name || 'Helper',
                    commander: fixupCommander(minion.commander || ai.commander)
                }],
                color: minion.color || [ai.color[1], ai.color[0]],
                econ_rate: minion.econ_rate || ai.econ_rate,
                personality: minion.personality,
                spec_tag: '.ai',
                alliance_group: 2
            });
        });
        var config = {
            files: self.files(),
            armies: armies,
            player: {
                commander: fixupCommander(playerCommander)
            },
            system: system
        };
        _.forEach(config.armies, function(army) {
            _.forEach(army.slots, function(slot) {
                if (slot.ai)
                    slot.commander += (army.alliance_group === 1) ? '.player' : '.ai';
            });
        });
        config.player.commander += '.player';
        // Store the game in the config for diagnostic purposes.
        config.gw = game.save();
        self.config(config);
    };

    GWReferee.prototype.stripSystems = function() {
        var self = this;

        // remove the systems from the galaxy
        var gw = self.config().gw;
        GW.Game.saveSystems(gw);
    };

    GWReferee.prototype.mountFiles = function() {
        var self = this;

        var deferred = $.Deferred();

        var allFiles = _.cloneDeep(self.files());
        // The player unit list needs to be the superset of units for proper UI behavior
        var playerUnits = allFiles['/pa/units/unit_list.json.player']
        var aiUnits = allFiles['/pa/units/unit_list.json.ai'];
        if (playerUnits) {
            var allUnits = _.cloneDeep(playerUnits);
            if (aiUnits && allUnits.units) {
                allUnits.units = allUnits.units.concat(aiUnits.units);
            }
            allFiles['/pa/units/unit_list.json'] = allUnits;
        }

        if (self.localFiles()) {
            _.extend(allFiles, self.localFiles());
        }

        var cookedFiles = _.mapValues(allFiles, function(value) {
            if (typeof value !== 'string')
                return JSON.stringify(value);
            else
                return value;
        });

 // community mods will hook unmountAllMemoryFiles to remount client mods
        api.file.unmountAllMemoryFiles().always(function() {
            api.file.mountMemoryFiles(cookedFiles).then( function()
            {
                deferred.resolve();
            })
        });

        return deferred.promise();
    };

    GWReferee.prototype.tagGame = function() {
        api.game.setUnitSpecTag('.player');
    };

    loadScript( 'coui://download/community-mods-gw_referee.js');

    return {
        hire: function(game) {
            var result = new $.Deferred();
            var ref = new GWReferee(game);
            return (_.bind(generateGameFiles, ref)())
                .then(_.bind(generateConfig, ref))
                .then(function() { return ref; });

            return result.promise();
        }
    };
});
