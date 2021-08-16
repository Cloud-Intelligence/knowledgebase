describe('create', () => {
    it('matches image baseline', () => {
        cy.visit('/create');
        cy.wait(500);
        cy.get('#main').toMatchImageSnapshot();
    });
    it('has form fields', () => {
        cy.visit('/create');
        cy.contains('#topic');
        cy.contains('#tags');
        cy.contains('save');
    });
    it('has topics dropdown', () => {
        cy.visit('/create');
        cy.wait(500);
        cy.get('.dropdown-trigger').first().click();
        cy.get('.dropdown-trigger').first().toMatchImageSnapshot();
        cy.get('.dropdown-menu .dropdown-content .add_element').first().toMatchImageSnapshot();
    });
    it('validates user input', () => {
        cy.visit('/create');
        cy.get('.save.button').click();
        cy.get('#main').toMatchImageSnapshot();
    });
    it('corrects validation on field input', () => {
        cy.visit('/create');
        cy.get('.save.button').click();
        
        cy.get('#title').type('Test');
        cy.get('#main').toMatchImageSnapshot();

        cy.get('#topics .dropdown-trigger').click();
        cy.get('.dropdown-menu .dropdown-content .dropdown-item').first().click();
        cy.get('#main').toMatchImageSnapshot();

        cy.get('#tags .dropdown-trigger').click();
        cy.get('.dropdown-menu .dropdown-content .dropdown-item').last().prev().prev().click();
        cy.get('#main').toMatchImageSnapshot();

        cy.get('.ql-editor').type('test');
        cy.get('#main').toMatchImageSnapshot();
    });
    it('allows adding new topics', () => {
        cy.visit('/create');
        cy.get('#topics .dropdown-trigger').click();
        cy.get('.dropdown-item.add_element input').first().type('New topic');
        cy.get('.dropdown-item.add_element button').first().click();
        cy.get('#topics .dropdown-trigger').toMatchImageSnapshot();
    });
    it('allows adding new tags', () => {
        cy.visit('/create');
        cy.get('#tags .dropdown-trigger').click();
        cy.get('.dropdown-item.add_element input').last().type('New tag 1');
        cy.get('.dropdown-item.add_element button').last().click();
        cy.get('.dropdown-item.add_element input').last().type('New tag 2');
        cy.get('.dropdown-item.add_element button').last().click();
        cy.get('#tags .dropdown-trigger').toMatchImageSnapshot();
    })
});