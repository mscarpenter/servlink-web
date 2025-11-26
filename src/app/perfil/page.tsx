'use client';

import { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    Avatar,
    CircularProgress,
    Alert,
    Rating as MuiRating,
} from '@mui/material';
import { Star, Person, Edit, Save } from '@mui/icons-material';
import { useAuthStore } from '@/stores/authStore';
import { profileAPI, type UpdateProfileData } from '@/lib/api/profile';
import ProtectedRoute from '@/components/ProtectedRoute';

const MAR_PROFUNDO = '#003366';

function ProfileContent() {
    const { user } = useAuthStore();
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState<UpdateProfileData>({
        full_name: '',
        company_name: '',
        phone: '',
        bio: '',
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await profileAPI.get();
            setProfile(data);
            setFormData({
                full_name: data.full_name || '',
                company_name: data.company_name || '',
                phone: data.phone || '',
                bio: data.bio || '',
            });
            setIsLoading(false);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao carregar perfil');
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);
        try {
            const updatedProfile = user?.role === 'professional'
                ? await profileAPI.updateProfessional(formData)
                : await profileAPI.updateEstablishment(formData);

            setProfile(updatedProfile);
            setIsEditing(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao salvar perfil');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const isProfessional = user?.role === 'professional';

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: MAR_PROFUNDO, mb: 1 }}>
                        Meu Perfil
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {isProfessional ? 'Profissional' : 'Estabelecimento'}
                    </Typography>
                </Box>
                {!isEditing && (
                    <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => setIsEditing(true)}
                    >
                        Editar
                    </Button>
                )}
            </Box>

            {/* Success Alert */}
            {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    Perfil atualizado com sucesso!
                </Alert>
            )}

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Profile Card */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        {/* Avatar and Rating */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                            <Avatar
                                src={isProfessional ? profile?.photo_url : profile?.logo_url}
                                sx={{ width: 100, height: 100, mr: 3, bgcolor: MAR_PROFUNDO }}
                            >
                                <Person sx={{ fontSize: 50 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                                    {isProfessional ? profile?.full_name : profile?.company_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {user?.email}
                                </Typography>
                                {(profile?.overall_rating || profile?.average_rating) && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <MuiRating
                                            value={profile?.overall_rating || profile?.average_rating || 0}
                                            readOnly
                                            precision={0.1}
                                            size="small"
                                        />
                                        <Typography variant="body2">
                                            {(profile?.overall_rating || profile?.average_rating || 0).toFixed(1)}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        {/* Form */}
                        <Grid container spacing={2}>
                            {isProfessional ? (
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Nome Completo"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                            ) : (
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Nome da Empresa"
                                        value={formData.company_name}
                                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                            )}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Telefone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={isProfessional ? 'CPF' : 'CNPJ'}
                                    value={isProfessional ? profile?.cpf : profile?.cnpj}
                                    disabled
                                    helperText="Não pode ser alterado"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Bio"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    disabled={!isEditing}
                                    multiline
                                    rows={4}
                                    placeholder="Conte um pouco sobre você..."
                                />
                            </Grid>
                        </Grid>

                        {/* Actions */}
                        {isEditing && (
                            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<Save />}
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    sx={{ bgcolor: MAR_PROFUNDO }}
                                >
                                    {isSaving ? <CircularProgress size={24} /> : 'Salvar'}
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setIsEditing(false);
                                        loadProfile();
                                    }}
                                    disabled={isSaving}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    );
}
