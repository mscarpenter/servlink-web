// src/app/mensagens/[chatId]/page.tsx - CÓDIGO FINAL E FUNCIONAL DO CHAT

'use client';
import { Container, Box, Typography, TextField, Button, Paper, AppBar, Toolbar, IconButton, List, ListItem, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import Link from 'next/link';
import { useState } from 'react';

const MAR_PROFUNDO = '#003366'; 
const LARANJA_POR_DO_SOL = '#FF6F61'; 

// Mock de dados da conversa
const mockMessages = [
    { sender: 'Lucas', text: 'Boa tarde! Chegando em 15 minutos no local.', isMe: false },
    { sender: 'Mariana', text: 'Perfeito, Lucas! O uniforme está na recepção, é só pegar. (Design Conversacional)', isMe: true },
    { sender: 'Lucas', text: 'Combinado! Qual a referência de quem procurar?', isMe: false },
];

export default function ChatPage({ params }: { params: { chatId: string } }) {
    
    // O chat ID poderia ser o ID da diária
    const recipientName = 'Mariana (Gerente)';
    const [messages, setMessages] = useState(mockMessages);
    const [input, setInput] = useState('');

    const handleSend = (event: React.FormEvent) => {
        event.preventDefault();
        if (input.trim() === '') return;
        
        const newMessage = { sender: 'Você', text: input.trim(), isMe: true };
        setMessages([...messages, newMessage]);
        setInput('');
    };

    return (
        <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
            
            {/* --- AppBar de Título do Chat --- */}
            <AppBar position="static" sx={{ backgroundColor: MAR_PROFUNDO }}>
                <Toolbar>
                    {/* Botão Voltar para a lista de vagas */}
                    <IconButton edge="start" color="inherit" component={Link} href="/vagas">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
                        {recipientName}
                    </Typography>
                </Toolbar>
            </AppBar>
            
            {/* --- Área de Mensagens --- */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: '#f4f4f4', display: 'flex', flexDirection: 'column-reverse' }}>
                <List>
                    {[...messages].reverse().map((msg, index) => ( // Renderiza em ordem inversa para parecer um chat
                        <ListItem key={index} sx={{ 
                            justifyContent: msg.isMe ? 'flex-end' : 'flex-start',
                            py: 0.5
                        }}>
                            <Paper elevation={1} sx={{
                                maxWidth: '75%',
                                p: 1.5,
                                borderRadius: 3,
                                backgroundColor: msg.isMe ? LARANJA_POR_DO_SOL : 'white',
                                color: msg.isMe ? 'white' : 'black',
                                borderBottomRightRadius: msg.isMe ? 0 : 3,
                                borderBottomLeftRadius: msg.isMe ? 3 : 0,
                            }}>
                                <Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold', mb: 0.5, color: msg.isMe ? 'white' : MAR_PROFUNDO }}>
                                    {msg.sender}
                                </Typography>
                                <ListItemText primary={msg.text} sx={{ m: 0 }} />
                            </Paper>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* --- Input de Mensagem --- */}
            <Paper elevation={6} sx={{ p: 1, display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
                <Box component="form" onSubmit={handleSend} sx={{ display: 'flex', width: '100%' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Escreva sua mensagem..."
                        size="small"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        sx={{ mr: 1, '& fieldset': { borderRadius: '20px' } }}
                    />
                    <Button 
                        type="submit"
                        variant="contained" 
                        sx={{ 
                            borderRadius: '50%', 
                            minWidth: 0, 
                            p: 1.5, 
                            backgroundColor: MAR_PROFUNDO,
                            '&:hover': { backgroundColor: '#002A3C' }
                        }}
                    >
                        <SendIcon />
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}