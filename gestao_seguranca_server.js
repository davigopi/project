// npm init -y
// npm install express node-fetch

const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 8080;

// Permitir solicitações de qualquer origem (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/gestao_seguranca.json', async (req, res) => {
  try {
    const response = await fetch('https://davigopi.github.io/web/gestao_seguranca.json');
      const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao buscar os dados' });
  }
});

app.get('/equipment.json', async (req, res) => {
  try {
    const response = await fetch('https://davigopi.github.io/web/equipment.json');
      const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao buscar os dados' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

