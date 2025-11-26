# 🚀 Sprint 3 - Funcionalidades Avançadas

## 📋 Visão Geral

**Objetivo:** Implementar funcionalidades avançadas que completam a experiência do usuário.

**Duração:** 2 semanas  
**Status:** 🔄 Em Andamento  
**Progresso:** 0%

---

## 🎯 Objetivos do Sprint

1. **Sistema de Turnos (Shifts)** - Gerenciamento completo de turnos de trabalho
2. **Sistema de Pagamentos** - Visualização e histórico financeiro
3. **Sistema de Avaliações** - Feedback mútuo entre profissionais e estabelecimentos
4. **Perfis de Usuário** - Edição e personalização de perfis

---

## 📦 Entregas

### 1. Sistema de Turnos (Shifts) - 40%

#### Backend (Já Implementado ✅)
- ✅ API de Shifts
- ✅ Check-in/Check-out
- ✅ QR Code generation
- ✅ Validações de horário

#### Frontend (A Implementar)
- [ ] **Shifts API Client** (`src/lib/api/shifts.ts`)
  - Listar turnos
  - Check-in
  - Check-out
  - Validar QR Code

- [ ] **Shifts Store** (`src/stores/shiftsStore.ts`)
  - Estado global de turnos
  - Actions para check-in/out
  - Filtros e busca

- [ ] **Página de Turnos Ativos** (`src/app/turnos/page.tsx`)
  - Lista de turnos do profissional
  - Status visual (agendado, em andamento, concluído)
  - Botões de check-in/out
  - Timer de duração

- [ ] **Componente QR Code Scanner**
  - Scanner de QR Code
  - Validação
  - Feedback visual

- [ ] **Histórico de Turnos**
  - Lista de turnos passados
  - Filtros por data
  - Estatísticas (horas trabalhadas, ganhos)

---

### 2. Sistema de Pagamentos - 30%

#### Backend (Já Implementado ✅)
- ✅ API de Payments
- ✅ Cálculo automático
- ✅ Comissão (18%)
- ✅ Status de pagamento

#### Frontend (A Implementar)
- [ ] **Payments API Client** (`src/lib/api/payments.ts`)
  - Listar pagamentos
  - Detalhes de pagamento
  - Filtros por status/data

- [ ] **Payments Store** (`src/stores/paymentsStore.ts`)
  - Estado global de pagamentos
  - Estatísticas financeiras
  - Filtros

- [ ] **Página de Pagamentos** (`src/app/pagamentos/page.tsx`)
  - Lista de pagamentos
  - Status visual
  - Filtros (pendente, processado, pago)
  - Total ganho/pago

- [ ] **Detalhes de Pagamento**
  - Informações completas
  - Breakdown de valores
  - Comprovante (PDF)

- [ ] **Dashboard Financeiro**
  - Gráficos de ganhos
  - Estatísticas mensais
  - Projeções

---

### 3. Sistema de Avaliações (Ratings) - 20%

#### Backend (Já Implementado ✅)
- ✅ API de Ratings
- ✅ Avaliação mútua
- ✅ Cálculo de overall_rating
- ✅ Validações

#### Frontend (A Implementar)
- [ ] **Ratings API Client** (`src/lib/api/ratings.ts`)
  - Criar avaliação
  - Listar avaliações
  - Estatísticas

- [ ] **Ratings Store** (`src/stores/ratingsStore.ts`)
  - Estado global de avaliações
  - Filtros

- [ ] **Formulário de Avaliação**
  - Rating (1-5 estrelas)
  - Comentário
  - Categorias (pontualidade, qualidade, etc.)

- [ ] **Exibir Avaliações no Perfil**
  - Lista de avaliações recebidas
  - Média geral
  - Gráfico de distribuição

- [ ] **Página de Avaliações Pendentes**
  - Lista de turnos para avaliar
  - Formulário rápido

---

### 4. Perfis de Usuário - 10%

#### Backend (Parcialmente Implementado)
- ✅ API de Profile
- ✅ Upload de foto/logo
- ✅ Validação CPF/CNPJ
- ⏳ Edição de perfil

#### Frontend (A Implementar)
- [ ] **Profile API Client** (`src/lib/api/profile.ts`)
  - Obter perfil
  - Atualizar perfil
  - Upload de foto

- [ ] **Página de Perfil** (`src/app/perfil/page.tsx`)
  - Visualizar perfil
  - Editar informações
  - Upload de foto/logo
  - Validação CPF/CNPJ

- [ ] **Componente de Upload**
  - Drag and drop
  - Preview de imagem
  - Crop de imagem

---

## 📅 Cronograma

### Semana 1 (25-29 Nov)
- **Dia 1-2:** Sistema de Turnos
  - API Client e Store
  - Página de turnos ativos
  - Check-in/Check-out

- **Dia 3-4:** Sistema de Pagamentos
  - API Client e Store
  - Página de pagamentos
  - Dashboard financeiro

- **Dia 5:** Sistema de Avaliações (Início)
  - API Client e Store
  - Formulário de avaliação

### Semana 2 (02-06 Dez)
- **Dia 1-2:** Sistema de Avaliações (Conclusão)
  - Exibir no perfil
  - Página de pendentes

- **Dia 3-4:** Perfis de Usuário
  - Página de perfil
  - Upload de foto
  - Edição

- **Dia 5:** Testes e Ajustes
  - Testes de integração
  - Correções de bugs
  - Documentação

---

## 🎨 Design Guidelines

### Componentes a Criar:
1. **ShiftCard** - Card de turno com status
2. **PaymentCard** - Card de pagamento
3. **RatingStars** - Componente de estrelas
4. **FinancialChart** - Gráfico de ganhos
5. **ImageUpload** - Upload com preview

### Paleta de Cores:
- **Primary:** #003366 (MAR_PROFUNDO)
- **Success:** #4CAF50 (Check-in, Aprovado)
- **Warning:** #FF9800 (Pendente)
- **Error:** #F44336 (Rejeitado, Erro)
- **Info:** #2196F3 (Informação)

---

## 🧪 Critérios de Aceitação

### Sistema de Turnos:
- [ ] Profissional pode ver turnos agendados
- [ ] Profissional pode fazer check-in
- [ ] Profissional pode fazer check-out
- [ ] Sistema valida horários
- [ ] Histórico de turnos visível
- [ ] Estatísticas de horas trabalhadas

### Sistema de Pagamentos:
- [ ] Profissional vê pagamentos recebidos
- [ ] Estabelecimento vê pagamentos efetuados
- [ ] Filtros funcionam corretamente
- [ ] Detalhes de pagamento completos
- [ ] Dashboard financeiro com gráficos

### Sistema de Avaliações:
- [ ] Formulário de avaliação funcional
- [ ] Avaliações aparecem no perfil
- [ ] Média calculada corretamente
- [ ] Apenas turnos concluídos podem ser avaliados
- [ ] Avaliação mútua funciona

### Perfis de Usuário:
- [ ] Edição de perfil funciona
- [ ] Upload de foto funciona
- [ ] Validação CPF/CNPJ funciona
- [ ] Preview de imagem funciona

---

## 📊 Métricas de Sucesso

- **Cobertura de Código:** > 70%
- **Performance:** < 3s load time
- **Responsividade:** 100% mobile-friendly
- **Acessibilidade:** WCAG 2.1 AA
- **Bugs:** < 5 bugs críticos

---

## 🔧 Tecnologias Adicionais

### Novas Bibliotecas:
- **react-qr-reader** - Scanner de QR Code
- **recharts** - Gráficos financeiros
- **react-dropzone** - Upload de arquivos
- **react-image-crop** - Crop de imagens
- **date-fns** - Manipulação de datas

### Instalação:
```bash
npm install react-qr-reader recharts react-dropzone react-image-crop date-fns
```

---

## 🚀 Próximos Passos Imediatos

1. ✅ Criar plano do Sprint 3
2. ⏳ Instalar dependências necessárias
3. ⏳ Criar Shifts API Client
4. ⏳ Criar Shifts Store
5. ⏳ Implementar página de turnos

---

## 📝 Notas

- Backend já está 100% pronto para todas as funcionalidades
- Foco total no frontend
- Priorizar UX e feedback visual
- Manter consistência com Sprint 2
- Documentar componentes novos

---

**Status:** 🔄 Sprint 3 Iniciado
**Data de Início:** 2025-11-24
**Previsão de Conclusão:** 2025-12-06
