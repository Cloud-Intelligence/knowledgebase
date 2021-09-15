describe('edit', () => {
    it('routes and matches image baseline of edit doc', () => {
        cy.visit('/');
        cy.get('.topic button').first().click();
        cy.get('#12').click();
        cy.get('.edit').click();
        cy.wait(500);
        cy.get('#main').toMatchImageSnapshot();
    });
    it('has form fields', () => {
        cy.contains('#topic');
        cy.contains('#tags');
        cy.contains('save');
    });
    it('has topics dropdown', () => {
        cy.get('.dropdown-trigger').first().click();
        cy.get('.dropdown-trigger').first().toMatchImageSnapshot();
        cy.get('.dropdown-menu .dropdown-content .add_element').first().toMatchImageSnapshot();
        cy.get('.dropdown-trigger').first().click();
    });
    it('validates user input', () => {
        cy.get('.save.button').click();
        cy.get('#main').toMatchImageSnapshot();
    });
    it('corrects validation on field input', () => {
        cy.get('#title').type('Test');

        cy.get('#topics .dropdown-trigger').click();
        cy.get('.dropdown-item.add_element input').first().type('New topic');
        cy.get('.dropdown-item.add_element button').first().click();
        cy.get('#topics .dropdown-trigger').click();

        cy.get('#tags .dropdown-trigger').click();
        cy.get('.dropdown-item.add_element input').last().type('New tag');
        cy.get('.dropdown-item.add_element button').last().click();
        cy.get('#tags .dropdown-trigger').click();

        cy.get('.ql-editor').type('test');
        cy.get('#main').toMatchImageSnapshot();
    });
    it('redirects after the document has been updated', () => {
        cy.get('.save.button').click();
        cy.wait(500);
        cy.get('.body').toMatchImageSnapshot();
    });
});