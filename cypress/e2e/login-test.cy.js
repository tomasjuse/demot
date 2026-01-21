describe('Practice Test Login', () => {
    it('Successful login with student credentials', () => {
        // Using cy.prompt() to generate test steps as requested
        cy.prompt([
            "Open page https://practicetestautomation.com/practice-test-login/",
            "Type username student into Username field",
            "Type password Password123 into Password field",
            "Push Submit button",
            "Verify new page URL contains practicetestautomation.com/logged-in-successfully/",
            "Verify new page contains expected text ('Congratulations' or 'successfully logged in')"
        ]);

        /*
        // Functional implementation for immediate execution
        cy.visit('https://practicetestautomation.com/practice-test-login/');

        // Type username
        cy.get('#username').type('student');

        // Type password
        cy.get('#password').type('Password123');

        // Push Submit button
        cy.get('#submit').click();

        // Verify new page URL
        cy.url().should('include', 'practicetestautomation.com/logged-in-successfully/');

        // Verify new page contains expected text
        cy.contains('Congratulations').should('be.visible');
        cy.contains('successfully logged in').should('be.visible');
        */
    });
});
