import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/index';

test.describe('Login Page - Negative Password Test', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    });

    test('should display error message for invalid password', async () => {
        // Step 1: Open page
        await loginPage.navigate();

        // Step 2: Type username student into Username field
        await loginPage.enterUsername('student');

        // Step 3: Type password incorrectPassword into Password field
        await loginPage.enterPassword('incorrectPassword');

        // Step 4: Push Submit button
        await loginPage.clickSubmit();

        // Step 5: Verify error message is displayed
        await loginPage.verifyErrorMessageIsDisplayed();

        // Step 6: Verify error message text is Your password is invalid!
        await loginPage.verifyErrorMessageText('Your password is invalid!');
    });
});
