describe('Registration Flow', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('should register a new professional', () => {
        cy.visit('/register');

        // Selecionar tipo Profissional
        cy.contains('Sou Profissional').click();

        // Preencher dados
        cy.get('input[name="name"]').type('Novo Profissional Cypress');
        cy.get('input[name="email"]').type(`cypress.prof.${Date.now()}@teste.com`);
        cy.get('input[name="password"]').type('senha123');
        cy.get('input[name="password_confirmation"]').type('senha123');

        // CPF (se houver campo específico, ajustar seletor)
        // cy.get('input[name="cpf"]').type('12345678900');

        // Submeter
        cy.get('button[type="submit"]').click();

        // Verificar sucesso e redirecionamento
        cy.url().should('include', '/vagas');
    });

    it('should register a new establishment', () => {
        cy.visit('/register');

        // Selecionar tipo Estabelecimento
        cy.contains('Sou Estabelecimento').click();

        // Preencher dados
        cy.get('input[name="name"]').type('Bar Cypress');
        cy.get('input[name="email"]').type(`cypress.estab.${Date.now()}@teste.com`);
        cy.get('input[name="password"]').type('senha123');
        cy.get('input[name="password_confirmation"]').type('senha123');

        // Submeter
        cy.get('button[type="submit"]').click();

        // Verificar sucesso e redirecionamento
        cy.url().should('include', '/estabelecimento');
    });
});
