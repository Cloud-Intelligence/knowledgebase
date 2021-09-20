describe('create', () => {
    it('matches image baseline', () => {
        cy.visit('/create');
        cy.wait(500);
        cy.get('#Create').toMatchImageSnapshot();
    });
    it('has form fields', () => {
        cy.visit('/create');
        cy.wait(500);
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
        cy.wait(500);
        cy.get('.save.button').click();
        cy.get('#Create').toMatchImageSnapshot();
    });
    it('corrects validation on field input', () => {
        cy.get('#title').type('Test');

        cy.get('#topics .dropdown-trigger').click();
        cy.get('.dropdown-item.add_element input').first().type('New topic');
        cy.get('.dropdown-item.add_element button').first().click();

        cy.get('#tags .dropdown-trigger').click();
        cy.get('.dropdown-item.add_element input').last().type('New tag');
        cy.get('.dropdown-item.add_element button').last().click();

        cy.get('.ql-editor').type('test');
        cy.get('#Create').toMatchImageSnapshot();
    });
    it('allows adding new topics', () => {
        cy.visit('/create');
        cy.wait(500);
        cy.get('#topics .dropdown-trigger').click();
        cy.get('.dropdown-item.add_element input').first().type('New topic');
        cy.get('.dropdown-item.add_element button').first().click();
        cy.get('#topics .dropdown-trigger').toMatchImageSnapshot();
    });
    it('allows adding new tags', () => {
        cy.visit('/create');
        cy.wait(500);
        cy.get('#tags .dropdown-trigger').click();
        cy.get('.dropdown-item.add_element input').last().type('New tag 1');
        cy.get('.dropdown-item.add_element button').last().click();
        cy.get('.dropdown-item.add_element input').last().type('New tag 2');
        cy.get('.dropdown-item.add_element button').last().click();
        cy.get('#tags .dropdown-trigger').toMatchImageSnapshot();
    });
    it('redirects after the document has been posted', () => {
       cy.visit('/create');
       cy.wait(500);
       cy.get('#title').type('Test');
       cy.get('#topics .dropdown-trigger').click();
       cy.get('.dropdown-item.add_element input').first().type('New topic');
       cy.get('.dropdown-item.add_element button').first().click();
       cy.get('#tags .dropdown-trigger').click();
       cy.get('.dropdown-item.add_element input').last().type('New tag');
       cy.get('.dropdown-item.add_element button').last().click();
       cy.get('.ql-editor').type('test');
       cy.get('.save.button').click();
       cy.wait(500);
       cy.get('.body').toMatchImageSnapshot();
    });
});
