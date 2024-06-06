  
  
document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  var user = document.getElementById('user').value;
  var password = document.getElementById('password').value;

  // Simulação da resposta do servidor
  var arqJsonUrl = 'http://localhost:8080/gestao_seguranca.json';

  try {
    // Fazendo a requisição para obter o JSON
    let response = await fetch(arqJsonUrl);
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    let arqJson = await response.json();
    // Simulando a obtenção dos dados do usuário
    var json = arqJson.users.find(u => u.username === user);
    console.log(json)
    const passwordInput = await encrypt(password);
    if (json && (passwordInput === json.password)) {
      text = 'Autenticacao correta '
      // let encryptedPermission = await encrypt(json.permission);
      redirectToDashboard(json.permission);
    } else {
      let text = 'Usuário ou senha inválidos.'
      document.getElementById('error-message').textContent = text;
    }
  } catch (error) {
    let text = 'Erro ao carregar dados de usuários! <br><br>'
    text += 'Verifique a conexão com o banco de dados usando Node.js. <br><br>'
    text += 'O gestao_seguranca_server tem que esta rodando para simular '
    text += 'banco de dados.'
    document.getElementById('error-message').innerHTML = text;
    console.error('Erro:', error);
  }
});
  
// async function hash(password) {
//   const msgUint8 = new TextEncoder().encode(password);
//   const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//   return hashHex;
// }

// async function encrypt(permission) {
//   const key = await crypto.subtle.importKey(
//     "raw",
//     new TextEncoder().encode('your-secret-key-123'),
//     { name: "AES-GCM" },
//     false,
//     ["encrypt"]
//   );
//   const encodedPermission = new TextEncoder().encode(permission);
//   const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
  
//   const encryptedContent = await crypto.subtle.encrypt(
//     { name: "AES-GCM", iv: iv },
//     key,
//     encodedPermission
//   );

//   // Convert iv and encrypted content to base64 to be included in the URL
//   const ivBase64 = btoa(String.fromCharCode(...new Uint8Array(iv)));
//   const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedContent)));
  
//   return `${ivBase64}.${encryptedBase64}`;
// }

async function encrypt(text) {
  const key = await generateKey();
  const encodedText = new TextEncoder().encode(text);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedContent = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encodedText
  );
  const ivBase64 = btoa(String.fromCharCode(...new Uint8Array(iv)));
  const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedContent)));
  console.log(`${ivBase64}.${encryptedBase64}`)
  return `${ivBase64}.${encryptedBase64}`;
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

function redirectToDashboard(permission) {
  // Encode the user and permission to safely include them in the URL
  const encodedUser = encodeURIComponent(user);
  const encodedPermission = encodeURIComponent(permission);
  
  // Construct the URL with the user and permission as parameters
  const url = `gestao_seguranca_estoque.html?user=${encodedUser}permission=${encodedPermission}`;
  
  // Redirect to the constructed URL
  window.location.href = url;
  // window.location.href = 'gestao_seguranca_' + permission + '.html';
}
  