/**
 * Test Case: Logout Flow
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to the application URL
 * 2) Log in using valid credentials
 * 3) Verify authentication succeeds
 * 4) Navigate to account logout option
 * 5) Click Logout
 * 6) Verify logout confirmation page
 * 7) Click Continue
 * 8) Verify redirect to homepage
 * 9) Verify authenticated options no longer available
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Logout Flow @master @sanity @regression @web', async ({ homePage, loginPage, myAccountPage, logoutPage }) => {
    const { email, password } = Helper.getLoginDetails();

    await test.step('1) Navigate to the application URL', async () => {
        await homePage.page.goto(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
    });

    await test.step('2) Log in using valid credentials', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginPage.login(email, password);
    });

    await test.step('3) Verify authentication succeeds', async () => {
        const isAccountPage = await myAccountPage.isMyAccountPageExists();
        expect(isAccountPage).toBeTruthy();
    });

    await test.step('4) Navigate to account logout option', async () => {
        await myAccountPage.clickLogout();
    });

    await test.step('5) Click Logout', async () => {
        // Logout link clicked in previous step
        console.log('Logout clicked');
    });

    await test.step('6) Verify logout confirmation page', async () => {
        const isLogoutPage = await logoutPage.isLogoutPageExists();
        expect(isLogoutPage).toBeTruthy();
    });

    await test.step('7) Click Continue', async () => {
        await logoutPage.clickContinue();
    });

    await test.step('8) Verify redirect to homepage', async () => {
        await expect(homePage.page).toHaveURL(/upload/);
    });

    await test.step('9) Verify authenticated options no longer available', async () => {
        const isAccountPage = await myAccountPage.isMyAccountPageExists();
        expect(isAccountPage).toBeFalsy();
    });

    console.log('✅ Logout Flow completed successfully!');
});
