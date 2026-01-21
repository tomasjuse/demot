import { type Page, type Locator } from '@playwright/test';
import { ConfigManager } from '../utils/config';

export class PracticeTestTablePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto(ConfigManager.getInstance().getTableUrl());
    }

    async selectLanguage(language: string) {
        await this.page.getByRole('radio', { name: language }).click();
    }

    async deselectLevel(level: string) {
        await this.page.getByRole('checkbox', { name: level }).click();
    }

    async waitForTableUpdate() {
        // Using a static wait as per original test, though a waitForFunction/waitForResponse is usually better
        // The original test used waitForTimeout(500)
        await this.page.waitForTimeout(500);
    }

    async getVisibleRowsData() {
        return await this.page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('table tbody tr'));
            return rows
                .filter(row => window.getComputedStyle(row).display !== 'none')
                .map(row => {
                    const cells = row.querySelectorAll('td');
                    return {
                        courseName: cells[1]?.textContent || '',
                        language: cells[2]?.textContent || '',
                        level: cells[3]?.textContent || ''
                    };
                });
        });
    }

    async takeScreenshot(path: string) {
        await this.page.screenshot({ path, fullPage: false });
    }
}
