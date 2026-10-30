/**
 * Test Case: User Registration Flow
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to My Account -> Register
 * 3) Verify registration page is displayed
 * 4) Generate unique customer email
 * 5) Enter valid values for registration form
 * 6) Accept Privacy Policy
 * 7) Submit the form
 * 8) Verify registration succeeds
 * 9) Verify account-created confirmation
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

const APP_URL = process.env.WEB_APP_URL || 'http://localhost/opencart/upload/';

test('User Registration Flow @master @sanity @regression @web', async ({ homePage, registerPage }) => {
    test.setTimeout(50_000);

    const email = RandomDataUtil.getEmail();
    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const telephone = RandomDataUtil.getPhoneNumber();
    const password = RandomDataUtil.getPassword();

    await test.step('1) Navigate to the application URL', async () => {
        await homePage.page.goto(APP_URL);
    });

    await test.step('2) Navigate to My Account -> Register', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
    });

    await test.step('3) Verify registration page is displayed', async () => {
        const isDisplayed = await registerPage.isRegisterPageExists();
        expect(isDisplayed).toBeTruthy();
    });

    await test.step('4) Generate unique customer email', async () => {
        console.log(`Generated email: ${email}`);
    });

    await test.step('5) Enter valid values for registration form', async () => {
        await registerPage.completeRegistration({
            firstName,
            lastName,
            email,
            telephone,
            password,
        });
    });

    await test.step('6) Accept Privacy Policy', async () => {
        // Privacy policy checkbox is checked inside completeRegistration
        console.log('Privacy Policy accepted');
    });

    await test.step('7) Submit the registration form', async () => {
        // Form submitted inside completeRegistration
        console.log('Registration form submitted');
    });

    await test.step('8) Verify registration succeeds', async () => {
        const message = await registerPage.getSuccessMessage();
        expect(message).toContain('Your Account Has Been Created!');
    });

    await test.step('9) Verify account-created confirmation', async () => {
        const message = await registerPage.getSuccessMessage();
        console.log(`Confirmation message: ${message}`);
    });

    console.log('✅ User Registration Flow completed successfully!');
});
