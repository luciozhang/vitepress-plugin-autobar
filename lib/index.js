(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash-es'), require('path'), require('glob')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash-es', 'path', 'glob'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.uodule = {}, global.lodashEs, global.path, global.glob));
})(this, (function (exports, lodashEs, path, glob) { 'use strict';

    // handle md file name
    var getName = function (path$1) {
        var name = path$1.split(path.sep).pop() || path$1;
        var argsIndex = name.lastIndexOf('--');
        if (argsIndex > -1) {
            name = name.substring(0, argsIndex);
        }
        // "001.guide" or "001-guide" or "001_guide" or "001 guide" -> "guide"
        name = name.replace(/^\d+[.\-_ ]?/, '');
        return lodashEs.startCase(name);
    };
    // handle dir name
    var getDirName = function (path$1) {
        var name = path$1.split(path.sep).shift() || path$1;
        name = name.replace(/^\d+[.\-_ ]?/, '');
        return lodashEs.startCase(name);
    };
    // Load all MD files in a specified directory
    var getChildren = function (parentPath) {
        var pattern = '/**/*.md';
        var files = glob.sync(parentPath + pattern).map(function (path) {
            var newPath = path.slice(parentPath.length + 1, -3);
            return { path: newPath };
        });
        // Return the ordered list of files, sort by 'path'
        return lodashEs.sortBy(files, ['path']).map(function (file) { return file.path; });
    };
    // Return sidebar config for given baseDir.
    function side(baseDir) {
        var mdFiles = getChildren(baseDir);
        console.log(mdFiles);
        var sidebars = [];
        // strip number of folder's name
        mdFiles.forEach(function (item) {
            var dirName = getDirName(item);
            var mdFileName = getName(item);
            var sidebarItemIndex = sidebars.findIndex(function (sidebar) { return sidebar.text === dirName; });
            if (sidebarItemIndex !== -1) {
                sidebars[sidebarItemIndex].items.push({
                    text: mdFileName,
                    link: item,
                });
            }
            else {
                sidebars.push({
                    text: dirName,
                    items: [{
                            text: mdFileName,
                            link: item,
                        }],
                });
            }
        });
        console.log(JSON.stringify(sidebars));
        return sidebars;
    }
    /**
     * Returns `sidebar` configuration for VitePress calculated using structrue of directory and files in given path.
     * @param   {String}    rootDir   - Directory to get configuration for.
     */
    var getSideBar = function (rootDir) {
        if (rootDir === void 0) { rootDir = './'; }
        return side(rootDir);
    };

    exports.getSideBar = getSideBar;

}));
