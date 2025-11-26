// src/app/candidatos/[id]/page.tsx - Perfil do Profissional (Real)

'use client';

import {
    Container,
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    Avatar,
    Rating,
    Chip,
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { candidatesAPI, Professional } from '@/lib/api/candidates';

// Paleta de Cores ServLink
const MAR_PROFUNDO = '#003366';
const LARANJA_POR_DO_SOL = '#FF6F61';
const VERDE_COSTEIRA = '#008A7C';

// Componente para o 'Bento Grid' de Confiança
const TrustCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) => (
    <Paper
        elevation={3}
        sx={{
            p: 2,
            borderRadius: 3,
            textAlign: 'center',
            height: '100%',
            bgcolor: color === VERDE_COSTEIRA ? '#E8F5E9' : '#FCE4EC', // Cores de fundo mais suaves
            border: `1px solid ${color}`
        }}
    >
        <Box sx={{ color, mb: 1 }}>{icon}</Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: MAR_PROFUNDO }}>{value}</Typography>
        <Typography variant="caption" color="text.secondary">{title}</Typography>
    </Paper>
);

export default function CandidateProfilePage({ params }: { params: { id: string } }) {
    const [candidate, setCandidate] = useState<Professional | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCandidate = async () => {
            try {
                const data = await candidatesAPI.getById(params.id);
                setCandidate(data);
            } catch (err) {
                console.error(err);
                setError('Erro ao carregar perfil do candidato.');
            } finally {
                setIsLoading(false);
            }
        };

        if (params.id) {
            fetchCandidate();
        }
    }, [params.id]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !candidate) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error">{error || 'Candidato não encontrado'}</Alert>
                <Button component={Link} href="/candidatos" sx={{ mt: 2 }}>Voltar</Button>
            </Container>
        );
    }

    // Mapeamento de dados reais para exibição (com fallbacks)
    const profile = candidate.professional_profile;
    const displayName = profile?.full_name || candidate.name;
    const displayBio = profile?.bio || 'Sem biografia disponível.';
    const displayRating = profile?.overall_rating || 5.0;
    const displayPhoto = profile?.photo_url || '';

    // Dados simulados para complementar (já que o backend ainda não tem tudo)
    const mockStats = {
        profession: 'Profissional ServLink',
        reviewsCount: 12,
        trustScore: '95%',
        completedJobs: 28,
        isVerified: true,
        hourlyRate: 'R$ 30,00/h',
        skills: ['Pontualidade', 'Proatividade', 'Trabalho em Equipe']
    };

    return (
        <Container maxWidth="lg" sx={{ padding: 4, pt: 6, minHeight: '100vh' }}>

            {/* Botão Voltar */}
            <Box sx={{ mb: 3 }}>
                <Button
                    component={Link}
                    href="/candidatos"
                    startIcon={<ArrowBackIcon />}
                    sx={{ color: MAR_PROFUNDO, textTransform: 'none' }}
                >
                    Voltar à Lista de Candidatos
                </Button>
            </Box>

            {/* HEADER: Foto e Título */}
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Avatar
                            alt={displayName}
                            src={displayPhoto}
                            sx={{ width: 120, height: 120, border: `4px solid ${LARANJA_POR_DO_SOL}`, mx: { xs: 'auto', md: 0 }, bgcolor: MAR_PROFUNDO }}
                        >
                            {displayName.charAt(0)}
                        </Avatar>
                    </Grid>

                    <Grid item xs={12} md={9}>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, color: MAR_PROFUNDO, mb: 1 }}>
                            {displayName}
                        </Typography>
                        <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
                            {mockStats.profession}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            <Rating
                                value={Number(displayRating)}
                                precision={0.1}
                                readOnly
                                icon={<StarIcon fontSize="inherit" style={{ color: LARANJA_POR_DO_SOL }} />}
                                emptyIcon={<StarIcon fontSize="inherit" style={{ color: 'grey' }} />}
                            />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, ml: 1, color: LARANJA_POR_DO_SOL }}>
                                {Number(displayRating).toFixed(1)} ({mockStats.reviewsCount} avaliações)
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* CONTEÚDO PRINCIPAL E SIDEBAR */}
            <Grid container spacing={4}>

                {/* COLUNA ESQUERDA: Detalhes do Perfil e Habilidades */}
                <Grid item xs={12} md={8}>

                    {/* BENTO GRID: Pontuação de Confiança */}
                    <Typography variant="h5" sx={{ fontWeight: 700, color: MAR_PROFUNDO, mb: 2 }}>
                        Status de Confiança ServLink
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                        <Grid item xs={6} sm={4}>
                            <TrustCard
                                title="Score BGC"
                                value={mockStats.trustScore}
                                icon={<SecurityIcon fontSize="large" />}
                                color={VERDE_COSTEIRA}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <TrustCard
                                title="Serviços Concluídos"
                                value={mockStats.completedJobs}
                                icon={<AccountBalanceWalletIcon fontSize="large" />}
                                color={MAR_PROFUNDO}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TrustCard
                                title="Verificação Oficial"
                                value={mockStats.isVerified ? 'Completa' : 'Pendente'}
                                icon={<VerifiedUserIcon fontSize="large" />}
                                color={VERDE_COSTEIRA}
                            />
                        </Grid>
                    </Grid>

                    {/* BIO */}
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: MAR_PROFUNDO, mb: 1 }}>
                            Sobre o Profissional
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {displayBio}
                        </Typography>
                    </Paper>

                    {/* HABILIDADES */}
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: MAR_PROFUNDO, mb: 2 }}>
                            Habilidades & Tags
                        </Typography>
                        <Box>
                            {mockStats.skills.map((skill, index) => (
                                <Chip
                                    key={index}
                                    label={skill}
                                    variant="outlined"
                                    sx={{ mr: 1, mb: 1, borderColor: MAR_PROFUNDO, color: MAR_PROFUNDO }}
                                />
                            ))}
                        </Box>
                    </Paper>

                </Grid>

                {/* COLUNA DIREITA: Ação de Contratação */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={4} sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 20 }}>

                        <Typography variant="h5" sx={{ fontWeight: 700, color: MAR_PROFUNDO, mb: 1 }}>
                            Ação de Contratação
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {/* Detalhes de Tarifa */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" color="text.secondary">
                                Tarifa Horária Média:
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: LARANJA_POR_DO_SOL }}>
                                {mockStats.hourlyRate}
                            </Typography>
                        </Box>

                        {/* GARANTIA DE PAGAMENTO */}
                        <Box sx={{ mt: 2, p: 2, border: '1px dashed #FF6F61', borderRadius: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: VERDE_COSTEIRA, mb: 0.5 }}>
                                Contrate com Segurança
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                <CheckCircleOutlineIcon sx={{ color: VERDE_COSTEIRA, fontSize: 16, mr: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                    **Pagamento com Garantia (anti-fraude)**
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CheckCircleOutlineIcon sx={{ color: VERDE_COSTEIRA, fontSize: 16, mr: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                    Acionamento da Governança em caso de disputa.
                                </Typography>
                            </Box>
                        </Box>

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            component={Link}
                            href="/confirmacao"
                            sx={{
                                backgroundColor: LARANJA_POR_DO_SOL,
                                '&:hover': { backgroundColor: '#E05552' },
                                mt: 3,
                                fontWeight: 700
                            }}
                        >
                            Contratar Agora
                        </Button>

                        <Button
                            variant="outlined"
                            fullWidth
                            size="medium"
                            component={Link}
                            href={`/mensagens/${candidate.id}`}
                            sx={{
                                borderColor: MAR_PROFUNDO,
                                color: MAR_PROFUNDO,
                                mt: 1,
                                fontWeight: 700
                            }}
                        >
                            Enviar Mensagem
                        </Button>

                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}