const { getSideBar } = require('../lib/index.js');

const currentSideBarResult = '[{"text":"Introduction","items":[{"text":"START","link":"01.Introduction/START"}]},{"text":"Utils","items":[{"text":"Date Util","link":"02.Utils/dateUtil"},{"text":"Store Util","link":"02.Utils/storeUtil"}]},{"text":"Index","items":[{"text":"Index","link":"index"}]}]'

describe('getSideBar', () => {
  it('getSideBar correct', () => {
    const sidebar = getSideBar('./__test__/docs');
    expect(JSON.stringify(sidebar)).toEqual(currentSideBarResult);
  });
});
