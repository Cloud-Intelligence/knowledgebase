describe('sidebar', () => {
    it('is toggleable', () => {
        cy.visit("http://localhost:8080");
        cy.contains('Home').should('be.visible');
        cy.get('.collapse_toggle').click();
        cy.get('#sidebar').should('have.css', 'left', '-300px');
    })
})