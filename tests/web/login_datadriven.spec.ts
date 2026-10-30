/**
 * Test Case: Login Flow (Data Driven using External File)
 *
 * Tags: @master @datadriven @regression @web
 *
 * Steps:
 * 1) Load test data from external file
 * 2) For each row, open login page
 * 3) Enter email and password
 * 4) Submit form
 * 5) Validate result based on expected value
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { DataProvider } from '../../utils/DataReader';

test.describe('Login Flow Data Driven @master @datadriven @regression @web', () => {
    const testData = DataProvider.readJson('testdata/opencart_logindata.json');

    for (const [index, row] of testData.entries()) {
        test(`Login ${index + 1} - ${row.testName} @master @datadriven`, async ({ homePage, loginPage, myAccountPage }) => {
            await test.step('1) Open the OpenCart login page', async () => {
                await homePage.page.goto(process.env.WEB_APP_URL || 'http://localhost/opencart/upload/');
                await homePage.clickMyAccount();
                await homePage.clickLogin();
            });

            await test.step('2) Enter email and password', async () => {
                const email = row.email ? row.email.trim() : '';
                const password = row.password ? row.password.trim() : '';
                await loginPage.login(email, password);
            });

            await test.step('3) Submit the login form', async () => {
                console.log('Login form submitted');
            });

            await test.step('4) Validate result based on expected value', async () => {
                if (row.expected === 'success') {
                    const isAccountPage = await myAccountPage.isMyAccountPageExists();
                    expect(isAccountPage).toBeTruthy();
                } else if (row.expected === 'failure') {
                    const warningText = await loginPage.getWarningMessage();
                    expect(warningText.trim()).toMatch(/^Warning:/);
                }
            });
        });
    }
});
