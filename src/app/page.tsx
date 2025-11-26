// src/app/page.tsx
import { redirect } from 'next/navigation';

// Esta é a página inicial da aplicação (rota /)
// Ela redireciona imediatamente o usuário para a tela de Login.
export default function HomePage() {
  redirect('/login');
  return null; 
}