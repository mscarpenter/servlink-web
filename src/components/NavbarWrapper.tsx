// src/components/NavbarWrapper.tsx

'use client'; // <-- DECLARAÇÃO OBRIGATÓRIA

import { usePathname } from 'next/navigation';
import Navbar from './Navbar'; // Importa a Navbar que já criamos
import { Fragment } from 'react';

// Rotas onde a Navbar DEVE ser escondida (Login, Registro)
const DISABLE_NAVBAR_ROUTES = ['/login', '/register'];

export default function NavbarWrapper() {
  const pathname = usePathname();
  // Se a rota atual estiver na lista de rotas desativadas, não mostra a Navbar
  const showNavbar = !DISABLE_NAVBAR_ROUTES.includes(pathname);

  // O Fragment é para não adicionar uma div extra no DOM
  return <>{showNavbar ? <Navbar /> : null}</>;
}