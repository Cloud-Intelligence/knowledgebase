describe('sidebar', () => {
  it('matches image baseline', () => {
    cy.visit('http://localhost:8080');
    cy.wait(500);
    cy.get('#sidebar').toMatchImageSnapshot();
  });
  it('is toggleable', () => {
    cy.visit('http://localhost:8080');
    cy.get('.collapse_toggle').click();
    cy.get('#sidebar').toMatchImageSnapshot();
  });
  it('contains user details', () => {
    cy.visit('http://localhost:8080');
    cy.get('.user_description .title').then((title) => {
      const descTitle = title.text();
      expect(descTitle).to.equal('Cloud intelligence');
    });
    cy.get('.user_description .subtitle').then((user) => {
      const userName = user.text();
      expect(userName.length).to.be.greaterThan(0);
    });
  });
  it('styles sidebar link on click', () => {
    cy.visit('http://localhost:8080');
    cy.get('#Favorites').click();
    cy.get('#sidebar').toMatchImageSnapshot();
  });
  it('contains defualt links', () => {
    cy.visit('http://localhost:8080');
    cy.contains('Home');
    cy.contains('Search');
    cy.contains('Favorites');
  });
  it('routes to Home page on click', () => {
    cy.visit('http://localhost:8080');
    cy.get('#Home').click();
    cy.get('.body').toMatchImageSnapshot();
  });
  it('routes to Search page on click', () => {
    cy.visit('http://localhost:8080');
    cy.get('#Search').click();
    cy.get('.body').toMatchImageSnapshot();
  });
  it('routes to favorites page on click', () => {
    cy.visit('http://localhost:8080');
    cy.get('#Favorites').click();
    cy.get('.body').toMatchImageSnapshot();
  });
  it('routes to doc page on click of document', () => {
    cy.visit('http://localhost:8080');
    cy.get('.topic button').first().click();
    cy.get('#12').click();
    cy.get('.body').toMatchImageSnapshot();
  });
  it('contains dropdown collections', () => {
    cy.visit('http://localhost:8080');
    cy.get('.topic');
  });
  it('has toggleable dropdown collection', () => {
    cy.visit('http://localhost:8080');
    cy.get('.topic button').first().click();
    cy.get('.topic .children').first().toMatchImageSnapshot();
  });
  it('has children under collections', () => {
    cy.visit('http://localhost:8080');
    cy.get('.children.collapsed').children().should('exist');
  });
});
