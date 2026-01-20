import { test, Browser, Page, expect } from '@playwright/test';
import { SandboxPage } from './Pages/SandboxPage';

(async () => {
    let browser: Browser;
    let page: Page;

    let textoAEscribir = 'Estoy aprendiendo Playwright 🚀';

    test.describe('Acciones en el Automation Sandbox', () => {

        test('Click en Botón ID Dinámico', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                // await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
                await page.goto(''); // Usando el baseURL configurado en playwright.config.ts
            })

            await test.step('Puedo hacer Click en el botón con ID dinámico', async () => {
                const botonIDDnamico = page.getByRole('button', { name: 'Hacé click para generar un ID' });
                await botonIDDnamico.click();

                // await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
                await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible();

                // await botonIDDnamico.dblclick(); // Doble click
                // await botonIDDnamico.click({button: 'right'}); // Click derecho
                // await botonIDDnamico.click({modifiers: ['Shift']}); // Click con Shift
                // await botonIDDnamico.hover(); // Hover
            })
        })

        test('Lleno un campo de texto en Automation @Sandbox', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo ingresar texto en el campo un Aburrido Texto', async () => {

                // Validamos que el campo de texto sea editable
                await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no es editable').toBeEditable();
                // Ingresamos el texto dinámicamente
                await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir);
                // Validamos que el texto ingresado sea correcto
                await expect(page.getByPlaceholder('Ingresá texto'), 'El texto ingresado no es correcto').toHaveValue(textoAEscribir);

                // await page.getByPlaceholder('Ingresá texto').fill('Estoy aprendiendo Playwright 🚀');
                // await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill('Estoy aprendiendo Playwright 🚀🚀🚀');
            })
        })

        test('Puedo seleccionar y deseleccionar un checkbox en el @Sandbox', async ({ page, browserName }) => {
            // test.skip(browserName === 'chromium', 'No anda en chromium todavía');
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar el checkbox para Pasta', async () => {
                // await page.getByLabel('Pasta 🍝').check();
                // await page.getByRole('checkbox', { name: 'Pasta 🍝' }).check();
                // await expect(page.getByRole('checkbox', { name: 'Pasta 🍝' }), 'El checkbox no estaba seleccionado').toBeChecked();

                // Usando la clase SandboxPage
                const sandboxPage = new SandboxPage(page);
                await sandboxPage.checkPasta();
                await expect(sandboxPage.pastaCheckbox, 'El checkbox no estaba seleccionado').toBeChecked();
            })

            await test.step('Puedo deseleccionar el checknox para Pasta', async () => {
                await page.getByRole('checkbox', { name: 'Pasta 🍝' }).uncheck();
                await expect(page.getByRole('checkbox', { name: 'Pasta 🍝' }),'El checkbox no estaba deseleccionado').not.toBeChecked();
            })
        })

        test('Puedo seleccionar Radio Buttons', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar el Radio Button para No', async () => {
                await page.getByRole('radio', { name: 'No' }).check();
                await expect(page.getByRole('radio', { name: 'No' }), 'El Radio Button No no estaba seleccionado').toBeChecked();
            })
        })

        test('Puedo seleccionar un item del Dropdown', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Selecciono un deporte del dropdown', async () => {

                const deportes = ['Fútbol', 'Tennis', 'Basketball'];

                for (let opcion of deportes) {

                    //Opción correcta usando XPath (recomendada)
                    const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);// la del profesor
                    // const element = await page.$(`//select[@id="formBasicSelect"]/option[text()="${opcion}"]`); // otro xpath válido

                    // usando el método locator() de Playwright
                    // const element = await page.locator('select#formBasicSelect >> option', { hasText: opcion });

                    if (element) {
                        console.log(`El elemento '${opcion}' existe en el dropdown.`);
                    } else {
                        // console.log(`El elemento '${opcion}' NO existe en el dropdown.`);
                        throw new Error(`El elemento '${opcion}' NO existe en el dropdown.`);
                    }
                }
            })
        })

        test('Puedo seleccionar un día del dropdown Días de la Semana', async ({ page }) => {

            test.info().annotations.push({
                type: 'user Story 131234',
                description: 'El usuario puede seleccionar un día de la semana del dropdown Días de la Semana',
            });
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Selecciono un día de la Semana del dropdown', async () => {
                await page.getByRole('button', { name: 'Día de la semana' }).click();
                await page.getByRole('link', { name: 'Miércoles' }).click();
            })
        })

        test.fixme('Puedo subir archivos a Automation Sandbox- No Implelmentado en Prod', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Agrego archivos para ser subidos', async () => {
                await page.getByLabel('Upload file').setInputFiles('pathAlArchivo.pdf'); // Asegúrate de que el archivo exista en la ruta especificada
                await page.getByLabel('Upload file').setInputFiles(['pathAlArchivo.pdf', 'Invoce1.pdf', 'Invoce2.pdf']); // Subir múltiples archivos
                await page.getByLabel('Upload file').setInputFiles([]); // Remover archivos seleccionados 
            })
        })

        test.skip('Puedo hacer un Drag and Drop de elementos en Automation Sandbox', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Realizo un Drag and Drop de elementos', async () => {
                await page.getByTestId('DragFrom').dragTo(page.getByTestId('DropTo'));
            })
        })

        test('Valida la columna Nombre de la tabla estática', async ({ page }) => {

            await test.info().attach('screenshot', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
                const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática")  + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];

                await test.info().attach('screenshot', {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                });

                expect(valoresColumnaNombres).toEqual(nombresEsperados);
            })
        })

        test('Valido que todos los valores cambian en la tabla dinámica luego de un reload', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Valido que los valores cambiaron al hacer un reload a la página web', async () => {
                // Creamos un arraglo con todos los valores de la tabla dinámica
                const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica")  + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log('Valores tabla dinámica antes de reload:', valoresTablaDinamica);

                // Hacemos una recarga para que cambien los valores
                await page.reload();

                // Creamos un asegundo arreglo con los valores de la tabla dinámica luego del reload
                const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica")  + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log('Valores tabla dinámica después de reload:', valoresPostReload);

                // Validamos que los valores antes y después del reload sean diferentes
                expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
            })
        })

        test('Ejemplo de Soft Assertions ', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Valido que los elementos de los checkboxes son los correctos', async () => {

                await expect.soft(page.getByText('Pizza 🍕'), 'No se enconro el elemneto Pizza 🍕').toBeVisible();
                await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se enconro el elemneto Hamburguesa 🍔').toBeVisible();
                await expect.soft(page.getByText('Pasta 🍝'), 'No se encontro el elemneto Pasta 🍝').toBeVisible();
                await expect.soft(page.getByText('Helado 🍧'), 'No se encontro el elemneto Helador 🍧').toBeVisible();
                await expect.soft(page.getByText('Torta 🍰'), 'No se encontro el elemento Torta 🍰').toBeVisible();
            })
        })

        test('Validando dentro de un popup', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Cuando hago clic en el botón de popup', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })

            await test.step('Puedo validar el elemento dentro del popup', async () => {

                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();
            })
        })
    })
})();