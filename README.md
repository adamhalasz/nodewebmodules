## About
A simple Node/LevelDB app which list a collection of web modules for Node.js

## How to add a Node web framework?

* Just fork this repository, edit the `modules.json` file adding only your github `user/module` suffix there.

See this example:
``` javascript
    "connect": "senchalabs/Connect"
```

* Take a screenshot about main site or blog module, put it in the `public/images` directory.
The image must be:
** PNG format;
** 220x160 size;
** Named with the same github repository name;

* Using the example before, if I added the `connect` module the printscreen must be named as `connect.png`.

* All modules data is consumed and updated daily from a Github API (http://developer.github.com) and stored in a Redis key-store database.

## Rules

Only web modules for node.js like MVC, Micro, Real-time and Rest frameworks will be included.

## TODO

* Create scaffold apps using each web module.

## About the author

Caio Ribeiro Pereira <http://crpwebdev.com>

Twitter: <http://twitter.com/crp_underground>

Blog: <http://udgwebdev.com> or <http://udglinux.com>

MIT Licence: <http://caio-ribeiro-pereira.mit-license.org>