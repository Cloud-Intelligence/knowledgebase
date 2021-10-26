describe('document', () => {
    it('matches image baseline', () => {
        cy.visit('/');
        cy.get('.topic button').first().click();
        cy.get('#12').click();
        cy.wait(1);
        cy.get('.body').toMatchImageSnapshot();
    });
    it('has a confirmation on delete', () => {
        cy.get('.title-bar .icons .trash').click();
        cy.wait(1);
        cy.get('.body').toMatchImageSnapshot();
    });
    it('cancels delete on no button click', () => {
        cy.get('.delete-container .form button').last().click();
        cy.wait(1);
        cy.get('.body').toMatchImageSnapshot();
    });
    it('deletes and redirects on delete button click', () => {
        cy.get('.title-bar .icons .trash').click();
        cy.get('.delete-container .form button').first().click();
        cy.wait(1);
        cy.get('.body').toMatchImageSnapshot();
    });
});