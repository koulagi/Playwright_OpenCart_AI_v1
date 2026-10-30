/**
 * Test Case: Invalid Login Flow
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to My Account -> Login
 * 3) Verify login page is displayed
 * 4) Enter invalid email and password
 * 5) Submit the form
 * 6) Verify authentication fails
 * 7) Verify warning message
 */

import { test, expect } from '../../fixtures/pageFixtures';

test('Invalid Login Flow @master @sanity @regression @web', async ({ homePage, loginPage }) => {
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

    await test.step('4) Enter invalid email and password', async () => {
        await loginPage.login('invalid@email.com', 'wrongpassword');
    });

    await test.step('5) Submit the form', async () => {
        console.log('Invalid login form submitted');
    });

    await test.step('6) Verify authentication fails', async () => {
        const warningText = await loginPage.getWarningMessage();
        expect(warningText).toContain('Warning: No match for E-Mail Address and/or Password.');
    });

    await test.step('7) Verify warning message', async () => {
        const warningText = await loginPage.getWarningMessage();
        expect(warningText).toContain('Warning: No match for E-Mail Address and/or Password.');
    });

    console.log('✅ Invalid Login Flow completed successfully!');
});
