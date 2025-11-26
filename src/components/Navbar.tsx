'use client';

import { AppBar, Box, Toolbar, Typography, Button, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';

// --- CORES DO GUIA DE ESTILO ---
const MAR_PROFUNDO = '#003366'; // Cor principal
const LARANJA_POR_DO_SOL = '#FF6F61'; // Cor de destaque (CTA)

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
    router.push('/login');
  };

  const handleProfile = () => {
    handleClose();
    router.push('/perfil');
  };

  // Links baseados no role
  const renderNavLinks = () => {
    if (!isAuthenticated || !user) {
      return (
        <>
          <Button component={Link} href="/login" sx={{ color: 'white' }}>Login</Button>
          <Button component={Link} href="/register" variant="contained" sx={{ bgcolor: LARANJA_POR_DO_SOL, ml: 1 }}>Cadastre-se</Button>
        </>
      );
    }

    if (user.role === 'professional') {
      return (
        <>
          <Button component={Link} href="/vagas" sx={{ color: 'white' }}>Vagas</Button>
          <Button component={Link} href="/estabelecimentos" sx={{ color: 'white' }}>Buscar Clientes</Button>
          <Button component={Link} href="/turnos" sx={{ color: 'white' }}>Meus Turnos</Button>
          <Button component={Link} href="/pagamentos" sx={{ color: 'white' }}>Pagamentos</Button>
        </>
      );
    }

    if (user.role === 'establishment') {
      return (
        <>
          <Button component={Link} href="/estabelecimento" sx={{ color: 'white' }}>Dashboard</Button>
          <Button component={Link} href="/estabelecimento/vagas" sx={{ color: 'white' }}>Minhas Vagas</Button>
          <Button component={Link} href="/candidatos" sx={{ color: 'white' }}>Buscar Talentos</Button>
          <Button component={Link} href="/pagamentos" sx={{ color: 'white' }}>Financeiro</Button>
        </>
      );
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: MAR_PROFUNDO }}>
      <Toolbar>
        {/* Logo/Título */}
        <Typography
          variant="h6"
          component={Link}
          href={isAuthenticated ? (user?.role === 'establishment' ? '/estabelecimento' : '/vagas') : '/'}
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'white', fontWeight: 'bold' }}
        >
          ServLink <Box component="span" sx={{ color: LARANJA_POR_DO_SOL }}>[Beta]</Box>
        </Typography>

        {/* Links de Navegação */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          {renderNavLinks()}

          {isAuthenticated && (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Meu Perfil</MenuItem>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}