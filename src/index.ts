import startCase from 'lodash/startCase';
import sortBy from 'lodash/sortBy';
import remove from 'lodash/remove';
import { sep } from 'path';
import glob from 'glob';

type Sidebar = SidebarGroup[] | SidebarMulti;

interface SidebarMulti {
  [path: string]: SidebarGroup[]
}

interface SidebarGroup {
  text: string
  items: SidebarItem[]
  collapsible?: boolean
  collapsed?: boolean
}

interface SidebarItem {
  text: string
  link: string
}

interface Options {
  ignoreDirectory?: Array<string>, // Directoty path to ignore from being captured.
  ignoreMDFiles?: Array<string>, // File path to ignore from being captured.
}

// handle md file name
const getName = (path: string) => {
  let name = path.split(sep).pop() || path;
  const argsIndex = name.lastIndexOf('--');
  if (argsIndex > -1) {
    name = name.substring(0, argsIndex);
  }

  // "001.guide" or "001-guide" or "001_guide" or "001 guide" -> "guide"
  name = name.replace(/^\d+[.\-_ ]?/, '');

  return startCase(name);
};

// handle dir name
const getDirName = (path: string) => {
  let name = path.split(sep).shift() || path;
  name = name.replace(/^\d+[.\-_ ]?/, '');

  return startCase(name);
};

// Load all MD files in a specified directory
const getChildren = function (parentPath: string, ignoreMDFiles: Array<string> = []) {
  const pattern = '/**/*.md';
  const files = glob.sync(parentPath + pattern).map((path) => {
    const newPath = path.slice(parentPath.length + 1, -3);
    if (ignoreMDFiles?.length && ignoreMDFiles.findIndex(item => item === newPath) !== -1) {
      return undefined;
    }
    return { path: newPath };
  });

  remove(files, file => file === undefined);
  // Return the ordered list of files, sort by 'path'
  return sortBy(files, ['path']).map(file => file?.path || '');
};

// Return sidebar config for given baseDir.
function side(baseDir: string, options?: Options) {
  const mdFiles = getChildren(baseDir, options?.ignoreMDFiles);

  const sidebars: Sidebar = [];
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
    } else {
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
export const getSideBar = (rootDir = './', options?: Options) => side(rootDir, options);
