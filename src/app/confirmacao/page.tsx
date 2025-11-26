// src/app/confirmacao/page.tsx - CÓDIGO FINAL CORRIGIDO (Linguagem)

'use client';

import { Container, Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from 'next/link';

// Definimos a cor de sucesso (Verde Costeira)
const VERDE_COSTEIRA = '#008A7C';

export default function ConfirmacaoPage() {
  return (
    <Container maxWidth="sm" sx={{ 
        padding: 4, 
        textAlign: 'center', 
        minHeight: '80vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Box sx={{ mb: 4 }}>
            {/* Ícone de Sucesso */}
            <CheckCircleIcon sx={{ color: VERDE_COSTEIRA, fontSize: 80, mb: 2 }} />

            {/* Mensagem Principal */}
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1, color: VERDE_COSTEIRA }}>
                Contratação Concluída!
            </Typography>

            {/* Mensagem do Sistema (Valor Agregado) - LINGUAGEM AJUSTADA */}
            <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 3 }}>
                O pagamento foi depositado com **Pagamento com Garantia** e será liberado ao Lucas S. após o Check-out do turno.
            </Typography>

            {/* Próximos Passos */}
            <Box sx={{ mt: 4, p: 3, border: `1px solid ${VERDE_COSTEIRA}`, borderRadius: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                    Próximos Passos:
                </Typography>
                <Typography variant="body2" align="left">
                    - O prestador Lucas S. recebeu a notificação de agendamento.
                </Typography>
                <Typography variant="body2" align="left">
                    - Lembre-se de fazer a **Avaliação Mútua** após o serviço (protegendo o ecossistema ServLink).
                </Typography>
            </Box>
        </Box>

        {/* Botão de Finalização */}
        <Button 
            component={Link} 
            href="/vagas" 
            variant="outlined" 
            size="large"
            sx={{ mt: 4 }}
        >
            Voltar para a Lista de Vagas
        </Button>
    </Container>
  );
}