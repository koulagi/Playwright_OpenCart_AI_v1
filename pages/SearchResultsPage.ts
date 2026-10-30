import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {
    private readonly page: Page;

    // Locators
    private readonly resultsHeading: Locator;
    private readonly productLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        // Initialize locators with CSS selectors
        this.resultsHeading = page.locator('h1');
        this.productLinks = page.locator('.product-thumb h4 a');
    }

    /**
     * Verifies the search results page exists
     * @returns Promise<boolean>
     */
    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            return await this.resultsHeading.isVisible();
        } catch (error) {
            console.log(`Error checking search results page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks the first product in results
     */
    async clickFirstProduct(): Promise<void> {
        await Promise.all([
            this.page.waitForURL(url => url.searchParams.get('route') === 'product/product'),
            this.productLinks.first().click()
        ]);
    }

    /**
     * Gets the first product name in results
     * @returns Promise<string>
     */
    async getFirstProductName(): Promise<string> {
        return await this.productLinks.first().innerText();
    }
}
