'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Button,
  InputAdornment
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import { useJobsStore } from '@/stores/jobsStore';
import { useAuthStore } from '@/stores/authStore';
import JobCard from '@/components/JobCard';
import { useRouter } from 'next/navigation';

const MAR_PROFUNDO = '#003366';

const CATEGORIES = [
  'Todos',
  'Bartender',
  'Garçom',
  'Cozinheiro',
  'Auxiliar de Cozinha',
  'Recepcionista',
];

export default function VagasPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { jobs, isLoading, error, fetchJobs, setFilters, clearError } = useJobsStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    // Carregar vagas ao montar o componente
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = () => {
    const filters: any = {};

    if (selectedCategory !== 'Todos') {
      filters.category = selectedCategory;
    }

    if (selectedLocation) {
      filters.location = selectedLocation;
    }

    setFilters(filters);
    fetchJobs(filters);
  };

  const handleApply = (jobId: number) => {
    // TODO: Implementar candidatura
    console.log('Candidatar para vaga:', jobId);
    router.push(`/vagas/${jobId}/candidatar`);
  };

  const handleViewDetails = (jobId: number) => {
    router.push(`/vagas/${jobId}`);
  };

  // Filtrar vagas localmente por termo de busca
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: MAR_PROFUNDO, mb: 1 }}>
          Vagas Disponíveis
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Encontre oportunidades de trabalho temporário
        </Typography>
      </Box>

      {/* Filtros */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Buscar vagas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={selectedCategory}
                label="Categoria"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Localização"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              placeholder="Ex: Rio de Janeiro"
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              startIcon={<FilterList />}
              sx={{
                height: 56,
                bgcolor: MAR_PROFUNDO,
                '&:hover': { bgcolor: '#002A3C' }
              }}
            >
              Filtrar
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
          {error}
        </Alert>
      )}

      {/* Loading */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Lista de Vagas */}
      {!isLoading && (
        <>
          {filteredJobs.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                Nenhuma vaga encontrada
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Tente ajustar os filtros ou volte mais tarde
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {filteredJobs.length} {filteredJobs.length === 1 ? 'vaga encontrada' : 'vagas encontradas'}
              </Typography>

              <Grid container spacing={3}>
                {filteredJobs.map((job) => (
                  <Grid item xs={12} sm={6} md={4} key={job.id}>
                    <JobCard
                      job={job}
                      onApply={user?.role === 'professional' ? handleApply : undefined}
                      onViewDetails={handleViewDetails}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </>
      )}
    </Container>
  );
}