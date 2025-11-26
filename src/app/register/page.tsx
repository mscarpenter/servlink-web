'use client';

import { Container, Box, Typography, TextField, Button, Paper, Tabs, Tab, Alert, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const MAR_PROFUNDO = '#003366';

export default function RegisterPage() {
    const router = useRouter();
    const { register, isLoading, error, clearError } = useAuthStore();

    const [userType, setUserType] = useState(0); // 0 = Professional, 1 = Establishment
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        full_name: '', // Para profissional
        company_name: '', // Para estabelecimento
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setUserType(newValue);
        clearError();
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        // Validação básica
        if (formData.password !== formData.password_confirmation) {
            return;
        }

        try {
            const registerData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
                role: userType === 0 ? 'professional' as const : 'establishment' as const,
                ...(userType === 0 ? { full_name: formData.full_name } : { company_name: formData.company_name }),
            };

            await register(registerData);

            // Redirecionar após registro
            if (userType === 0) {
                router.push('/vagas');
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            console.error('Erro no registro:', err);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ padding: 4, pt: 8, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: MAR_PROFUNDO, mb: 1 }}>
                Junte-se ao ServLink
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Crie sua conta e comece a trabalhar
            </Typography>

            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: '100%', backgroundColor: 'background.paper' }}>

                {/* Selector de Tipo */}
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
                        label="Nome"
                        name="name"
                        variant="outlined"
                        value={formData.name}
                        onChange={handleChange('name')}
                        disabled={isLoading}
                        required
                    />

                    {/* Campo específico por tipo */}
                    {userType === 0 ? (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Nome Completo"
                            name="full_name"
                            variant="outlined"
                            value={formData.full_name}
                            onChange={handleChange('full_name')}
                            disabled={isLoading}
                            required
                            helperText="Nome completo para verificação"
                        />
                    ) : (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Nome da Empresa"
                            name="company_name"
                            variant="outlined"
                            value={formData.company_name}
                            onChange={handleChange('company_name')}
                            disabled={isLoading}
                            required
                            helperText="Razão social ou nome fantasia"
                        />
                    )}

                    <TextField
                        fullWidth
                        margin="normal"
                        label="E-mail"
                        name="email"
                        type="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange('email')}
                        disabled={isLoading}
                        required
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Senha"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        value={formData.password}
                        onChange={handleChange('password')}
                        disabled={isLoading}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Confirmar Senha"
                        name="password_confirmation"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        value={formData.password_confirmation}
                        onChange={handleChange('password_confirmation')}
                        disabled={isLoading}
                        required
                        error={formData.password !== formData.password_confirmation && formData.password_confirmation !== ''}
                        helperText={
                            formData.password !== formData.password_confirmation && formData.password_confirmation !== ''
                                ? 'As senhas não coincidem'
                                : ''
                        }
                    />

                    {/* Botão de Registro */}
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isLoading || formData.password !== formData.password_confirmation}
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
                            'Criar Conta'
                        )}
                    </Button>
                </Box>

                {/* Link para Login */}
                <Typography variant="body2" align="center" color="text.secondary">
                    Já tem uma conta?
                    <Button component={Link} href="/login" sx={{ ml: 1, color: MAR_PROFUNDO, textTransform: 'none' }}>
                        Fazer Login
                    </Button>
                </Typography>
            </Paper>

        </Container>
    );
}