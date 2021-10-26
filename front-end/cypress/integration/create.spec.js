describe('create', () => {
    it('matches image baseline', () => {
        cy.visit('/create');
        cy.get('#create').toMatchImageSnapshot();
    });
    it('has topics dropdown', () => {
        cy.visit('/create');
        cy.get('.trigger').first().click();
        cy.get('.trigger').first().toMatchImageSnapshot();
        cy.get('.dropdown-content').first().toMatchImageSnapshot();
    });
    it('validates user input', () => {
        cy.visit('/create');
        cy.get('.submit .button').click();
        cy.get('#create').toMatchImageSnapshot();
    });
    it('corrects validation on field input', () => {
        cy.get('#title').type('Test');
        cy.get('.topic-input.trigger').type('New topic');
        cy.get('.tag-input.trigger').click();
        cy.get('.dropdown-item input').last().type('New tag');
        cy.get('.dropdown-item button').last().click();

        cy.get('.ql-editor').type('test');
        cy.get('#create').toMatchImageSnapshot();
    });
    it('allows adding new topics', () => {
        cy.visit('/create');
        cy.get('.topic-input.trigger').type('New topic');
        cy.get('.topic-input.trigger').toMatchImageSnapshot();
    });
    it('allows adding new tags', () => {
        cy.visit('/create');
        cy.get('.tag-input.trigger').click();
        cy.get('.dropdown-item input').last().type('New tag');
        cy.get('.dropdown-item button').last().click();
        cy.get('.tag-input.trigger').toMatchImageSnapshot();
    });
    it('redirects after the document has been posted', () => {
       cy.visit('/create');
       cy.get('#title').type('Test title');
       cy.get('.topic-input.trigger').type('New topic name');
       cy.get('.tag-input.trigger').click();
       cy.get('.dropdown-item input').last().type('New tag');
       cy.get('.dropdown-item button').last().click();
       cy.get('.ql-editor').type('test');
       cy.get('.submit .button').click();
       cy.get('.body').toMatchImageSnapshot();
    });
});
