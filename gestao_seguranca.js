document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  var user = document.getElementById('user').value;
  var password = document.getElementById('password').value;
  var arqJsonUrl = 'http://localhost:8080/gestao_seguranca.json';

  try {
    let response = await fetch(arqJsonUrl);
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    let arqJson = await response.json();
    var json = arqJson.users.find(u => u.username === user);
    const password2 = await decrypt(json.password);
    if (json && (password === password2)) {
      // text = 'Autenticacao correta '
      // let encryptedPermission = await encrypt(json.permission);
      const permission = await decrypt(json.permission);
      redirect(json.username, permission);
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
  
async function generateKey() {
  // Ensure the key is 32 bytes (256 bits)
  const rawKey = new TextEncoder().encode('your-secret-key-1234567890123456');
  return await crypto.subtle.importKey(
    "raw", 
    rawKey, 
    { name: "AES-GCM" }, 
    false, 
    ["encrypt", "decrypt"]
  );
}

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

async function redirect(user, permission) {
  const encryptUser = encodeURIComponent(await encrypt(user));
  const encryptPermission = encodeURIComponent(await encrypt(permission));
  const url = `gestao_seguranca_estoque.html?user=${encryptUser}&permission=${encryptPermission}`;
  window.location.href = url;
}
  