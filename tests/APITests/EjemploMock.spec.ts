import { test, expect } from '@playwright/test';

test('Hace un mock de una fruta que no viene de la API real', async ({ page }) => {

    // Interceptamos la petición a la API y hacemos un mock de la respuesta
    await page.route('*/**/api/v1/fruits', async route => { // nostrae todos los datos de esa API
        const json = [{ name: 'Melocotón', id: 26 }]; // Creamos un array con la fruta que queremos mockear
        await route.fulfill({ json }); // Respondemos a la petición con el array creado
    });

    // Vamos a la página que hace la petición a la API
    await page.goto('https://demo.playwright.dev/api-mocking/');

    // Validamos que Melocotón está disponible
    await expect(page.getByText('Melocotón')).toBeVisible();
})

test('Obtengo la respuesta real y le agrego algo no tan real', async ({ page }) => {
    // Obtenemos la respuesta y le agregamos algo extra
    await page.route('*/**/api/v1/fruits', async route => {
        const response = await route.fetch(); // Hacemos la petición real
        const json = await response.json(); // Obtenemos el JSON de la respuesta real
        json.push({ name: 'Fruta de la imaginación', id: 999 }); // Agregamos una fruta inventada al array
        await route.fulfill({ response, json }); // Respondemos a la petición con el array modificado
    });

    // Vamos a la página que hace la petición a la API
    await page.goto('https://demo.playwright.dev/api-mocking/');

    // Validamos que Fruta de la imaginación está disponible
    await expect(page.getByText('Fruta de la imaginación')).toBeVisible();
})
