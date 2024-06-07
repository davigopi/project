document.addEventListener("DOMContentLoaded", async function() {
  const params = new URLSearchParams(window.location.search);
  console.log(params.get('user'))
  const user = await decrypt(decodeURIComponent(params.get('user')));
  const permission = await decrypt(decodeURIComponent(params.get('permission')));

  document.getElementById('user').textContent = `Usuário: ${user}`;
  document.getElementById('permission').textContent = `Permissão: ${permission}`;

  // const newUrl = window.location.pathname;
  // history.replaceState({}, document.title, newUrl); 
});

let recursos = [];
const submitButton = document.querySelector('button[type="submit"]');

function listarRecursos() {
  console.log("Lista de Recursos:");
  recursos.forEach(recurso => {
    console.log(`Nome: ${recurso.nome}, Tipo: ${recurso.tipo}, Quantidade: ${recurso.quantidade}, Status: ${recurso.status}`);
  });
}

function adicionarRecurso(nome, tipo, quantidade, status) {
  recursos.push({ nome, tipo, quantidade, status });
  salvarDados();
  exibirRecursos();
  console.log("Recurso adicionado com sucesso!");
}

document.getElementById("formRecurso").addEventListener("submit", function(event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const tipo = document.getElementById("tipo").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const status = document.getElementById("status").value;
  adicionarRecurso(nome, tipo, quantidade, status);
  document.getElementById("formRecurso").reset();
  submitButton.textContent = '➕ Adicionar Recurso'; // Resetar o texto do botão após adicionar
});

document.getElementById('logoutButton').addEventListener('click', function() {
  window.location.href = 'gestao_seguranca.html';
});

function buscarRecurso() {
  const termo = document.getElementById("busca").value.toLowerCase();
  const resultado = recursos.filter(recurso => {
    return recurso.nome.toLowerCase().includes(termo) || recurso.tipo.toLowerCase().includes(termo);
  });

  const listaRecursos = document.getElementById("listaRecursos");
  listaRecursos.innerHTML = "";
  resultado.forEach(recurso => {
    const li = document.createElement("li");
    li.innerHTML = `Nome: ${recurso.nome}, Tipo: ${recurso.tipo}, Quantidade: ${recurso.quantidade}, Status: ${recurso.status}.&nbsp;&nbsp;&nbsp;`;
    listaRecursos.appendChild(li);
  });
}

function classificarRecursos(criterio) {
  recursos.sort((a, b) => {
    if (a[criterio] < b[criterio]) return -1;
    if (a[criterio] > b[criterio]) return 1;
    return 0;
  });
  exibirRecursos();
}

function salvarDados() {
  localStorage.setItem('recursos', JSON.stringify(recursos));
  console.log("Dados salvos com sucesso!");
}

function carregarDados() {
  const data = localStorage.getItem('recursos');
  if (data) {
    recursos = JSON.parse(data);
    console.log("Dados carregados com sucesso!");
  } else {
    console.log("Não há dados salvos.");
  }
}

function excluirRecursos() {
  localStorage.removeItem('recursos');
  recursos = [];
  exibirRecursos();
  console.log("Dados limpos com sucesso!");
}

async function adicionarRecursos() {
  var arqJsonUrl = 'http://localhost:8080/equipment.json';
  
  try {
    let response = await fetch(arqJsonUrl);
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    let json = await response.json();
    // Simulando a obtenção dos dados do usuário
    for (var i = 0; i < json.length; i++) {
      var equipment = json[i];
      var nome = equipment.nome
      var tipo = equipment.tipo
      var quantidade = equipment.quantidade
      var status = equipment.status
      console.log(nome, tipo, quantidade, status)
      adicionarRecurso(nome, tipo, quantidade, status)
    }
  } catch (error) {
    text = 'Erro ao carregar dados dos equipamentos'
    
    console.error(text, error);
  }
}

function exibirRecursos() {
  const listaRecursos = document.getElementById("listaRecursos");
  listaRecursos.innerHTML = "";
  recursos.forEach((recurso, index) => {
    const li = document.createElement("li");
    li.innerHTML = `Nome: ${recurso.nome}, Tipo: ${recurso.tipo}, Quantidade: ${recurso.quantidade}, Status: ${recurso.status}.`; 

    const editButton = document.createElement('button');
    editButton.textContent = '✏️'; 
    editButton.classList.add('edit');
    editButton.addEventListener('click', () => editRecurso(index));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️'; 
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => deleteRecurso(index));

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    listaRecursos.appendChild(li);
  });
}

function editRecurso(index) {
  const recurso = recursos[index];
  document.getElementById("nome").value = recurso.nome;
  document.getElementById("tipo").value = recurso.tipo;
  document.getElementById("quantidade").value = recurso.quantidade;
  document.getElementById("status").value = recurso.status;
  submitButton.textContent = '✏️ Editar Recurso';
  recursos.splice(index, 1);
}

function deleteRecurso(index) {
  recursos.splice(index, 1);
  salvarDados();
  exibirRecursos();
}

async function generateKey() {
  const rawKey = new TextEncoder().encode('your-secret-key-1234567890123456');
  return await crypto.subtle.importKey(
    "raw", 
    rawKey, 
    { name: "AES-GCM" }, 
    false, 
    ["encrypt", "decrypt"]
  );
}

async function decrypt(encryptedText) {
  const [ivBase64, encryptedBase64] = encryptedText.split('.');
  const iv = new Uint8Array(atob(ivBase64).split('').map(char => char.charCodeAt(0)));
  const encryptedContent = new Uint8Array(atob(encryptedBase64).split('').map(char => char.charCodeAt(0)));
  const key = await generateKey();
  const decryptedContent = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encryptedContent
  );
  return new TextDecoder().decode(decryptedContent);
}

carregarDados();
exibirRecursos();
