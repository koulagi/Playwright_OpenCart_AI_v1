import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    private readonly page: Page;

    // Locators
    private readonly cartTable: Locator;
    private readonly productNameInCart: Locator;
    private readonly quantityInCart: Locator;
    private readonly totalPrice: Locator;
    private readonly cartHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        // Initialize locators with CSS selectors
        this.cartTable = page.locator('.table-responsive');
        this.productNameInCart = page.locator('.table-responsive td.text-left a');
        this.quantityInCart = page.locator('.table-responsive input[name*="quantity"]');
        this.totalPrice = page.locator('.table-responsive td.text-right');
        this.cartHeading = page.locator('#content h1').filter({ hasText: 'Shopping Cart' });
    }

    /**
     * Verifies the cart page exists
     * @returns Promise<boolean>
     */
    async isCartPageExists(): Promise<boolean> {
        try {
            await this.page.waitForURL(url => url.searchParams.get('route') === 'checkout/cart', { timeout: 5000 });
            await this.cartHeading.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch (error) {
            console.log(`Error checking cart page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the product name in cart
     * @returns Promise<string>
     */
    async getProductNameInCart(): Promise<string> {
        return await this.productNameInCart.innerText();
    }

    /**
     * Gets the quantity in cart
     * @returns Promise<string>
     */
    async getQuantityInCart(): Promise<string> {
        return await this.quantityInCart.inputValue();
    }
}
