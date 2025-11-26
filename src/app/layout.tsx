// src/app/layout.tsx - CÓDIGO FINAL E ESTÁVEL (USANDO O BOTTOMBAR)

import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google'; 
import { Box } from '@mui/material'; 

// IMPORTAÇÕES CORRIGIDAS: Agora importando o BottomBar (Menu de App)
import ThemeRegistry from '../components/ThemeRegistry'; 
import NavbarWrapper from '../components/NavbarWrapper'; 
import BottomBar from '../components/BottomBar'; // <-- Corrigido para o componente de navegação móvel

// Define as fontes para uso no className
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: 'ServLink',
  description: 'Conectando confiança e oportunidade.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // A lógica de showNavbar será resolvida dentro do NavbarWrapper

  return (
    <html lang="pt-br" className={`${inter.variable} ${manrope.variable}`}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ThemeRegistry>
          
          {/* 1. Navbar Wrapper (Controla a Navbar Superior) */}
          <NavbarWrapper /> 
          
          {/* 2. Conteúdo Principal (O padding de 60px garante que o BottomBar não esconda o conteúdo) */}
          <Box sx={{ flexGrow: 1, paddingBottom: '60px' }}>
            {children}
          </Box>
          
          {/* 3. BottomBar (Menu de App) */}
          <BottomBar /> 
          
          {/* OBS: O componente Footer.tsx foi completamente removido daqui. */}
          
        </ThemeRegistry>
      </body>
    </html>
  );
}