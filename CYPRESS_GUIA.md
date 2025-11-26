# 🧪 Guia de Testes E2E (Cypress)

## 📋 Pré-requisitos

Para rodar os testes E2E, você precisa de 3 terminais abertos:

1. **Backend** (Laravel Sail)
2. **Frontend** (Next.js)
3. **Cypress** (Runner)

---

## 🚀 Passo a Passo

### 1. Iniciar Backend (Terminal 1)
```bash
cd ~/projetos/servlink-api
./vendor/bin/sail up -d
```

### 2. Iniciar Frontend (Terminal 2)
```bash
cd ~/projetos/servlink-web
npm run dev
```
*Certifique-se que está rodando na porta 3000.*

### 3. Instalar Cypress (Se ainda não instalou)
```bash
cd ~/projetos/servlink-web
npm install cypress --save-dev
```

### 4. Rodar Cypress (Terminal 3)

**Modo Interativo (Abre janela):**
```bash
npx cypress open
```
1. Escolha "E2E Testing"
2. Escolha o navegador (Chrome/Electron)
3. Clique no teste que quer rodar (ex: `login.cy.ts`)

**Modo Headless (Terminal):**
```bash
npx cypress run
```

---

## 🧪 Testes Disponíveis

### Autenticação
- `cypress/e2e/auth/login.cy.ts`: Testa login de profissional e erro de credenciais.
- `cypress/e2e/auth/register.cy.ts`: Testa registro de profissional e estabelecimento.

---

## ⚠️ Solução de Problemas

### Erro: "Connection Refused"
- Verifique se o frontend está rodando em `http://localhost:3000`.
- Verifique se o backend está rodando em `http://localhost/api`.

### Erro: "Email already taken"
- Os testes de registro usam `Date.now()` para gerar emails únicos, mas se rodar muito rápido pode colidir. Tente rodar novamente.

### Erro: "Cypress verification timed out"
- Rode `npx cypress install --force` se tiver problemas na instalação.

---

**Status:** ✅ Cypress Configurado
**Testes Criados:** Login e Registro
