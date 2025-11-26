# Contribuindo para o ServLink Web

Ficamos felizes com seu interesse em melhorar o frontend do ServLink! 🎨

## 🛠️ Como Contribuir

### 1. Reportando Bugs de Interface
Encontrou algo quebrado ou visualmente estranho? Abra uma **Issue** detalhando:
-   Qual navegador e dispositivo você usou.
-   Screenshots ou gravação de tela do problema.
-   Passos para reproduzir.

### 2. Sugerindo Melhorias de UX/UI
Tem uma ideia para deixar o app mais fluido? Abra uma **Issue** com a tag `design` ou `ux` e descreva sua proposta. Mockups são bem-vindos!

### 3. Enviando Pull Requests (PRs)
1.  Faça um **Fork** do repositório.
2.  Crie uma branch: `git checkout -b feature/melhoria-visual`.
3.  Implemente suas mudanças.
4.  Commit: `git commit -m 'feat: melhora responsividade do card de vagas'`.
5.  Push: `git push origin feature/melhoria-visual`.
6.  Abra um **Pull Request**.

## 💻 Padrões de Desenvolvimento

-   **Framework:** Next.js 14 (App Router).
-   **Estilização:** Use os componentes do **Material UI (MUI)** e o sistema de `sx` prop ou `styled`. Evite CSS puro ou módulos, a menos que estritamente necessário.
-   **Tipagem:** O projeto é **TypeScript Strict**. Evite `any` a todo custo. Defina interfaces claras para props e dados.
-   **Estado:** Use **Zustand** para estado global e `useState` para estado local.
-   **Componentes:** Crie componentes pequenos e reutilizáveis em `src/components`.

## 🧪 Testes

Se você adicionar uma nova funcionalidade complexa, considere adicionar testes (se o ambiente de testes estiver configurado). No mínimo, garanta que o projeto compila (`npm run build`) sem erros antes de enviar.

---

Vamos juntos criar a melhor experiência para a hotelaria de Floripa! 🏖️
