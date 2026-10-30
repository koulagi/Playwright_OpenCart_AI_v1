import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly warningMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        // Initialize locators with CSS selectors
        this.emailInput = page.locator('#input-email');
        this.passwordInput = page.locator('#input-password');
        this.loginButton = page.locator('input[value="Login"]');
        this.warningMessage = page.locator('.alert-danger');
    }

    /**
     * Performs login
     * @param email - User email
     * @param password - User password
     */
    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Verifies the login page is displayed
     * @returns Promise<boolean>
     */
    async isLoginPageExists(): Promise<boolean> {
        try {
            return await this.emailInput.isVisible();
        } catch (error) {
            console.log(`Error checking login page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the warning message text
     * @returns Promise<string>
     */
    async getWarningMessage(): Promise<string> {
        return await this.warningMessage.innerText();
    }
}
