import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
    private readonly page: Page;

    // Locators
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly privacyPolicyCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        // Initialize locators with CSS selectors
        this.firstNameInput = page.locator('#input-firstname');
        this.lastNameInput = page.locator('#input-lastname');
        this.emailInput = page.locator('#input-email');
        this.telephoneInput = page.locator('#input-telephone');
        this.passwordInput = page.locator('#input-password');
        this.confirmPasswordInput = page.locator('#input-confirm');
        this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
        this.continueButton = page.locator('input[value="Continue"]');
        this.successMessage = page.locator('h1');
    }

    /**
     * Completes the registration form
     * @param userData - User registration data
     */
    async completeRegistration(userData: {
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        password: string;
    }): Promise<void> {
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.emailInput.fill(userData.email);
        await this.telephoneInput.fill(userData.telephone);
        await this.passwordInput.fill(userData.password);
        await this.confirmPasswordInput.fill(userData.password);
        await this.privacyPolicyCheckbox.check();
        await this.continueButton.click();
    }

    /**
     * Verifies the registration page exists
     * @returns Promise<boolean>
     */
    async isRegisterPageExists(): Promise<boolean> {
        try {
            await this.firstNameInput.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking register page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the success message text
     * @returns Promise<string>
     */
    async getSuccessMessage(): Promise<string> {
        return await this.successMessage.innerText();
    }
}
