import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    // Locators
    private readonly myAccountLink: Locator;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Initialize locators with CSS selectors
        this.myAccountLink = page.locator('#top-links a.dropdown-toggle[title="My Account"]');
        this.searchInput = page.locator('input[name="search"]');
        this.searchButton = page.locator('#search button');
    }

    /**
     * Clicks the My Account dropdown
     */
    async clickMyAccount(): Promise<void> {
        await this.myAccountLink.click();
    }

    /**
     * Clicks the Login option under My Account
     */
    async clickLogin(): Promise<void> {
        await this.page.locator('#top-links a[href*="route=account/login"]').click();
    }

    /**
     * Clicks the Register option under My Account
     */
    async clickRegister(): Promise<void> {
        await this.page.locator('#top-links a[href*="route=account/register"]').click();
    }

    /**
     * Searches for a product
     * @param productName - Product name to search
     */
    async searchProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }
}
