'use client';

import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    LinearProgress,
    Chip,
    Divider,
    useTheme
} from '@mui/material';
import {
    TrendingUp,
    Groups,
    Storefront,
    Public,
    FlightTakeoff,
    School,
    AttachMoney
} from '@mui/icons-material';

export default function MarketDataPage() {
    const theme = useTheme();

    const StatCard = ({ title, value, subtitle, icon, color }: any) => (
        <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: -10, right: -10, opacity: 0.1, transform: 'scale(1.5)' }}>
                {icon}
            </Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: color || 'primary.main', my: 1 }}>
                {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {subtitle}
            </Typography>
        </Paper>
    );

    const ProfileCard = ({ title, type, description, skills, salary }: any) => (
        <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">{title}</Typography>
                <Chip label={type} color={type === 'Operacional' ? 'default' : 'primary'} size="small" />
            </Box>
            <Typography variant="body2" paragraph color="text.secondary">
                {description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
                <Typography variant="caption" fontWeight="bold" display="block" gutterBottom>ORIGEM & CLASSE</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {skills.map((skill: string) => (
                        <Chip key={skill} label={skill} size="small" variant="outlined" />
                    ))}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AttachMoney fontSize="small" color="success" />
                <Typography variant="body2" fontWeight="bold">{salary}</Typography>
            </Box>
        </Paper>
    );

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="overline" color="primary" fontWeight="bold" letterSpacing={2}>
                        INTELIGÊNCIA DE MERCADO
                    </Typography>
                    <Typography variant="h3" component="h1" fontWeight="900" sx={{ mt: 1, mb: 2, color: '#003366' }}>
                        Ecossistema ServLink
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                        Dados estratégicos sobre a economia gig, mercado de hospitalidade e perfil demográfico em Florianópolis.
                    </Typography>
                </Box>

                {/* SEÇÃO 1: MACROECONOMIA */}
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Public color="primary" /> Cenário Brasil & Gig Economy
                </Typography>
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    <Grid item xs={12} md={4}>
                        <StatCard
                            title="TRABALHADORES INFORMAIS"
                            value="40 Mi"
                            subtitle="38,9% da população ocupada no Brasil (2024)"
                            icon={<Groups sx={{ fontSize: 100, color: theme.palette.warning.main }} />}
                            color={theme.palette.warning.main}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold">Tendência de Crescimento</Typography>
                            <Box sx={{ mt: 4 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" fontWeight="bold">Crescimento da Economia Gig (Projeção 2034)</Typography>
                                    <Typography variant="body2" color="success.main">+17% a.a.</Typography>
                                </Box>
                                <LinearProgress variant="determinate" value={85} color="success" sx={{ height: 10, borderRadius: 5 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, mt: 3 }}>
                                    <Typography variant="body2" fontWeight="bold">Adesão a Apps de Trabalho</Typography>
                                    <Typography variant="body2" color="primary.main">Alta</Typography>
                                </Box>
                                <LinearProgress variant="determinate" value={70} color="primary" sx={{ height: 10, borderRadius: 5 }} />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* SEÇÃO 2: MERCADO LOCAL */}
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Storefront color="primary" /> Mercado Florianópolis (TAM)
                </Typography>
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            title="ESTABELECIMENTOS (CAPITAL)"
                            value="2.692"
                            subtitle="Hotéis e Alimentação (Censo Estácio/SHRBS)"
                            icon={<Storefront sx={{ fontSize: 100 }} />}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            title="GRANDE FLORIANÓPOLIS"
                            value="4.450"
                            subtitle="Base total do sindicato patronal"
                            icon={<Public sx={{ fontSize: 100 }} />}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h2" color="primary" fontWeight="bold">10,6%</Typography>
                                <Typography variant="body2" color="text.secondary">De toda a hotelaria de SC<br />está em Florianópolis</Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem />
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h2" color="error" fontWeight="bold">90%</Typography>
                                <Typography variant="body2" color="text.secondary">Ocupação prevista para<br />Carnaval 2025</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* SEÇÃO 3: FLUXO MIGRATÓRIO */}
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FlightTakeoff color="primary" /> Fluxo Migratório & Demografia
                </Typography>
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold">Origem da População</Typography>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body2" gutterBottom>Nativos vs. Migrantes</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                    <LinearProgress variant="determinate" value={60.9} sx={{ flexGrow: 1, height: 20, borderRadius: 1, bgcolor: '#e0e0e0' }} />
                                    <Typography variant="body2" fontWeight="bold">60.9% Nativos</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <LinearProgress variant="determinate" value={39.1} color="warning" sx={{ flexGrow: 1, height: 20, borderRadius: 1, bgcolor: '#e0e0e0' }} />
                                    <Typography variant="body2" fontWeight="bold">39.1% De Fora</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="body2" gutterBottom>Principais Origens Nacionais</Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Chip label="Rio Grande do Sul (15%)" />
                                    <Chip label="São Paulo (6%)" />
                                    <Chip label="Paraná (5%)" />
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3, bgcolor: '#003366', color: 'white' }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold" color="inherit">Imigração Internacional</Typography>
                            <Typography variant="body2" paragraph sx={{ opacity: 0.8 }}>
                                Novos fluxos migratórios estão redefinindo a base da força de trabalho operacional em A&B.
                            </Typography>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={6}>
                                    <Typography variant="h3" fontWeight="bold" color="#FF6F61">29%</Typography>
                                    <Typography variant="body2">Dos novos imigrantes são <strong>Venezuelanos</strong></Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h3" fontWeight="bold" color="#FF6F61">+7,2%</Typography>
                                    <Typography variant="body2">Crescimento populacional de Floripa em 2024</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

                {/* SEÇÃO 4: PERFIS DE TRABALHADOR */}
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <School color="primary" /> Perfis Sociodemográficos
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <ProfileCard
                            title="Perfil A: Base Operacional"
                            type="Operacional"
                            description="Trabalhadores em busca de liquidez imediata e volume de trabalho. Frequentemente migrantes recentes ou moradores de comunidades periféricas."
                            skills={['Classes C, D, E', 'Baixa Qualificação Formal', 'Migrantes Sazonais', 'Foco em Volume']}
                            salary="Busca: Liquidez Diária"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ProfileCard
                            title="Perfil B: Especialista"
                            type="Especializado"
                            description="Profissionais de carreira (Garçons, Bartenders, Chefs) que valorizam a reputação e a qualidade do local de trabalho."
                            skills={['Classes B, C', 'Técnicos/Tecnólogos', 'Residentes Fixos', 'Foco em Reputação']}
                            salary="Busca: Valorização/Hora"
                        />
                    </Grid>
                </Grid>

            </Container>
        </Box>
    );
}
