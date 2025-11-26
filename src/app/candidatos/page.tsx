// src/app/candidatos/page.tsx - Lista de Profissionais para o Estabelecimento (Mariana)

'use client';

import { Container, Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; // Ícone de Verificação (Confiança)
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

// --- CORES DO GUIA DE ESTILO ---
const MAR_PROFUNDO = '#003366'; 
const VERDE_COSTEIRA = '#008A7C';
const LARANJA_POR_DO_SOL = '#FF6F61';

// --- Mock Data de Profissionais (Onde o Estabelecimento Encontra o Lucas) ---
const mockProfessionals = [
    {
        id: 1,
        name: 'Lucas Silva',
        job: 'Bartender / Garçom',
        rating: 4.9,
        verified: true,
        hourlyRate: 'R$ 22/h',
        location: 'Centro, Florianópolis',
    },
    {
        id: 2,
        name: 'Ana Cristina',
        job: 'Cozinheira (Cozinha Quente)',
        rating: 4.5,
        verified: true,
        hourlyRate: 'R$ 28/h',
        location: 'Lagoa da Conceição',
    },
    {
        id: 3,
        name: 'Pedro Mello',
        job: 'Ajudante Geral',
        rating: 4.2,
        verified: false,
        hourlyRate: 'R$ 18/h',
        location: 'Jardim Atlântico',
    },
];


export default function CandidatosPage() {
    return (
        <Container maxWidth="lg" sx={{ padding: 4, pt: 6, minHeight: '100vh' }}>
            
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: MAR_PROFUNDO, mb: 1 }}>
                Encontre Profissionais Verificados
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Resultados para: **Serviços de Curta Duração (Diárias)**
            </Typography>

            <Grid container spacing={4}>
                {mockProfessionals.map((prof) => (
                    <Grid item xs={12} sm={6} md={4} key={prof.id}>
                        <Card 
                            elevation={4} 
                            sx={{ 
                                borderRadius: 3, 
                                height: '100%', 
                                borderTop: `5px solid ${prof.verified ? VERDE_COSTEIRA : LARANJA_POR_DO_SOL}` 
                            }}
                        >
                            <CardContent>
                                {/* Selo de Confiança */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="caption" sx={{ color: VERDE_COSTEIRA, fontWeight: 'bold' }}>
                                        {prof.verified ? (
                                            <><VerifiedUserIcon sx={{ fontSize: 16, mr: 0.5 }} /> VERIFICADO</>
                                        ) : (
                                            'Em Verificação'
                                        )}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <StarIcon sx={{ color: LARANJA_POR_DO_SOL, fontSize: 18, mr: 0.5 }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            {prof.rating}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Nome e Cargo */}
                                <Typography variant="h5" sx={{ fontWeight: 700, color: MAR_PROFUNDO }}>
                                    {prof.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                    {prof.job}
                                </Typography>

                                {/* Detalhes */}
                                <Typography variant="h6" sx={{ fontWeight: 700, color: LARANJA_POR_DO_SOL }}>
                                    {prof.hourlyRate}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    {prof.location}
                                </Typography>

                                {/* CTA para Contratar */}
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    size="medium"
                                    component={Link}
                                    href="/vagas" // Simula o início do fluxo de Contratação (que é o mesmo fluxo de Diária)
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{ 
                                        backgroundColor: MAR_PROFUNDO, 
                                        '&:hover': { backgroundColor: '#002A3C' } 
                                    }}
                                >
                                    Ver Perfil e Contratar
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}