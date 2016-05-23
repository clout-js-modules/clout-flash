clout-flash
==================
## Install
In the directory of your clout-js application, do the following;

1) Install this package
```bash
npm install clout-flash
```

2) Add this module to ```package.json```
```JSON
{
    ...
    "modules": ["clout-flash"]
    ...
}
```

## Usage
After the installation of this module, all APIs and Controllers will have access to a ```req.flash()``` function for flash messages.

```
req.flash(); // returns and unsets data [@type: Object]
req.flash('info'); // returns and unsets data for key `info` [@type: Array]
req.flash('info', 'This is a test message'); // sets data for key `info`
```

- Setting a flash value
```JavaScript
{
    path: '/flash',
    method: 'GET',
    description: 'Set a flash message',
    fn: function (req, res, next) {
        req.flash();
        req.flash('info', 'This is a test message');
        // supports arbitrary formatting using `util.format()`
        req.flash('error', 'Error: %s', 'Your error message');
        res.redirect('/');
    }
}
```

- Getting a flash value
```JavaScript
{
    path: '/:type',
    method: 'GET',
    description: 'Get a flash message for `type`',
    fn: function (req, res, next) {
        var infoMsg = req.flash(req.params.type);
        res.ok(infoMsg);
    }
}
```


