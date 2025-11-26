# 🧪 Guia Rápido de Teste - Login Integrado

## ✅ Tudo Pronto!

### Backend
- ✅ API rodando em `http://localhost/api`
- ✅ Banco de dados configurado
- ✅ Migrations executadas

### Frontend
- ✅ Dependências instaladas (axios, zustand)
- ✅ tsconfig.json corrigido
- ✅ .env.local configurado
- ✅ Página de Login integrada

---

## 🚀 Como Testar

### 1. Iniciar o Backend (se não estiver rodando)

```bash
cd ~/projetos/servlink-api
./vendor/bin/sail up -d
```

### 2. Iniciar o Frontend

```bash
cd ~/projetos/servlink-web
npm run dev
```

### 3. Acessar a Aplicação

Abra o navegador em: **http://localhost:3000/login**

---

## 👤 Credenciais de Teste

### Opção 1: Criar Novo Usuário

1. Clique em "Cadastre-se"
2. Preencha os dados
3. Escolha o tipo (Profissional ou Estabelecimento)

### Opção 2: Usar Postman para Criar Usuário

**Criar Profissional:**
```http
POST http://localhost/api/register
Content-Type: application/json

{
  "name": "Lucas Santos",
  "email": "lucas@test.com",
  "password": "senha123",
  "password_confirmation": "senha123",
  "role": "professional",
  "full_name": "Lucas Santos Bartender"
}
```

**Criar Estabelecimento:**
```http
POST http://localhost/api/register
Content-Type: application/json

{
  "name": "Mariana Silva",
  "email": "mariana@test.com",
  "password": "senha123",
  "password_confirmation": "senha123",
  "role": "establishment",
  "company_name": "Restaurante da Lagoa"
}
```

---

## ✅ O Que Testar

### Login
- [ ] Fazer login com credenciais válidas
- [ ] Verificar redirecionamento (Professional → /vagas, Establishment → /dashboard)
- [ ] Testar login com credenciais inválidas (deve mostrar erro)
- [ ] Verificar loading state (spinner)
- [ ] Verificar persistência (recarregar página)

### Navegação
- [ ] Verificar se o token está salvo no localStorage
- [ ] Verificar se o usuário está no estado do Zustand
- [ ] Testar logout (se houver botão)

---

## 🐛 Troubleshooting

### Erro de CORS
Se aparecer erro de CORS:
```bash
cd ~/projetos/servlink-api
./vendor/bin/sail artisan config:clear
./vendor/bin/sail artisan cache:clear
```

### Erro 401 (Unauthorized)
- Verifique se a API está rodando
- Verifique se o email/senha estão corretos
- Verifique o console do navegador para detalhes

### Erro de Conexão
- Verifique se o backend está rodando: `http://localhost/api/user`
- Verifique se o .env.local está correto

---

## 📊 Verificar no Console do Navegador

Abra o DevTools (F12) e vá para:

1. **Console** - Ver logs de erro
2. **Network** - Ver requisições HTTP
3. **Application → Local Storage** - Ver token salvo

---

## 🎯 Próximos Passos Após Teste

Se o login funcionar:
- [ ] Implementar página de Registro
- [ ] Criar componente ProtectedRoute
- [ ] Implementar Navbar dinâmica
- [ ] Integrar listagem de Vagas

---

**Status:** 🟢 Pronto para Teste
**Data:** 2025-11-24 19:13
