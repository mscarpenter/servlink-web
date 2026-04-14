# ServLink Web 💻📱

> Interface web moderna e responsiva para a plataforma ServLink.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![MUI](https://img.shields.io/badge/MUI-5.0-007FFF?style=for-the-badge&logo=mui)
![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Este é o **Frontend** do ServLink, a plataforma que conecta a economia gig da hotelaria em Florianópolis. Construído com foco em **Mobile First**, performance e usabilidade para atender tanto gerentes de estabelecimentos quanto profissionais freelancers.

---

## Funcionalidades

O frontend oferece uma experiência completa para os dois perfis de usuário:

### Para Estabelecimentos
-   **Dashboard de Gestão:** Visão geral de vagas ativas e candidatos.
-   **Publicação de Vagas:** Formulário intuitivo para criar novas oportunidades.
-   **Gestão de Candidatos:** Aprovação e rejeição de perfis com um clique.
-   **Controle de Turnos:** Monitoramento de check-in/check-out da equipe.
-   **Pagamentos:** Histórico financeiro e transparência de comissões.

### Para Profissionais
-   **Busca de Vagas:** Filtros por função, data e valor.
-   **Candidatura Simplificada:** Aplicação para vagas com poucos cliques.
-   **Minha Agenda:** Visualização clara dos próximos turnos.
-   **Execução de Trabalho:** Check-in e Check-out (Simulação de QR Code).
-   **Carteira Digital:** Acompanhamento de ganhos em tempo real.

---

## Tecnologias

-   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **UI Library:** [Material UI (MUI)](https://mui.com/)
-   **Gerenciamento de Estado:** [Zustand](https://github.com/pmndrs/zustand)
-   **HTTP Client:** [Axios](https://axios-http.com/)
-   **Ícones:** MUI Icons

---

## Como Rodar o Projeto

### Pré-requisitos
-   [Node.js](https://nodejs.org/) (v18 ou superior)
-   [NPM](https://www.npmjs.com/) ou Yarn
-   Backend do ServLink rodando (veja [servlink-api](https://github.com/mscarpenter/servlink-api))

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/mscarpenter/servlink-web.git
    cd servlink-web
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost/api
    ```

4.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Acesse a aplicação:**
    -   Abra `http://localhost:3000` no seu navegador.

---

## Estrutura do Projeto

```
src/
├── app/              # Páginas e Rotas (App Router)
├── components/       # Componentes Reutilizáveis (Cards, Forms, UI)
├── lib/              # Configurações e Utilitários (Axios, API Clients)
├── stores/           # Gerenciamento de Estado Global (Zustand)
└── theme/            # Configuração do Tema MUI (Cores, Tipografia)
```

---

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Veja o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para saber como ajudar.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
