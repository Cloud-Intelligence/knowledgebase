describe('create', () => {
    it('matches image baseline', () => {
        cy.visit('/create');
        cy.wait(1000);
        cy.get('#create').toMatchImageSnapshot();
    });
    it('has topics dropdown', () => {
        cy.visit('/create');
        cy.wait(500);
        cy.get('.trigger').first().click();
        cy.get('.trigger').first().toMatchImageSnapshot();
        cy.get('.dropdown-content').first().toMatchImageSnapshot();
    });
    it('validates user input', () => {
        cy.visit('/create');
        cy.wait(500);
        cy.get('.save.button').click();
        cy.get('#create').toMatchImageSnapshot();
    });
    it('corrects validation on field input', () => {
        cy.get('.notification button').click();
        cy.wait(250);
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
        cy.wait(500);
        cy.get('.topic-input.trigger').type('New topic');
        cy.get('.topic-input.trigger').toMatchImageSnapshot();
    });
    it('allows adding new tags', () => {
        cy.visit('/create');
        cy.wait(500);
        cy.get('.tag-input.trigger').click();
        cy.get('.dropdown-item input').last().type('New tag');
        cy.get('.dropdown-item button').last().click();
        cy.get('.tag-input.trigger').toMatchImageSnapshot();
    });
    it('redirects after the document has been posted', () => {
       cy.visit('/create');
       cy.wait(500);
       cy.get('#title').type('Test');
       cy.get('.topic-input.trigger').type('New topic');
       cy.get('.tag-input.trigger').click();
       cy.get('.dropdown-item input').last().type('New tag');
       cy.get('.dropdown-item button').last().click();
       cy.get('.ql-editor').type('test');
       cy.get('.save.button').click();
       cy.wait(500);
       cy.get('.body').toMatchImageSnapshot();
    });
});
