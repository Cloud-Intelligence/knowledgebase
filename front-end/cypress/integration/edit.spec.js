describe('edit', () => {
    it('routes and matches image baseline of edit doc', () => {
        cy.visit('/');
        cy.get('.topic button').first().click();
        cy.get('#12').click();
        cy.get('.edit').click();
        cy.wait(500);
        cy.get('#main').toMatchImageSnapshot();
    });
    it('From fields are populated', () => {
        cy.contains('#topic');
        cy.contains('#tags');
        cy.contains('save');
    });
    it('has topics in dropdown', () => {
        cy.get('.dropdown-trigger').first().click();
        cy.get('.dropdown-trigger').first().toMatchImageSnapshot();
        cy.get('.dropdown-menu .dropdown-content .add_element').first().toMatchImageSnapshot();
        cy.get('.dropdown-trigger').first().click();
    });
    it('redirects after the document has been updated', () => {
        cy.get('.save.button').click();
        cy.wait(500);
        cy.get('.body').toMatchImageSnapshot();
    });
});