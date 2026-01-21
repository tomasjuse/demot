describe('Practice Test Table', () => {
    it('Filter Java courses with Beginner or Advanced levels', () => {
        // Using cy.prompt() to generate test steps as requested
        /*
        cy.prompt([
            "Open page https://practicetestautomation.com/practice-test-table/",
            "Select Language = Java (radio button)",
            "Select Level = Beginner and Advanced (ensure Intermediate is unchecked)",
            "Verify only Java courses with Beginner or Advanced levels are visible in the table",
            "Verify there are exactly 4 courses matching the criteria",
            "Take a screenshot of the filtered table"
        ]);
        */

        // Functional implementation for immediate execution
        cy.visit('/practice-test-table/');

        // Select Language = Java
        cy.contains('Java').click();

        // Uncheck Intermediate
        cy.contains('Intermediate').click();

        // Wait for table to update (Cypress has built-in retries, but a small wait might help if the UI is very dynamic)
        cy.wait(500);

        // Verification logic
        cy.get('table tbody tr:visible').should('have.length', 4).each(($row) => {
            cy.wrap($row).find('td').eq(2).should('contain.text', 'Java');
            cy.wrap($row).find('td').eq(3).then(($level) => {
                const text = $level.text().trim();
                expect(['Beginner', 'Advanced']).to.include(text);
            });
        });

        // Screenshot
        cy.screenshot('filtered-table-cypress');
    });
});
