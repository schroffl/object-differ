function differObject(curr, repl, callbackFunction, strict, path) {
    if(curr != repl) {
		for(var key in repl) {
            if(curr[key] != repl[key]) {
                if(!Array.isArray(path)) path = [];
                var newPath = path.slice();

                if(typeof repl[key] === 'object') {
                    newPath.push(key);

                    if(typeof curr[key] === 'object') differObject(curr[key], repl[key], callbackFunction, strict, newPath);
                    else if(typeof curr[key] !== 'object') differObject((curr[key] = {}), repl[key], callbackFunction, strict, newPath);
                } else {
                    if(typeof callbackFunction === 'function') callbackFunction(key, repl[key], curr[key], newPath);
                    curr[key] = repl[key];
                }
            }
		}
	}
}

module.exports = differObject;
