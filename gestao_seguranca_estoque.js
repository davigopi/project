let recursosList = [];
let recursosJson = [];
let imagemTemporaria = '';
const addEditButton = document.querySelector('button[type="submit"]');

document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  console.log(params.get('user'))
  const user = await decrypt(decodeURIComponent(params.get('user')));
  const permissiontml = await decrypt(decodeURIComponent(params.get('permission')));
  document.getElementById('user').textContent = `${user}`;
  document.getElementById('permission').textContent = `${permissiontml}`;
  const newUrl = window.location.pathname;
  history.replaceState({}, document.title, newUrl); 
  await carregarJsonRecursos();
  carregarDados();
  exibirRecursos(recursosList);
});

document.getElementById("formRecurso").addEventListener("submit", function(event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const tipo = document.getElementById("tipo").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const status = document.getElementById("status").value;
  const recursoEncontrado = recursosJson.find(recurso => recurso.nome.toLowerCase() === nome.toLowerCase());
  const img = recursoEncontrado ? recursoEncontrado.img : '';
  adicionarRecurso(nome, tipo, quantidade, status, img);
  document.getElementById("formRecurso").reset();
  addEditButton.textContent = '➕ Adicionar Recurso';
});

document.getElementById('bntSair').addEventListener('click', function() {
  window.location.href = 'gestao_seguranca.html';
});

async function carregarJsonRecursos() {
    try {
      let response = await fetch('http://localhost:8080/equipment.json');
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON');
      }
      recursosJson = await response.json();
    } catch (error) {
      console.error('Erro ao carregar dados dos equipamentos', error);
    }
  }

async function adicionarRecurso(nome, tipo, quantidade, status, img) {
  const condition = await permissionUser('samall')
  if (condition) {
    recursosList.push({ nome, tipo, quantidade, status, img });
    salvarDados();
    exibirRecursos(recursosList);
    console.log("Recurso adicionado com sucesso!");
    const listaRecursos = document.getElementById('listaRecursos');
    if (listaRecursos.lastElementChild) {
      listaRecursos.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

async function buscarRecurso() {
  const condition = await permissionUser('samall')
  if (condition) {
    const termo = document.getElementById("busca").value.toLowerCase();
    const resultado = recursosList.filter(recurso => {
      return recurso.nome.toLowerCase().includes(termo) || recurso.tipo.toLowerCase().includes(termo);
    });
    exibirRecursos(resultado)
  }
  document.getElementById('listaRecursos').scrollIntoView({ behavior: 'smooth' });
}

function exibirRecursos(recursosExibir) {
  const listaRecursos = document.getElementById("listaRecursos");
  listaRecursos.innerHTML = "";
  recursosExibir.forEach((recurso, index) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.alt = recurso.nome;
    img.classList.add("img-recurso");
    if (recurso.img) {
      img.src = recurso.img;
    } else {
      img.src = "https://i.im.ge/2024/06/10/KxxCvx.imgNot.png";
    }
    img.onerror = () => {
      img.src = "https://i.im.ge/2024/06/10/KxxCvx.imgNot.png";
    };      
      
    li.appendChild(img);

    li.innerHTML += `Nome: ${recurso.nome}, Tipo: ${recurso.tipo}, Quantidade: ${recurso.quantidade}, Status: ${recurso.status}.&nbsp;&nbsp;&nbsp;`;
    
    const editButton = document.createElement('button');
    editButton.textContent = '✏️';
    editButton.classList.add('edit');
    editButton.addEventListener('click', () => editRecurso(index));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => excluirRecurso(index));

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    listaRecursos.appendChild(li);
  });
}

async function excluirTodosRecursos() {
  const condition = await permissionUser('full')
  if (condition){
    localStorage.removeItem('recursos');
    recursosList = [];
    exibirRecursos(recursosList);
    console.log("Dados limpos com sucesso!");
  }
}

async function adicionarRecursosExemplo() {
  const condition = await permissionUser('average');
  if (condition) {
    try {
      await carregarJsonRecursos();
      for (var i = 0; i < recursosJson.length; i++) {
        var equipment = recursosJson[i];
        var nome = equipment.nome;
        var tipo = equipment.tipo;
        var quantidade = equipment.quantidade;
        var status = equipment.status;
        var img = equipment.img;
        console.log(nome, tipo, quantidade, status, img);
        adicionarRecurso(nome, tipo, quantidade, status, img);
      }
    } catch (error) {
      let text = 'Erro ao carregar dados dos equipamentos';
      console.error(text, error);
    }
    document.getElementById('listaRecursos').scrollIntoView({ behavior: 'smooth' });
  }
}

async function editRecurso(index) {
  console.log('editRecurso')
  const condition = await permissionUser('samall')
  console.log(condition)
  if (condition) {
    const recurso = recursosList[index];
    document.getElementById("nome").value = recurso.nome;
    document.getElementById("tipo").value = recurso.tipo;
    document.getElementById("quantidade").value = recurso.quantidade;
    document.getElementById("status").value = recurso.status;
    addEditButton.textContent = '✏️ Editar Recurso';
    recursosList.splice(index, 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

async function excluirRecurso(index) {
  const condition = await permissionUser('average')
  if (condition) {
    recursosList.splice(index, 1);
    salvarDados();
    exibirRecursos(recursosList);
  }
}

async function classificarRecursos(criterio) {
  const condition = await permissionUser('samall')
  if (condition) {
    recursosList.sort((a, b) => {
      if (a[criterio] < b[criterio]) return -1;
      if (a[criterio] > b[criterio]) return 1;
      return 0;
    });
    exibirRecursos(recursosList);
  }
}

async function salvarDados() {
  const condition = await permissionUser('samall')
  if (condition) {
    localStorage.setItem('recursos', JSON.stringify(recursosList));
    console.log("Dados salvos com sucesso!");
  }
}

function carregarDados() {
  const data = localStorage.getItem('recursos');
  if (data) {
    recursosList = JSON.parse(data);
    console.log("Dados carregados com sucesso!");
  } else {
    console.log("Não há dados salvos.");
  }
}

async function permissionUser(permission_func) {
  const permissao = await document.getElementById('permission').textContent
  const usuario = await document.getElementById('user').textContent
  console.log("Valores usuário:", usuario, ' e permissão:', permissao);
  let text = ''
  switch (permission_func) {
    case 'full':
      if (['Administrador'].includes(permissao)) {
        return true
      }
      break
    case 'average':
      if (['Administrador', 'Gerente'].includes(permissao)) {
        return true
      }
      break
    case 'samall':
      if (['Administrador', 'Gerente', 'Funcionário'].includes(permissao)) {
        return true
      }
      break
    default:
      console.log(`A permissão não foi definida corretamente: ${permission_func}`)
      return false
  }

  
  if (usuario) {
    text += `O usuário ${usuario} não possui autorização para realizar esta operação. <br>
    A sua permissão é restrita ao nível de ${permissao}. `
  } else{
    text += `Suas permissões foram revogadas. Por favor, saia e reconecte-se.`
  }
  openModal(text)
  return false
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

function openModal(message) {
  document.getElementById("modal-message").innerHTML = message;
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

document.getElementsByClassName("close")[0].onclick = function() {
  closeModal();
};

window.onclick = function(event) {
  if (event.target == document.getElementById("myModal")) {
    closeModal();
  }
};

carregarJsonRecursos(); 
carregarDados();
exibirRecursos(recursosList);