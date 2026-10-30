/**
 * Test Case: Add Product to Cart
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to the application URL
 * 2) Search for a valid known product
 * 3) Open the product details page
 * 4) Verify product details are displayed
 * 5) Set required quantity
 * 6) Click Add to Cart
 * 7) Verify product-added success message
 * 8) Open the shopping cart
 * 9) Verify selected product is present
 * 10) Verify displayed quantity matches requested quantity
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Add Product to Cart @master @sanity @regression @web', async ({ homePage, searchResultsPage, productPage, cartPage }) => {
    const { productName, productQuantity } = Helper.getProductDetails();
    const quantity = parseInt(productQuantity);

    await test.step('1) Navigate to the application URL', async () => {
        await homePage.page.goto(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
    });

    await test.step('2) Search for a valid known product', async () => {
        await homePage.searchProduct(productName);
    });

    await test.step('3) Open the product details page', async () => {
        await searchResultsPage.clickFirstProduct();
    });

    await test.step('4) Verify product details are displayed', async () => {
        const isDisplayed = await productPage.isProductPageExists();
        expect(isDisplayed).toBeTruthy();
    });

    await test.step('5) Set required quantity', async () => {
        await productPage.setQuantity(quantity);
    });

    await test.step('6) Click Add to Cart', async () => {
        await productPage.clickAddToCart();
    });

    await test.step('7) Verify product-added success message', async () => {
        const message = await productPage.getSuccessMessage();
        expect(message).toBeTruthy();
    });

    await test.step('8) Open the shopping cart', async () => {
        const baseUrl = (process.env.WEB_APP_URL || 'http://localhost/opencart/upload/').replace(/\/$/, '');
        await homePage.page.goto(`${baseUrl}/index.php?route=checkout/cart`);
    });

    await test.step('9) Verify selected product is present', async () => {
        const isCartPage = await cartPage.isCartPageExists();
        expect(isCartPage).toBeTruthy();
    });

    await test.step('10) Verify displayed quantity matches requested quantity', async () => {
        const qtyInCart = await cartPage.getQuantityInCart();
        expect(qtyInCart).toContain(String(quantity));
    });

    console.log('✅ Add Product to Cart completed successfully!');
});
