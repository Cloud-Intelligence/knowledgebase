describe('edit', () => {
    it('routes and matches image baseline of edit doc', () => {
        cy.visit('/');
        cy.get('.topic button').first().click();
        cy.get('#12').first().click();
        cy.get('.title-bar .icons .edit').first().click();
        cy.wait(1000); // for api response
        cy.get('#edit').toMatchImageSnapshot();
    });
    it('From fields are populated', () => {
        cy.get('#edit').toMatchImageSnapshot();
    });
    it('has topics in dropdown', () => {
        cy.get('.topic-input.trigger').first().click();
        cy.get('.dropdown-content').first().toMatchImageSnapshot();
        cy.get('.topic-input.trigger').first().click();
    });
    it('redirects after the document has been updated', () => {
        cy.get('.topic-input.trigger').type('blah');
        cy.get('.submit .button').click();
        cy.wait(1000)
        cy.get('.body').toMatchImageSnapshot();
    });
});