import { test, expect } from '@playwright/test';

const REPO = 'FreeRangePW';
// const USER = 'TheFreeRangeTester';
const USER = 'DanyJDuque';

test('Se puede crear un Issue en el repositorio de GitHub', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] reporte 1',
            body: 'Descripción del Bug',
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] reporte 1',
        body: 'Descripción del Bug',
    }));
});

test('Puedo crear un request de feature', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] request 1',
            body: 'Descripción del feature',
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
            title: '[Feature] request 1',
            body: 'Descripción del feature',
    }));
});
