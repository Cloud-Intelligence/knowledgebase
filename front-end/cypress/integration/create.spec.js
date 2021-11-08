describe('create', () => {
  it('matches image baseline', () => {
    cy.visit('/create');
    cy.wait(1000);
    cy.get('.body').toMatchImageSnapshot();
  });
  it('has topics dropdown', () => {
    cy.visit('/create');
    cy.wait(500);
    cy.get('.field .input').first().click();
    cy.get('.form').first().toMatchImageSnapshot();
  });
  it('validates user input', () => {
    cy.visit('/create');
    cy.wait(500);
    cy.get('.submit .button').click();
    cy.get('.body').toMatchImageSnapshot();
  });
  it('allows adding new topics', () => {
    cy.visit('/create');
    cy.wait(500);
    cy.get('.field .input').first().type('New topic');
    cy.get('.field .input').first().toMatchImageSnapshot();
  });
  it('redirects after the document has been posted', () => {
    cy.visit('/create');
    cy.wait(500);
    cy.get('.field .input').first().type('New topic');
    cy.get('.field .input').first().type('New topic');
    cy.get('.submit .button').click();
    cy.wait(500);
    cy.get('.body').toMatchImageSnapshot();
  });
});
