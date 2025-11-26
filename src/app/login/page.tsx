'use client';

import { Container, Box, Typography, TextField, Button, Paper, Alert, CircularProgress, FormControlLabel, Checkbox, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

const MAR_PROFUNDO = '#003366';

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading, error, clearError } = useAuthStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [userType, setUserType] = useState(0); // 0 = Professional, 1 = Establishment

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setUserType(newValue);
        clearError();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        try {
            await login(email, password, rememberMe);

            // Obter usuário atualizado do store
            const user = useAuthStore.getState().user;

            // Redirecionar baseado no role real do usuário (prioridade)
            // Se o role bater com a aba selecionada, ótimo. Se não, o sistema corrige e manda para o lugar certo.
            if (user?.role === 'professional') {
                router.push('/vagas');
            } else if (user?.role === 'establishment') {
                router.push('/estabelecimento');
            } else {
                router.push('/vagas');
            }
        } catch (err) {
            console.error('Erro no login:', err);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ padding: 4, pt: 8, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: MAR_PROFUNDO, mb: 3 }}>
                Acessar ServLink
            </Typography>

            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: '100%', backgroundColor: 'background.paper' }}>

                {/* Selector de Persona (Restaurado) */}
                <Tabs value={userType} onChange={handleTabChange} centered sx={{ mb: 3 }}>
                    <Tab label="Sou Profissional" sx={{ textTransform: 'none' }} />
                    <Tab label="Sou Estabelecimento" sx={{ textTransform: 'none' }} />
                </Tabs>

                {/* Error Alert */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
                        {error}
                    </Alert>
                )}

                {/* Formulário */}
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="E-mail"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Senha"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Lembrar de mim"
                        sx={{ mt: 1 }}
                    />

                    {/* Botão de Login */}
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: MAR_PROFUNDO,
                            '&:hover': { backgroundColor: '#002A3C' }
                        }}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Entrar'
                        )}
                    </Button>
                </Box>

                {/* Link para Cadastro */}
                <Typography variant="body2" align="center" color="text.secondary">
                    Novo por aqui?
                    <Button component={Link} href="/register" sx={{ ml: 1, color: MAR_PROFUNDO, textTransform: 'none' }}>
                        Cadastre-se
                    </Button>
                </Typography>
            </Paper>

        </Container>
    );
}