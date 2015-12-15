# Object-differ
Node module to update deep objects and get notified about changes

## Install
```javascript
$ npm install object-differ
```

## Example
```javascript
var differ = require('object-differ');

var obj = {
    'This': 'is',
    'a': {
        'test': 'object',
        'demonstrating': 'the'
    },
    'functionality': ['of', 'object-differ']
};

var update = {
    'a': {
        'test': 'that isn\'t'
    }
};

// The function will be called whenever a value changes
differ(obj, update, function(key, value, old, path) {
    console.log('Changed', key, 'from', old, 'to', value);
    // OUTPUT: Changed test from object to that isn't
});
```
