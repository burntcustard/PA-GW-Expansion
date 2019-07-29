define([], function() {

    function tagSpec(specId, tag, spec) {
        var moreWork = [];

        if (typeof spec !== 'object') {
            return moreWork;
        }

        var applyTag = function(obj, key) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'string') {
                    var value = '' + obj[key];
                    //console.log("String value: " + value);
                    if (value.indexOf(' ') > 0) {
                        var substrs = value.split(' ');
                        //console.log("There were spaces in the string: " + value);
                        //console.log("JSONS:");
                        //console.log(jsons);
                        _.forEach(substrs, function(substr, i) {
                            if (substr.indexOf('/pa/') === 0) {
                                moreWork.push(substr);
                                substrs[i] += tag;
                            }
                        });
                        obj[key] = substrs.join(' ');
                        //console.log("New tagged spec:");
                        //console.log(obj[key]);

                    } else {
                      moreWork.push(obj[key]);
                      obj[key] = obj[key] + tag;
                    }
                }
                else if (_.isArray(obj[key])) {
                    obj[key] = _.map(obj[key], function(value) {
                        moreWork.push(value);
                        return value + tag;
                    });
                }
            }
        };

        // Units
        applyTag(spec, 'base_spec'); // Thing that it inherits from e.g. Dox inherit from base_bot
        if (spec.tools) {
            _.forEach(spec.tools, function(tool) {
                applyTag(tool, 'spec_id');
            });
        }
        applyTag(spec, 'replaceable_units');
        applyTag(spec, 'buildable_projectiles');
        if (spec.factory && _.isString(spec.factory.initial_build_spec)) {
            applyTag(spec.factory, 'initial_build_spec');
        }

        // Tools
        if (spec.ammo_id) {
            if (_.isString(spec.ammo_id)) {
                applyTag(spec, 'ammo_id');
            }
            else {
                _.forEach(spec.ammo_id, function (ammo) {
                    applyTag(ammo, 'id');
                });
            }
        }

        // Effects
        if (spec.events && spec.events.fired && _.isString(spec.events.fired.effect_spec)) {
            applyTag(spec.events.fired, 'effect_spec');
        }
        if (spec.fx_trail && _.isString(spec.fx_trail.filename)) {
            applyTag(spec.fx_trail, 'filename');
        }

        return moreWork;
    }

    function flattenBaseSpecs(spec, specs, tag, debug) {
        if (!spec.hasOwnProperty('base_spec')) {
            return spec;
        }

        var base = specs[spec.base_spec];

        if (!base) {
            base = specs[spec.base_spec + tag];
            if (!base) {
                return spec;
            }
        }

        spec = _.cloneDeep(spec);
        delete spec.base_spec;
        base = flattenBaseSpecs(base, specs, tag, debug);

        return _.merge({}, base, spec);
    }

    return {
        // Splits a list of specs into a new internally referenced set of specs
        // with the tag appended to the references.
        // Note: Starting the tag with '.' is preferred for readability.
        // Returns a map of the form:
        //      {'spec_id.tag': { base_spec: 'base_spec_id.tag', ... }}
        genUnitSpecs: function(units, tag) {
            if (!tag) {
                return;
            }
            var result = $.Deferred();
            var results = {};
            var work = units.slice(0);
            var step = function() {
                var item;
                var pending = 0;
                var fetch = function(item) {
                    if (!item) {
                        //console.log("Missing item when loading spec");
                        _.delay(step);
                    } else {
                        $.ajax({
                            url: 'coui:/' + item,
                            success: function(data) {
                                try {
                                    data = JSON.parse(data);
                                }
                                catch (e) {
                                }
                                var newWork = tagSpec(item, tag, data);
                                work = work.concat(newWork);
                                results[item + tag] = data;
                            },
                            error: function(request, status, error) {
                                console.log('error loading spec:', item, request, status, error);
                            },
                            complete: function() {
                                --pending;
                                if (!pending) {
                                    _.delay(step);
                                }
                            }
                        });
                    }
                };
                while (work.length) {
                    item = work.pop();
                    if (results.hasOwnProperty(item + tag))
                        continue;
                    ++pending;
                    fetch(item);
                }
                if (!pending) {
                    _.delay(finish);
                }
            };
            var finish = _.once(function() {
                results['/pa/units/unit_list.json' + tag] = {
                    units: _.map(units, function(unit) { return unit + tag; })
                };
                result.resolve(results);
            });
            step();
            return result;
        },
        genAIUnitMap: function(unitMap, tag) {
            var result = _.cloneDeep(unitMap);
            var work = [result];
            while (work.length) {
                var obj = work.pop();
                if (obj.hasOwnProperty('spec_id'))
                    obj.spec_id = obj.spec_id + tag;
                _.mapValues(obj, function(value) {
                    if (typeof value === 'object')
                        work.push(value);
                });
            }
            return result;
        },
        /*
         * Each mod is in the following format:
         * {
         *      file: '/pa/units/some_unit/some_unit.json',
         *      path: 'attribute.child.dependent.value',
         *      op: 'multiply',
         *      value: 2.0
         * }
         *
         * file - The un-tagged spec ID to modify.
         * path - A "." separated list of attributes.  Objects will traverse
         *      down the hierarchy.  Strings will be considered dependent
         *      references to other specs.
         * op - The operation to apply to the attribute.  Currently supports
         *      multiply, add, replace, merge, push, clone, tag, and eval.
         *          clone - Write to the value file with whatever is in the
         *                  attribute.
         *          eval - Execute value as raw javascript in a context with
         *                  attribute defined.  Do whatever you want. (Be
         *                  sure to return the attribute if using a path.)
         *          tag - Append specTag to the attribute.
         * value - The value to use with the operation.
         *
         * Important Note:
         * Base specs will be flattened on any specs that get mod'ed.
         */
        modSpecs: function(specs, mods, specTag, debug) {
            var load = function(specId, debug) {
                // console.log("Trying to load() specId:");
                // console.log(JSON.stringify(specId));
                taggedId = specId;

                if (taggedId.indexOf(' ') > 0) {
                    var substrs = taggedId.split(' ');
                    _.forEach(substrs, function(substr, i) {
                        if (substr.indexOf('/pa/') === 0) {
                            taggedId = substr;
                        }
                    });
                }

                if (!specs.hasOwnProperty(taggedId)) {
                    //console.log("specs doesn't have prop of:");
                    //console.log(taggedId);
                    var taggedId = specId + specTag;
                    //console.log("So we're trying with the specTag added:");
                    //console.log(taggedId);
                    if (!specs.hasOwnProperty(taggedId)) {
                        //console.log("Nope stuff nothin' :(");
                        return;
                    }
                }
                var result = specs[taggedId];
                if (result) {
                    specs[taggedId] = result = flattenBaseSpecs(result, specs, specTag, debug);
                }
                return result;
            };
            var ops = {
                multiply: function(attribute, value) {
                    return (attribute !== undefined) ? (attribute * value) : value;
                },
                add: function(attribute, value) {
                    return (attribute !== undefined) ? (attribute + value) : value;
                },
                sub: function(attribute, value) {
                    return (attribute !== undefined) ? (attribute - value) : value;
                },
                replace: function(attribute, value) {
                    return value;
                },
                merge: function (attribute, value) {
                    return _.extend({}, attribute, value);
                },
                push: function(attribute, value) {
                    if (!_.isArray(attribute)) {
                        attribute = (attribute === undefined) ? [] : [attribute];
                    }
                    if (_.isArray(value)) {
                        attribute = attribute.concat(value);
                    } else {
                        attribute.push(value);
                    }
                    return attribute;
                },
                pull: function(attribute, value) {
                    if (!_.isArray(attribute)) {
                        console.error('Failed to pull ' + value + ' from non-array attribute');
                    } else if (_.isArray(value)) {
                        _.pullAll(attribute, value);
                    } else {
                        _.pull(attribute, value);
                    }
                    return attribute;
                },
                splice: function(attribute, value) {
                    try {
                        attribute.splice(value, 1);
                    }
                    catch (error) {
                        console.error('Failed to splice nth(' + value + ') from ' + attribute);
                    }
                    return attribute;
                },
                eval: function(attribute, value) {
                    return new Function('attribute', value)(attribute);
                },
                clone: function(attribute, value) {
                    // console.log("--- Cloning a thing ---");
                    var loaded = load(attribute, true);
                    // console.log("loaded");
                    // console.log(JSON.stringify(loaded));
                    if (loaded) {
                        // console.log("loaded == true");
                        loaded = _.cloneDeep(loaded);
                        // console.log("loaded is now:");
                        // console.log(JSON.stringify(loaded));
                    }
                    specs[value + specTag] = loaded || attribute;
                    // console.log("value + specTag:");
                    // console.log(JSON.stringify(value + specTag));
                    // console.log("specs[value + specTag]:");
                    // console.log(JSON.stringify(specs[value + specTag]));
                    // console.log("attribute is being returned as:");
                    // console.log(JSON.stringify(attribute));
                    return attribute; // Don't accidentally remove thing being cloned!
                },
                // Tag value doesn't do anything??
                tag: function(attribute, value) {
                    if (attribute.indexOf(' ') > 0) {
                        console.log("Doing advanced tagging")
                        var substrs = attribute.split(' ');
                        _.forEach(substrs, function(substr, i) {
                            if (substr.indexOf('/pa/') === 0) {
                                substrs[i] = substr + specTag;
                            }
                        });
                        console.log("Returning: " + substrs.join(' '));
                        return substrs.join(' ');
                    } else {
                        return attribute + specTag;
                    }
                },
                delete: function(attribute, value, file, path) {
                    console.log("Trying to delete a thing");
                    console.log("attribute:");
                    console.log(JSON.stringify(attribute));
                    console.log("value:");
                    console.log(JSON.stringify(value));
                    console.log("file:");
                    console.log(JSON.stringify(file));
                    console.log("path:");
                    console.log(JSON.stringify(path));
                    if (value === 'all') {
                        if (specs[file + specTag]) {
                            delete specs[file + specTag];
                        } else if (specs[file]) {
                            delete specs[file];
                        } else {
                            console.error('Failed to remove ' + attribute + ' from ' + path);
                        }
                    } else {
                        console.log("specs[file]");
                        console.log(JSON.stringify(specs[file]));
                        console.log("specs[file + specTag]");
                        console.log(JSON.stringify(specs[file + specTag]));
                        if (specs[file + specTag]) {
                            console.log("specs[file][path]");
                            console.log(JSON.stringify(specs[file + specTag][path]));
                            delete specs[file + specTag][path];
                        } else if (specs[file]) {
                            console.log("specs[file + specTag][path]");
                            console.log(JSON.stringify(specs[file + specTag][path]));
                            delete specs[file][path];
                        } else {
                            console.error('Failed to remove ' + attribute + ' from ' + path);
                        }
                    }

                }
            };
            var applyMod = function(mod) {
                console.log(JSON.stringify(mod));
                var spec = load(mod.file);

                if (!spec) {
                    return api.debug.log('Warning: File not found in mod', mod);
                }
                if (!ops.hasOwnProperty(mod.op)) {
                    return console.error('Invalid operation in mod', mod);
                }

                var originalPath = (mod.path || '').split('.');
                var path = originalPath.reverse();

                var reportError = function(error, path) {
                    if (path && path.length) {
                        console.error(error, spec[level], 'spec', spec, 'mod', mod, 'path', originalPath.slice(0, -path.length).join('.'));
                    } else {
                        console.error(error, spec[level], 'spec', spec, 'mod', mod, 'path', '???');
                    }
                    return undefined;
                };

                var cookStep = function(step) {
                    if (_.isArray(spec)) {
                        if (step === 'last') {
                            step = spec.length - 1;
                        } else if (step === '+') {
                            step = spec.length;
                            spec.push({});
                        } else {
                            step = Number(step);
                        }
                    }
                    else if (path.length && !spec.hasOwnProperty(step)) {
                        spec[step] = {};
                    }
                    return step;
                };

                while (path.length > 1) {
                    var level = path.pop();
                    level = cookStep(level);

                    if (typeof spec[level] === 'string') {
                        var newSpec = load(spec[level]);
                        if (!newSpec) {
                            return reportError('Undefined mod spec encountered,');
                        }
                        spec = newSpec;
                    } else if (typeof spec[level] === 'object') {
                        spec = spec[level];
                    } else {
                        return reportError('Invalid attribute encountered,');
                    }
                }

                if (path.length && path[0]) {
                    var leaf = cookStep(path[0]);
                    spec[leaf] = ops[mod.op](spec[leaf], mod.value, mod.file, mod.path);
                } else {
                    ops[mod.op](spec, mod.value, mod.file, mod.path);
                }
            };
            console.log("Applying mods:");
            _.forEach(mods, applyMod);
        }
    }
});
