# 🗺️ Mapeamento de Jornadas do Usuário (User Journeys)

Este documento define a estrutura e o fluxo de navegação para os dois perfis de usuário do ServLink: **Profissional** e **Estabelecimento**.

---

## 👨‍🍳 1. Perfil Profissional (Professional)

**Foco:** Encontrar trabalho, cumprir turnos e receber pagamentos.

### 📍 Fluxo de Navegação
1. **Login/Registro**
   - Redirecionamento imediato para: `/vagas`

2. **Área Principal (Home): `/vagas`**
   - Listagem de vagas disponíveis.
   - Filtros (Categoria, Localização, Data).
   - Ação principal: "Candidatar-se".

3. **Meus Turnos: `/turnos`**
   - Abas: Agendados, Em Andamento, Concluídos.
   - Ações: Check-in (QR Code), Check-out.
   - Visualização de ganhos previstos.

4. **Minhas Candidaturas: `/candidaturas` (Novo)**
   - Lista de vagas para as quais se candidatou.
   - Status: Pendente, Aprovado, Rejeitado.

5. **Financeiro: `/pagamentos`**
   - Histórico de pagamentos recebidos.
   - Extrato detalhado.

6. **Perfil: `/perfil`**
   - Dados pessoais.
   - Currículo/Experiência.
   - Avaliações recebidas.

---

## 🏢 2. Perfil Estabelecimento (Establishment)

**Foco:** Publicar vagas, selecionar candidatos e gerenciar pagamentos.

### 📍 Fluxo de Navegação
1. **Login/Registro**
   - Redirecionamento imediato para: `/estabelecimento` (Dashboard)

2. **Área Principal (Dashboard): `/estabelecimento`**
   - Visão geral (KPIs): Vagas abertas, Candidatos pendentes, Próximos turnos.
   - Ação rápida: "Criar Nova Vaga".

3. **Gestão de Vagas: `/estabelecimento/vagas`**
   - Lista de vagas criadas.
   - Status: Aberta, Fechada, Cancelada.
   - Ação: Ver Candidatos.

4. **Gestão de Candidatos: `/estabelecimento/candidatos`**
   - Lista geral de candidatos pendentes.
   - Perfis dos profissionais.
   - Ações: Aprovar, Rejeitar.

5. **Financeiro: `/pagamentos`**
   - Histórico de pagamentos realizados.
   - Comprovantes.

6. **Perfil: `/perfil`**
   - Dados da empresa.
   - Logo e descrição.

---

## 🛠️ Alterações Necessárias no Código

### 1. Redirecionamento de Login (`src/app/login/page.tsx`)
- **Atual:** Redireciona todos para `/dashboard` ou `/vagas`.
- **Novo:**
  - Se `role === 'professional'` -> `router.push('/vagas')`
  - Se `role === 'establishment'` -> `router.push('/estabelecimento')`

### 2. Navbar Dinâmica (`src/components/Navbar.tsx`)
- Deve renderizar itens de menu diferentes baseado no `user.role`.

### 3. Proteção de Rotas (`src/components/ProtectedRoute.tsx`)
- Garantir que Profissionais não acessem `/estabelecimento`.
- Garantir que Estabelecimentos não acessem áreas exclusivas de profissionais (ex: candidatar-se).
