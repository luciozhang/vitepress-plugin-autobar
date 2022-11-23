Generator sidebar for [Vitepress](https://github.com/vuejs/vitepress) based on file and directory structure.

[![NPM version](https://img.shields.io/npm/v/vitepress-plugin-autobar.svg)](https://www.npmjs.com/package/vitepress-plugin-autobar)[![NPM downloads](https://img.shields.io/npm/dm/vitepress-plugin-autobar.svg)](https://www.npmjs.com/package/vitepress-plugin-autobar)[![NPM License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/luciozhang/vitepress-plugin-autobar/blob/master/LICENSE)

# Install

```shell
npm install -D vitepress-plugin-autobar
```

# Usage

```javascript
import { getSideBar } from 'vitepress-plugin-autobar'

module.exports = {
  // ...
  themeConfig: {
    // ...
    sidebar: getSideBar("./docs"),
  },
};
```

# How it work

You directory may be like this.

```shell
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ 01.Introduction
│  │  └─ START.md
│  ├─ 02.Utils
│  │  └─ dateUtil.md
│  │  └─ storeUtil.md
│  └─ index.md
```

Then `getSideBar` will return sidebar data like this. It will work well for vitepress.

```json
[
    {
        "text":"Introduction",
        "items":[
            {
                "text":"START",
                "link":"01.Introduction/START"
            }
        ]
    },
    {
        "text":"Utils",
        "items":[
            {
                "text":"dateUtil",
                "link":"02.Utils/dateUtil"
            },
            {
                "text":"storeUtil",
                "link":"02.Utils/storeUtil"
            }
        ]
    },
    {
        "text":"Index",
        "items":[
            {
                "text":"Index",
                "link":"index"
            }
        ]
    }
]
```

[The configuration for the sidebar in Vitepress](https://vitepress.vuejs.org/config/theme-configs#sidebar)

# Future

If vitepress supports plugins, this component will extend the functionality of plugins.

# License
MIT

Copyright (c) 2022-present, luciozhang