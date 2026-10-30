import { Page, Locator, expect } from '@playwright/test';

export class LogoutPage {
    private readonly page: Page;

    // Locators
    private readonly logoutHeading: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Initialize locators with CSS selectors
        this.logoutHeading = page.locator('h1');
        this.continueButton = page.getByRole('link', { name: 'Continue' });
    }

    /**
     * Clicks the Continue button after logout
     * @returns Promise<void>
     */
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    /**
     * Verifies the logout page exists
     * @returns Promise<boolean>
     */
    async isLogoutPageExists(): Promise<boolean> {
        try {
            return await this.logoutHeading.isVisible();
        } catch (error) {
            console.log(`Error checking logout page: ${error}`);
            return false;
        }
    }
}
