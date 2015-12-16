function differObject(curr, repl, callbackFunction, notifyObjects, path) {
    if(curr != repl) {
		for(var key in repl) {
            if(curr[key] != repl[key]) {
                if(!Array.isArray(path)) path = [];
                var newPath = path.slice();

                if(typeof repl[key] === 'object') {
                    newPath.push(key);

                    if(typeof curr[key] === 'object') {
                        if(notifyObjects && typeof callbackFunction === 'function') callbackFunction(key, repl[key], curr[key], path);
                        differObject(curr[key], repl[key], callbackFunction, notifyObjects, newPath);
                    } else if(typeof curr[key] !== 'object') {
                        if(notifyObjects && typeof callbackFunction === 'function') callbackFunction(key, repl[key], curr[key], path);
                        differObject((curr[key] = {}), repl[key], callbackFunction, notifyObjects, newPath);
                    }
                } else {
                    if(typeof callbackFunction === 'function') callbackFunction(key, repl[key], curr[key], newPath);
                    curr[key] = repl[key];
                }
            }
		}
	}
}

module.exports = differObject;
