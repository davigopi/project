document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  var user = document.getElementById('user').value;
  var password = document.getElementById('password').value;

  // URL do JSON no GitHub Raw com o proxy CORS
  var jsonUrl = 'https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/davigopi/project/main/gestao_seguranca.json';

  try {
    var response = await fetch(jsonUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Erro na resposta da rede');
    var users = await response.json();

    var userObject = users.users.find(u => u.username === user);

    if (userObject && await authenticate(password, userObject.password)) {
      redirectToDashboard(userObject.permission);
    } else {
      document.getElementById('error-message').textContent = 'Usuário ou senha inválidos';
    }
  } catch (error) {
    document.getElementById('error-message').textContent = 'Erro ao carregar dados de usuários';
    console.error('Erro:', error);
  }
});

async function hashPassword(password) {
const msgUint8 = new TextEncoder().encode(password);
const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
const hashArray = Array.from(new Uint8Array(hashBuffer));
const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
return hashHex;
}

async function authenticate(inputPassword, storedPassword) {
const hashedInputPassword = await hashPassword(inputPassword);
return hashedInputPassword === storedPassword;
}

function redirectToDashboard(permission) {
window.location.href = permission + '_dashboard.html';
}
