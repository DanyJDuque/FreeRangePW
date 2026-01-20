import { test, expect } from '@playwright/test';

// const USER = 'TheFreeRangeTester';
const REPO = 'REPOLOCO';
// const REPO = 'FreeRangePW';
const USER = 'DanyJDuque';


test.beforeAll(async ({ request }) => {
    const response = await request.post(`user/repos`, {
        data: {
            name: REPO
        }
    });
    expect(response.ok()).toBeTruthy();
});

test('Se puede crear un Issue en el repositorio de GitHub', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] reporte 1',
            body: 'Descripción del Bug',
        }
    });
    expect(newIssue.status()).toBe(201);
    await new Promise(r => setTimeout(r, 5000));

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
    expect(newIssue.status()).toBe(201);
    await new Promise(r => setTimeout(r, 5000));

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Feature] request 1',
        body: 'Descripción del feature',
    }));
});

test.afterAll(async ({ request }) => {
    const response = await request.delete(`/repos/${USER}/${REPO}`);
    expect(response.ok()).toBeTruthy();
});
