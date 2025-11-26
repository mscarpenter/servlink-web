// src/components/ThemeRegistry.tsx - CÓDIGO FINAL COM CORREÇÃO DE PALETA

'use client';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';

// --- CORES DO GUIA DE ESTILO ---
const MAR_PROFUNDO = '#003366'; // Azul-Marinho Profundo (Primária)
const BEGE_AREIA = '#F5EEDC'; // Bege-Areia Quente (Secundária / Fundo)
const CORAL_VIBRANTE = '#FF6F61'; // Coral Vibrante (Destaque/CTA)
const VERDE_COSTEIRA = '#008A7C'; // Para Sucesso / Verificado

// --- DEFINIÇÃO DO TEMA ---
const theme = createTheme({
  palette: {
    mode: 'light', // MUDANÇA: Usamos o modo CLARO para a base Bege-Areia
    primary: {
      main: MAR_PROFUNDO, 
    },
    secondary: {
      main: CORAL_VIBRANTE, // Usamos o Coral para o destaque principal
    },
    success: {
        main: VERDE_COSTEIRA, // Cor do Selo Verificado e Sucesso
    },
    background: {
      default: BEGE_AREIA, // Fundo principal com o Bege-Areia
      paper: '#FFFFFF', // Cards e Papéis brancos
    },
    text: {
        primary: '#333333',
        secondary: '#666666',
    }
  },
  typography: {
    fontFamily: ['Manrope', 'Inter', 'Roboto', 'sans-serif'].join(','),
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { borderRadius: 8, textTransform: 'none' } },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 12, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' } },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: MAR_PROFUNDO, // Navbar no Mar Profundo
            }
        }
    }
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  // O restante do código do cache não muda
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}