import { type Locator, type Page } from "@playwright/test";

export class SandboxPage {
    readonly page: Page; // Definimos el contexto de una página
    readonly pastaCheckbox: Locator; // Definimos el localizador del checkbox de pasta
    
    constructor(page: Page) {
        this.page = page;
        this.pastaCheckbox = page.getByRole('checkbox', { name: 'Pasta 🍝' }); // Inicializamos el localizador del checkbox de pasta

    }

    // Definiremos la acción para este checkbox
    async checkPasta() {
        await this.pastaCheckbox.check();
    }

    async uncheckPasta() {
        await this.pastaCheckbox.uncheck();
    }
}