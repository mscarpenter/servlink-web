// src/components/BottomBar.tsx - Menu de Navegação Inferior (Estilo App)

'use client';

import { Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

// CORES E CONFIGURAÇÃO
const DARK_TEAL = '#003F5C'; 

export default function BottomBar() {
  const router = useRouter();
  const pathname = usePathname();
  // Define o valor atual da navegação baseado na URL para o realce correto
  const [value, setValue] = useState(pathname); 

  // Esta barra deve aparecer em TODAS as rotas, exceto Login/Register
  const hideRoutes = ['/login', '/register'];
  if (hideRoutes.includes(pathname)) return null;

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
        // Estilo de cor baseado na sua imagem
        sx={{ 
          backgroundColor: DARK_TEAL, 
          '& .Mui-selected': { color: '#FF6F61' }, // Ícone laranja selecionado
          '& .MuiBottomNavigationAction-root': { color: 'rgba(255, 255, 255, 0.7)' }, // Ícones não selecionados
          height: '60px',
        }}
      >
        <BottomNavigationAction
          label="Perfil"
          icon={<PersonIcon />}
          value="/candidatos/1" // Perfil do Lucas (Demo)
        />
        <BottomNavigationAction
          label="Vagas"
          icon={<WorkIcon />}
          value="/vagas" // Lista de Vagas
        />
        <BottomNavigationAction
          label="Contratar"
          icon={<AddCircleIcon />}
          value="/status-confianca" // Simula a ação de postar vaga (Dashboard Mariana)
        />
        <BottomNavigationAction
          label="Busca"
          icon={<SearchIcon />}
          value="/estabelecimentos" // Busca Bidirecional de Clientes
        />
      </BottomNavigation>
    </Paper>
  );
}