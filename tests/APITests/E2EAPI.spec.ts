import { test, expect, APIRequestContext } from '@playwright/test';

const REPO = 'FreeRangePW';
const USER = 'DanyJDuque';

// El contexto de la solicitud es reulitizado por todas las pruebas en el archivo
let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // Todos los request que enviamos van a este endpoint
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            // Configuramos este Header como nos dicen en la documentación de GitHub
            Accept: 'application/vnd.github.v3+json',
            // Autenticación con token
            Authorization: `token ${process.env.API_TOKEN}`,
        },
    });
});

test.afterAll(async ({ }) => {
    // Nos deshacemos de todas las respuestas al finalizar las pruebas
    await apiContext.dispose();
});

test('El último issue creado es el primero en la lista', async ({ page }) => {
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Que el framework me planche la ropa]',
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    
    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    // const firstIssue = page.locator(`a[data-hovercard-type='issue']`).first();
    const firstIssue = page.locator(`a[data-testid='issue-pr-title-link']`).first();
    await expect(firstIssue).toHaveText('[Feature] Que el framework me planche la ropa]');
});