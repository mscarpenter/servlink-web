'use client';

import { Container, Box, Typography, Button, Paper, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import PaidIcon from '@mui/icons-material/Paid'; // Usado para Pagamentos/Monetização
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';

// --- CORES DO GUIA DE ESTILO ---
const MAR_PROFUNDO = '#003366';
const VERDE_COSTEIRA = '#008A7C';
const LARANJA_POR_DO_SOL = '#FF6F61';

export default function StatusConfiancaPage() {
    const { user } = useAuthStore();

    return (
        <Container maxWidth="sm" sx={{
            padding: 4,
            textAlign: 'center',
            pt: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{ mb: 4 }}>
                <SecurityIcon sx={{ color: MAR_PROFUNDO, fontSize: 80, mb: 2 }} />
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: MAR_PROFUNDO, mb: 1 }}>
                    Bem-vindo(a), {user?.name || 'Usuário'}!
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Dashboard de Gerenciamento e Qualidade
                </Typography>
            </Box>

            {/* --- Painel de Status (Monetização e Controle) --- */}
            <Paper elevation={4} sx={{
                p: 3,
                borderRadius: 3,
                width: '100%',
                backgroundColor: 'background.paper',
            }}>

                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: MAR_PROFUNDO, textAlign: 'left' }}>
                    Status Operacional
                </Typography>

                {/* Status da Diária (Simulação) */}
                <List>
                    <ListItem>
                        <ListItemIcon><CheckCircleIcon sx={{ color: VERDE_COSTEIRA }} /></ListItemIcon>
                        <ListItemText primary="3 Vagas Abertas" secondary="Seu estabelecimento está ativo e recebendo candidaturas." />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><PaidIcon sx={{ color: LARANJA_POR_DO_SOL }} /></ListItemIcon>
                        <ListItemText primary="Pagamento em Escrow" secondary="R$ 144,00 retidos. Aguardando a conclusão do turno." />
                    </ListItem>
                </List>

                <Divider sx={{ my: 3 }} />

                {/* Valor Agregado (Monetização Futura) */}
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 2, color: 'text.secondary', textAlign: 'left' }}>
                    Recursos Premium (Roadmap)
                </Typography>

                <Button
                    component={Link}
                    href="/candidatos" // ROTA CORRIGIDA PARA ENCONTRAR PROFISSIONAIS
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                        backgroundColor: LARANJA_POR_DO_SOL,
                        '&:hover': { backgroundColor: '#E05552' },
                        mt: 1
                    }}
                >
                    Encontrar Profissionais (CTA Principal)
                </Button>

                <Button
                    component={Link}
                    href="/vagas"
                    variant="outlined"
                    fullWidth
                    sx={{
                        borderColor: MAR_PROFUNDO,
                        color: MAR_PROFUNDO,
                        mt: 2
                    }}
                >
                    Gerenciar Vagas Abertas
                </Button>

            </Paper>

            {/* Link de volta (para teste) */}
            <Button component={Link} href="/login" sx={{ mt: 3, textTransform: 'none', color: 'text.secondary' }}>
                Voltar ao Login
            </Button>
        </Container>
    );
}