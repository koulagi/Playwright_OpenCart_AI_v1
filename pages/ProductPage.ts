import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly productNameHeading: Locator;
    private readonly quantityInput: Locator;
    private readonly addToCartButton: Locator;
    private readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        // Initialize locators with CSS selectors
        this.productNameHeading = page.locator('h1');
        this.quantityInput = page.locator('#input-quantity');
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.successMessage = page.locator('.alert-success');
    }

    /**
     * Sets the product quantity
     * @param quantity - Quantity value
     */
    async setQuantity(quantity: number): Promise<void> {
        await this.quantityInput.fill(String(quantity));
    }

    /**
     * Clicks Add to Cart
     */
    async clickAddToCart(): Promise<void> {
        await Promise.all([
            this.page.waitForResponse(response =>
                response.request().method() === 'POST'
                && response.url().includes('route=checkout/cart/add')
                && response.ok()
            ),
            this.addToCartButton.click(),
        ]);
        await this.successMessage.waitFor({ state: 'visible' });
    }

    /**
     * Gets the product name
     * @returns Promise<string>
     */
    async getProductName(): Promise<string> {
        return await this.productNameHeading.innerText();
    }

    /**
     * Gets the success message text
     * @returns Promise<string>
     */
    async getSuccessMessage(): Promise<string> {
        return await this.successMessage.innerText();
    }

    /**
     * Verifies the product page exists
     * @returns Promise<boolean>
     */
    async isProductPageExists(): Promise<boolean> {
        try {
            await this.quantityInput.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking product page: ${error}`);
            return false;
        }
    }
}
