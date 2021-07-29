describe('sidebar', () => {
  it('matches image baseline', () => {
    cy.visit('http://localhost:8080');
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
  it('contains defualt links', () => {
    cy.visit('http://localhost:8080');
    cy.contains('Home');
    cy.contains('Search');
    cy.contains('Favorites');
  });
  it('contains dropdown collections', () => {
    cy.visit('http://localhost:8080');
    cy.get('.topic');
  });
  it('has toggleable dropdown collection', () => {
    cy.visit('http://localhost:8080');
    cy.get('.topic button').first().click();
    cy.get('.topic .children').should('have.css', 'max-height');
  });
  it('has children under collections', () => {
    cy.visit('http://localhost:8080');
    cy.get('.children.collapsed').children().should('exist');
  });
});