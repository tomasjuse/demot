import { type Page, type Locator, expect } from '@playwright/test';
import { ConfigManager } from '../utils/config';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.errorMessage = page.locator('#error');
    }

    async navigate(): Promise<void> {
        await this.page.goto(ConfigManager.getInstance().getLoginUrl());
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickSubmit(): Promise<void> {
        await this.submitButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSubmit();
    }

    async verifyErrorMessageIsDisplayed(): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
    }

    async verifyErrorMessageText(expectedText: string): Promise<void> {
        await expect(this.errorMessage).toHaveText(expectedText);
    }
}
