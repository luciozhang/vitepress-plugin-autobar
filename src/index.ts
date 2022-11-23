import startCase from 'lodash/startCase';
import sortBy from 'lodash/sortBy';
import { sep } from 'path';
import glob from 'glob';

type Sidebar = SidebarGroup[] | SidebarMulti

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
}

// handle dir name
const getDirName = (path: string) => {
  let name = path.split(sep).shift() || path;
  name = name.replace(/^\d+[.\-_ ]?/, '');

  return startCase(name);
}

// Load all MD files in a specified directory
const getChildren = function (parentPath: string) {
  const pattern = '/**/*.md';
  const files = glob.sync(parentPath + pattern).map((path) => {
    const newPath = path.slice(parentPath.length + 1, -3);
    return { path: newPath };
  });

  // Return the ordered list of files, sort by 'path'
  return sortBy(files, ['path']).map(file => file.path);
};

// Return sidebar config for given baseDir.
function side(baseDir :string) {
  const mdFiles = getChildren(baseDir);

  const sidebars: Sidebar = [];
  // strip number of folder's name
  mdFiles.forEach((item) => {
    const dirName = getDirName(item);
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
 * Returns `sidebar` configuration for VitePress calculated using structrue of directory and files in given path.
 * @param   {String}    rootDir   - Directory to get configuration for.
 */
export const getSideBar = (rootDir = './') => side(rootDir);
