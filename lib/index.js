(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash/startCase'), require('lodash/sortBy'), require('lodash/remove'), require('path'), require('glob')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash/startCase', 'lodash/sortBy', 'lodash/remove', 'path', 'glob'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.uodule = {}, global.startCase, global.sortBy, global.remove, global.path, global.glob));
})(this, (function (exports, startCase, sortBy, remove, path, glob) { 'use strict';

    // handle md file name
    var getName = function (path$1) {
        var name = path$1.split(path.sep).pop() || path$1;
        var argsIndex = name.lastIndexOf('--');
        if (argsIndex > -1) {
            name = name.substring(0, argsIndex);
        }
        // "001.guide" or "001-guide" or "001_guide" or "001 guide" -> "guide"
        name = name.replace(/^\d+[.\-_ ]?/, '');
        return startCase(name);
    };
    // handle dir name
    var getDirName = function (path$1) {
        var name = path$1.split(path.sep).shift() || path$1;
        name = name.replace(/^\d+[.\-_ ]?/, '');
        return startCase(name);
    };
    // Load all MD files in a specified directory
    var getChildren = function (parentPath, ignoreMDFiles) {
        if (ignoreMDFiles === void 0) { ignoreMDFiles = []; }
        var pattern = '/**/*.md';
        var files = glob.sync(parentPath + pattern).map(function (path) {
            var newPath = path.slice(parentPath.length + 1, -3);
            if ((ignoreMDFiles === null || ignoreMDFiles === void 0 ? void 0 : ignoreMDFiles.length) && ignoreMDFiles.findIndex(function (item) { return item === newPath; }) !== -1) {
                return undefined;
            }
            return { path: newPath };
        });
        remove(files, function (file) { return file === undefined; });
        // Return the ordered list of files, sort by 'path'
        return sortBy(files, ['path']).map(function (file) { return (file === null || file === void 0 ? void 0 : file.path) || ''; });
    };
    // Return sidebar config for given baseDir.
    function side(baseDir, options) {
        var mdFiles = getChildren(baseDir, options === null || options === void 0 ? void 0 : options.ignoreMDFiles);
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
        console.info('sidebar is create:', JSON.stringify(sidebars));
        return sidebars;
    }
    /**
     * Returns `sidebar` configuration for VitePress calculated using structrue of directory and files in given path.
     * @param   {String}    rootDir   - Directory to get configuration for.
     * @param   {Options}    options   - Option to create configuration.
     */
    var getSideBar = function (rootDir, options) {
        if (rootDir === void 0) { rootDir = './'; }
        return side(rootDir, options);
    };

    exports.getSideBar = getSideBar;

}));
