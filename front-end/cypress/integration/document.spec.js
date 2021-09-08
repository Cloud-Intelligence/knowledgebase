describe('document', () => {
    it('matches image baseline', () => {
        cy.visit('/');
        cy.get('.topic button').first().click();
        cy.get('#12').click();
        cy.get('.body').toMatchImageSnapshot();
    });
    it('has a confirmation on delete', () => {
        cy.get('.heading .icons .trash').click();
        cy.get('.body').toMatchImageSnapshot();
    });
    it('cancels delete on no button click', () => {
        cy.get('.delete-container .form button').last().click();
        cy.get('.body').toMatchImageSnapshot();
    });
    it('deletes and redirects on delete button click', () => {
        cy.get('.heading .icons .trash').click();
        cy.get('.body').toMatchImageSnapshot();
        cy.get('.delete-container .form button').first().click();
        cy.wait(500);
        cy.get('.body').toMatchImageSnapshot();
    });
});