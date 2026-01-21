import { test, expect } from '@playwright/test';
import { PracticeTestTablePage } from '../pages/index';

test.describe('Practice Test Table', () => {
    test('Filter Java courses with Beginner or Advanced levels', async ({ page }) => {
        const practicePage = new PracticeTestTablePage(page);

        // 1. Open page
        await practicePage.navigate();

        // 2. Select Language = Java
        await practicePage.selectLanguage('Java');

        // 3. Select Level = Beginner and Advanced (uncheck Intermediate)
        await practicePage.deselectLevel('Intermediate');

        // Wait for table to update
        await practicePage.waitForTableUpdate();

        // 4. Verify only Java courses with Beginner or Advanced levels are visible in the table
        const visibleRows = await practicePage.getVisibleRowsData();

        // Verify all visible rows are Java courses
        for (const row of visibleRows) {
            expect(row.language).toBe('Java');
            expect(['Beginner', 'Advanced']).toContain(row.level);
        }

        // Verify we have exactly 4 courses matching the criteria
        expect(visibleRows).toHaveLength(4);

        // 5. Create a screenshot of last view
        await practicePage.takeScreenshot('test-results/filtered-table.png');
    });
});
