Object.defineProperty(exports, "__esModule", { value: true });
exports.getSideBar = void 0;
const tslib_1 = require("tslib");
const startCase_1 = tslib_1.__importDefault(require("lodash/startCase"));
const sortBy_1 = tslib_1.__importDefault(require("lodash/sortBy"));
const remove_1 = tslib_1.__importDefault(require("lodash/remove"));
const path_1 = require("path");
const glob_1 = tslib_1.__importDefault(require("glob"));
// handle md file name
const getName = (path) => {
    let name = path.split(path_1.sep).pop() || path;
    const argsIndex = name.lastIndexOf('--');
    if (argsIndex > -1) {
        name = name.substring(0, argsIndex);
    }
    // "001.guide" or "001-guide" or "001_guide" or "001 guide" -> "guide"
    name = name.replace(/^\d+[.\-_ ]?/, '');
    return (0, startCase_1.default)(name);
};
// handle dir name
const getDirName = (path) => {
    let name = path.split(path_1.sep).shift() || path;
    name = name.replace(/^\d+[.\-_ ]?/, '');
    return (0, startCase_1.default)(name);
};
// Load all MD files in a specified directory
const getChildren = function (parentPath, ignoreMDFiles = []) {
    const pattern = '/**/*.md';
    const files = glob_1.default.sync(parentPath + pattern).map((path) => {
        const newPath = path.slice(parentPath.length + 1, -3);
        if (ignoreMDFiles?.length && ignoreMDFiles.findIndex(item => item === newPath) !== -1) {
            return undefined;
        }
        return { path: newPath };
    });
    (0, remove_1.default)(files, file => file === undefined);
    // Return the ordered list of files, sort by 'path'
    return (0, sortBy_1.default)(files, ['path']).map(file => file?.path || '');
};
// Return sidebar config for given baseDir.
function side(baseDir, options) {
    const mdFiles = getChildren(baseDir, options?.ignoreMDFiles);
    const sidebars = [];
    // strip number of folder's name
    mdFiles.forEach((item) => {
        const dirName = getDirName(item);
        if (options?.ignoreDirectory?.length
            && options?.ignoreDirectory.findIndex(item => getDirName(item) === dirName) !== -1) {
            return;
        }
        const mdFileName = getName(item);
        const sidebarItemIndex = sidebars.findIndex(sidebar => sidebar.text === dirName);
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
const getSideBar = (rootDir = './', options) => side(rootDir, options);
exports.getSideBar = getSideBar;
