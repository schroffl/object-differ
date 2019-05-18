'use strict';

function propagateChange(callback, key, previous, current, path) {
    if(typeof callback === 'function') callback(key, previous, current, path);
}

function differ(previous, replace, callback, objectNotify, strict, path) {
    // Has the object even changed?
    if(previous !== replace) {

        // If path is not an array => make it one
        if(!Array.isArray(path)) path = [];
        let newPath = path.slice();

        for(const key in replace) {
            newPath = path.slice();

            // Has the value changed?
            if(previous[key] !== replace[key]) {

                // The value is an object?! => Do some recursive stuff
                if(typeof replace[key] === 'object') {
                    newPath.push(key);

                    // If the previous value was a primitive type, set it to an empty object
                    if(typeof previous[key] !== 'object') previous[key] = {};

                    if(objectNotify) propagateChange(callback, key, replace[key], previous[key], path);
                    differ(previous[key], replace[key], callback, objectNotify, strict, newPath);

                // It's a primitive value => Go straight ahead
                } else {
                    propagateChange(callback, key, replace[key], previous[key], path);
                    previous[key] = replace[key];
                }
            }
        }

        if(strict) {
            for(const key in previous) {

                // The key is not in the updated object => Propagate changes & delete
                if(!replace.hasOwnProperty(key)) {
                    
                    // The value was an object?! => Do some recursive stuff
                    if(typeof previous[key] === 'object') {
                        newPath.push(key);

                        if(objectNotify) propagateChange(callback, key, undefined, previous[key], path);
                        differ(previous[key], {}, callback, objectNotify, strict, newPath);

                    // It's a primitive value => Go straight ahead
                    } else {
                        propagateChange(callback, key, undefined, previous[key], path);
                        delete previous[key];
                    }
                }
            }
        }
    }
}

module.exports = differ;
