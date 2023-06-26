(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSideBar = void 0;
    var tslib_1 = require("tslib");
    var startCase_1 = tslib_1.__importDefault(require("lodash/startCase"));
    var sortBy_1 = tslib_1.__importDefault(require("lodash/sortBy"));
    var remove_1 = tslib_1.__importDefault(require("lodash/remove"));
    var path_1 = require("path");
    var glob_1 = tslib_1.__importDefault(require("glob"));
    // handle md file name
    var getName = function (path) {
        var name = path.split(path_1.sep).pop() || path;
        var argsIndex = name.lastIndexOf('--');
        if (argsIndex > -1) {
            name = name.substring(0, argsIndex);
        }
        // "001.guide" or "001-guide" or "001_guide" or "001 guide" -> "guide"
        name = name.replace(/^\d+[.\-_ ]?/, '');
        return (0, startCase_1.default)(name);
    };
    // handle dir name
    var getDirName = function (path) {
        var name = path.split(path_1.sep).shift() || path;
        name = name.replace(/^\d+[.\-_ ]?/, '');
        return (0, startCase_1.default)(name);
    };
    // Load all MD files in a specified directory
    var getChildren = function (parentPath, ignoreMDFiles) {
        if (ignoreMDFiles === void 0) { ignoreMDFiles = []; }
        var pattern = '/**/*.md';
        var files = glob_1.default.sync(parentPath + pattern).map(function (path) {
            var newPath = path.slice(parentPath.length + 1, -3);
            if ((ignoreMDFiles === null || ignoreMDFiles === void 0 ? void 0 : ignoreMDFiles.length) && ignoreMDFiles.findIndex(function (item) { return item === newPath; }) !== -1) {
                return undefined;
            }
            return { path: newPath };
        });
        (0, remove_1.default)(files, function (file) { return file === undefined; });
        // Return the ordered list of files, sort by 'path'
        return (0, sortBy_1.default)(files, ['path']).map(function (file) { return (file === null || file === void 0 ? void 0 : file.path) || ''; });
    };
    // Return sidebar config for given baseDir.
    function side(baseDir, options) {
        var mdFiles = getChildren(baseDir, options === null || options === void 0 ? void 0 : options.ignoreMDFiles);
        var sidebars = [];
        // strip number of folder's name
        mdFiles.forEach(function (item) {
            var _a;
            var dirName = getDirName(item);
            if (((_a = options === null || options === void 0 ? void 0 : options.ignoreDirectory) === null || _a === void 0 ? void 0 : _a.length)
                && (options === null || options === void 0 ? void 0 : options.ignoreDirectory.findIndex(function (item) { return getDirName(item) === dirName; })) !== -1) {
                return;
            }
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
     * Returns `sidebar` configuration for VitePress calculated using structure of directory and files in given path.
     * @param   {String}    rootDir   - Directory to get configuration for.
     * @param   {Options}    options   - Option to create configuration.
     */
    var getSideBar = function (rootDir, options) {
        if (rootDir === void 0) { rootDir = './'; }
        return side(rootDir, options);
    };
    exports.getSideBar = getSideBar;

}));
