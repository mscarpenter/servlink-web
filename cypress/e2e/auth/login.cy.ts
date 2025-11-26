describe('Authentication Flow', () => {
    beforeEach(() => {
        // Limpar cookies e storage antes de cada teste
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('should successfully login as a professional', () => {
        // Visitar página de login
        cy.visit('/login');

        // Verificar se está na página correta
        cy.contains('h1', 'Login').should('be.visible');

        // Preencher formulário
        cy.get('input[type="email"]').type('profissional@teste.com');
        cy.get('input[type="password"]').type('senha123');

        // Submeter
        cy.get('button[type="submit"]').click();

        // Verificar redirecionamento (assumindo que vai para /vagas ou /dashboard)
        // Nota: Isso vai falhar se o backend não estiver rodando ou o usuário não existir
        // Mas serve como template do teste
        cy.url().should('include', '/vagas');
    });

    it('should show error with invalid credentials', () => {
        cy.visit('/login');

        cy.get('input[type="email"]').type('errado@teste.com');
        cy.get('input[type="password"]').type('senhaerrada');
        cy.get('button[type="submit"]').click();

        // Verificar mensagem de erro
        cy.contains('Credenciais inválidas').should('be.visible');
    });

    it('should navigate to register page', () => {
        cy.visit('/login');
        cy.contains('Não tem uma conta?').click();
        cy.url().should('include', '/register');
    });
});
