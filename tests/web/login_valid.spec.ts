/**
 * Test Case: Valid Login Flow
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to My Account -> Login
 * 3) Verify login page is displayed
 * 4) Enter valid customer credentials
 * 5) Submit login form
 * 6) Verify successful authentication
 * 7) Verify user is redirected to My Account
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Valid Login Flow @master @sanity @regression @web', async ({ homePage, loginPage, myAccountPage }) => {
    const { email, password } = Helper.getLoginDetails();

    await test.step('1) Navigate to the application URL', async () => {
        await homePage.page.goto(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
    });

    await test.step('2) Navigate to My Account -> Login', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
    });

    await test.step('3) Verify login page is displayed', async () => {
        const isDisplayed = await loginPage.isLoginPageExists();
        expect(isDisplayed).toBeTruthy();
    });

    await test.step('4) Enter valid customer credentials', async () => {
        await loginPage.login(email, password);
    });

    await test.step('5) Submit login form', async () => {
        // Login submitted inside login method
        console.log('Login form submitted');
    });

    await test.step('6) Verify successful authentication', async () => {
        const isAccountPage = await myAccountPage.isMyAccountPageExists();
        expect(isAccountPage).toBeTruthy();
    });

    await test.step('7) Verify user is redirected to My Account', async () => {
        const isAccountPage = await myAccountPage.isMyAccountPageExists();
        expect(isAccountPage).toBeTruthy();
    });

    console.log('✅ Valid Login Flow completed successfully!');
});
