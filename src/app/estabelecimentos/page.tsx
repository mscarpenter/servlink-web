// src/app/estabelecimentos/page.tsx - Lista de Clientes para o Profissional (Lucas)

'use client';

import { Container, Box, Typography, Button, Grid, Card, CardContent, Rating, Divider, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import BusinessIcon from '@mui/icons-material/Business';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; 
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // CORREÇÃO: Ícone importado
import Link from 'next/link';

// --- CORES DO GUIA DE ESTILO ---
const MAR_PROFUNDO = '#003366'; 
const LARANJA_POR_DO_SOL = '#FF6F61'; 
const VERDE_COSTEIRA = '#008A7C'; 


// --- Mock Data de Estabelecimentos (CORRIGIDO: Adicionando job e verified) ---
const mockEstablishments = [
    {
        id: 1,
        name: 'Hotel Jurerê Exclusive',
        job: 'Hotelaria de Luxo',
        rating: 4.9,
        verified: true, 
        status: 'Pagamento Pontual',
        location: 'Jurerê Internacional',
    },
    {
        id: 2,
        name: 'Restaurante Canto da Lagoa',
        job: 'Alta Gastronomia',
        rating: 4.7,
        verified: true,
        status: 'Ótimo Ambiente',
        location: 'Lagoa da Conceição',
    },
    {
        id: 3,
        name: 'Bar e Eventos Top Market',
        job: 'Entretenimento/Eventos',
        rating: 4.2,
        verified: false,
        status: 'Em Avaliação',
        location: 'Centro',
    },
];


export default function EstabelecimentosPage() {
    return (
        <Container maxWidth="lg" sx={{ padding: 4, pt: 6, minHeight: '100vh' }}>

            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: MAR_PROFUNDO, mb: 1 }}>
                Busca de Clientes Recorrentes
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Explore estabelecimentos bem avaliados por profissionais como você.
            </Typography>

            <Grid container spacing={4}>
                {mockEstablishments.map((est) => (
                    <Grid item xs={12} sm={6} md={4} key={est.id}>
                        <Card 
                            elevation={4} 
                            sx={{ 
                                borderRadius: 3, 
                                height: '100%', 
                                borderTop: `5px solid ${MAR_PROFUNDO}` 
                            }}
                        >
                            <CardContent>
                                
                                {/* Selo de Confiança */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: est.verified ? VERDE_COSTEIRA : LARANJA_POR_DO_SOL }}>
                                        {est.verified ? (
                                            <><VerifiedUserIcon sx={{ fontSize: 16, mr: 0.5 }} /> VERIFICADO</>
                                        ) : (
                                            'Em Verificação'
                                        )}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <StarIcon sx={{ color: LARANJA_POR_DO_SOL, fontSize: 18, mr: 0.5 }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            {est.rating}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Nome e Cargo */}
                                <Typography variant="h5" sx={{ fontWeight: 700, color: MAR_PROFUNDO }}>
                                    {est.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                    Setor: {est.job}
                                </Typography>

                                {/* Detalhes */}
                                <Typography variant="h6" sx={{ fontWeight: 700, color: LARANJA_POR_DO_SOL }}>
                                    Status: {est.status}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    {est.location}
                                </Typography>
                                
                                {/* CTA para Contratar */}
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    size="medium"
                                    component={Link}
                                    href="/vagas" // Leva para a lista de vagas abertas
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{ 
                                        backgroundColor: MAR_PROFUNDO, 
                                        '&:hover': { backgroundColor: '#002A3C' } 
                                    }}
                                >
                                    Ver Vagas Abertas
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}