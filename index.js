function differObject(curr, repl, callbackFunction, notifyObjects, strict, path) {
    if(curr != repl) {
        if(!Array.isArray(path)) path = [];
        var newPath = path.slice();

		for(var key in repl) {
            if(curr[key] != repl[key]) {

                if(typeof repl[key] === 'object') {
                    newPath.push(key);

                    if(typeof curr[key] === 'object') {
                        if(notifyObjects && typeof callbackFunction === 'function') callbackFunction(key, repl[key], curr[key], path);
                        differObject(curr[key], repl[key], callbackFunction, notifyObjects, strict, newPath);
                    } else if(typeof curr[key] !== 'object') {
                        if(notifyObjects && typeof callbackFunction === 'function') callbackFunction(key, repl[key], curr[key], path);
                        differObject((curr[key] = {}), repl[key], callbackFunction, notifyObjects, strict, newPath);
                    }
                } else {
                    if(typeof callbackFunction === 'function') callbackFunction(key, repl[key], curr[key], newPath);
                    curr[key] = repl[key];
                }
            }
		}

        if(strict) {
            for(var key in curr) {
                if(!repl.hasOwnProperty(key)) {
                    if(typeof curr[key] === 'object') {
                        newPath.push(key);

                        if(notifyObjects && typeof callbackFunction === 'function') callbackFunction(key, undefined, curr[key], path);
                        differObject(curr[key], {}, callbackFunction, notifyObjects, strict, newPath);
                    }

                    if(typeof callbackFunction === 'function') callbackFunction(key, undefined, curr[key], newPath);
                    delete curr[key];
                }
            }
        }
    }
}

module.exports = differObject;
