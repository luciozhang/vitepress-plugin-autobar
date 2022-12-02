import { getSideBar } from '../lib/index.js';

const currentSideBarResult = '[{"text":"Introduction","items":[{"text":"START","link":"01.Introduction/START"}]},{"text":"Utils","items":[{"text":"Date Util","link":"02.Utils/dateUtil"},{"text":"Store Util","link":"02.Utils/storeUtil"}]},{"text":"Index","items":[{"text":"Index","link":"index"}]},{"text":"Node Modules","items":[{"text":"README","link":"node_modules/README"}]}]';
const currentSideBarResultWithoutIndex = '[{"text":"Introduction","items":[{"text":"START","link":"01.Introduction/START"}]},{"text":"Utils","items":[{"text":"Date Util","link":"02.Utils/dateUtil"},{"text":"Store Util","link":"02.Utils/storeUtil"}]},{"text":"Node Modules","items":[{"text":"README","link":"node_modules/README"}]}]';
const currentSideBarResultWithoutNodeModules = '[{"text":"Introduction","items":[{"text":"START","link":"01.Introduction/START"}]},{"text":"Utils","items":[{"text":"Date Util","link":"02.Utils/dateUtil"},{"text":"Store Util","link":"02.Utils/storeUtil"}]}]';

describe('getSideBar', () => {
  it('getSideBar correct', () => {
    const sidebar = getSideBar('./__test__/docs');
    expect(JSON.stringify(sidebar)).toEqual(currentSideBarResult);
  });

  it('getSideBar/ignoreMDFiles correct', () => {
    const sidebar = getSideBar('./__test__/docs', {
      ignoreMDFiles: ['index'],
    });
    expect(JSON.stringify(sidebar)).toEqual(currentSideBarResultWithoutIndex);
  });


  it('getSideBar/ignoreDirectory correct', () => {
    const sidebar = getSideBar('./__test__/docs', {
      ignoreMDFiles: ['index'],
      ignoreDirectory: ['node_modules'],
    });
    console.log(sidebar);
    expect(JSON.stringify(sidebar)).toEqual(currentSideBarResultWithoutNodeModules);
  });
});
