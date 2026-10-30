/**
 * Test Case: Product Search Flow
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to the application URL
 * 2) Locate the main product search field
 * 3) Enter a valid known product name
 * 4) Submit the search
 * 5) Verify search results page is displayed
 * 6) Verify expected product appears in results
 * 7) Verify displayed product name matches search criteria
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Product Search Flow @master @sanity @regression @web', async ({ homePage, searchResultsPage }) => {
    const { productName } = Helper.getProductDetails();

    await test.step('1) Navigate to the application URL', async () => {
        await homePage.page.goto(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
    });

    await test.step('2) Locate the main product search field', async () => {
        console.log('Search field located');
    });

    await test.step('3) Enter a valid known product name', async () => {
        await homePage.searchProduct(productName);
    });

    await test.step('4) Submit the search', async () => {
        console.log('Search submitted');
    });

    await test.step('5) Verify search results page is displayed', async () => {
        const isDisplayed = await searchResultsPage.isSearchResultsPageExists();
        expect(isDisplayed).toBeTruthy();
    });

    await test.step('6) Verify expected product appears in results', async () => {
        const firstProductName = await searchResultsPage.getFirstProductName();
        expect(firstProductName.toLowerCase()).toContain(productName.toLowerCase());
    });

    await test.step('7) Verify displayed product name matches search criteria', async () => {
        const firstProductName = await searchResultsPage.getFirstProductName();
        expect(firstProductName.toLowerCase()).toContain(productName.toLowerCase());
    });

    console.log('✅ Product Search Flow completed successfully!');
});
