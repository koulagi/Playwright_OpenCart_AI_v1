import { Page, Locator, expect } from '@playwright/test';

export class MyAccountPage {
    private readonly page: Page;

    // Locators
    private readonly accountHeading: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        // Initialize locators with CSS selectors
        this.accountHeading = page.locator('#content').getByRole('heading', { name: 'My Account', exact: true });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
    }

    /**
     * Verifies the My Account page exists
     * @returns Promise<boolean>
     */
    async isMyAccountPageExists(): Promise<boolean> {
        try {
            return await this.accountHeading.isVisible();
        } catch (error) {
            console.log(`Error checking my account page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks the Logout link
     */
    async clickLogout(): Promise<void> {
        await this.logoutLink.click();
    }
}
