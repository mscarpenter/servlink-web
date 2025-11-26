// src/app/ratings/[jobId]/page.tsx - Interface de Avaliação Mútua

'use client';

import { Container, Box, Typography, Button, Paper, Divider, Rating, TextareaAutosize } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import { useState } from 'react';

// --- CORES DO GUIA DE ESTILO ---
const MAR_PROFUNDO = '#003366'; 
const LARANJA_POR_DO_SOL = '#FF6F61'; 
const VERDE_COSTEIRA = '#008A7C';

export default function RatingPage({ params }: { params: { jobId: string } }) {
    // Mock: Profissional sendo avaliado (simulação)
    const beingEvaluated = 'Lucas S. (Profissional)'; 

    const [score, setScore] = useState<number | null>(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert(`Avaliação enviada para ${beingEvaluated}! Nota: ${score}. Isso completa o ciclo da diária.`);
        // Após o envio, o usuário é redirecionado para a lista
        window.location.href = '/vagas'; 
    };

    return (
        <Container maxWidth="sm" sx={{ padding: 4, pt: 6, textAlign: 'center', minHeight: '100vh' }}>
            
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: MAR_PROFUNDO, mb: 1 }}>
                Avaliação Mútua
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Sua opinião constrói a reputação do nosso ecossistema[cite: 646].
            </Typography>

            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: '100%', textAlign: 'left' }}>
                
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: MAR_PROFUNDO }}>
                    Avalie o turno #{params.jobId}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Você está avaliando **{beingEvaluated}**.
                </Typography>

                {/* 1. Rating por Estrelas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                        Qualidade Geral do Serviço:
                    </Typography>
                    <Rating
                        name="quality-rating"
                        value={score}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setScore(newValue);
                        }}
                        size="large"
                        icon={<StarIcon fontSize="inherit" style={{ color: LARANJA_POR_DO_SOL }} />}
                        emptyIcon={<StarIcon fontSize="inherit" style={{ color: 'grey' }} />}
                    />
                </Box>
                
                <Divider sx={{ my: 3 }} />

                {/* 2. Comentários */}
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                    Deixe um comentário (opcional):
                </Typography>
                <TextareaAutosize
                    minRows={3}
                    placeholder="Ex: Ótima comunicação e pontualidade."
                    style={{ 
                        width: '100%', 
                        padding: '10px', 
                        borderRadius: '4px', 
                        borderColor: '#ccc',
                        backgroundColor: 'transparent',
                        color: 'white',
                        resize: 'none'
                    }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            
                <Button 
                    variant="contained" 
                    fullWidth
                    size="large"
                    onClick={handleSubmit}
                    disabled={!score}
                    sx={{
                        backgroundColor: VERDE_COSTEIRA,
                        '&:hover': { backgroundColor: '#006B62' },
                        mt: 3,
                        color: 'white',
                        fontWeight: 700
                    }}
                >
                    Enviar Avaliação
                </Button>
            </Paper>

            <Button component={Link} href="/vagas" sx={{ mt: 4, textTransform: 'none', color: 'text.secondary' }}>
                Voltar para a Lista Principal
            </Button>
        </Container>
    );
}