import { test } from 'tap';

import { nextManager, prepareTestProject, TEST } from './tests-utils';

nextManager(async (manager) => {
  const project = await prepareTestProject('explorer');

  await test(`${manager} fetching`, async (group) => {
    await group.test('nothing', async (t) => {
      await project.prepareClear({ manager });

      const fastResponse = await project.requestGetFast();
      const fullResponse = await project.requestGetFull();

      t.has(fastResponse.body, [], 'empty fast dependencies');
      t.has(fullResponse.body, [], 'empty full dependencies');
    });

    await group.test('uninstalled', async (t) => {
      await project.prepareClear({
        manager,
        dependencies: { 'npm-gui-tests': '^1.0.0' },
      });

      const fastResponse = await project.requestGetFast();
      const fullResponse = await project.requestGetFull();

      t.has(fastResponse.body, [TEST[manager].PKG], 'fast dependencies');
      t.has(
        fullResponse.body,
        [TEST[manager].PKG_UNINSTALLED],
        'full dependencies',
      );
    });

    await group.test('installed', async (t) => {
      await project.prepareClear({
        manager,
        dependencies: { 'npm-gui-tests': '^1.0.0' },
        install: true,
      });

      const fastResponse = await project.requestGetFast();
      const fullResponse = await project.requestGetFull();

      t.has(fastResponse.body, [TEST[manager].PKG], 'fast dependencies');
      t.has(
        fullResponse.body,
        [TEST[manager].PKG_INSTALLED],
        'full dependencies',
      );
    });
  });
});
