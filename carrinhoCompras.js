document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products");
    const cartSummaryContainer = document.getElementById("cart-summary");
    const checkoutButton = document.getElementById("checkout-button");
    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");
    const logoutButton = document.getElementById("logout-button");

    const usernameDisplay = document.createElement("span");

    let products = [];
    let cart = [];
    let currentUser = null;
    let users = [];

    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            products = data;
            displayProducts();
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    fetchProducts();

    function displayProducts() {
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Preço: R$ ${product.price}</p>
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    window.addToCart = function(productId) {
        if (!currentUser) {
            openModal("Por favor, faça login para adicionar itens ao carrinho.");
            return;
        }

        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.product.id === productId);

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ product, quantity: 1 });
        }

        displayCart();
    };

    function displayCart() {
        cartSummaryContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.product.price * item.quantity;
            const cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");
            cartItemDiv.innerHTML = `
                <h4>${item.product.title}</h4>
                <p>Quantidade: ${item.quantity}</p>
                <p>Preço: R$ ${item.product.price}</p>
                <p>Total: R$ ${(item.product.price * item.quantity).toFixed(2)}</p>
            `;
            cartSummaryContainer.appendChild(cartItemDiv);
        });

        const totalDiv = document.createElement("div");
        totalDiv.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
        cartSummaryContainer.appendChild(totalDiv);
    }

    checkoutButton.addEventListener("click", () => {
        if (cart.length > 0) {
            const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
            openModal(`Pedido realizado com sucesso! <br> Usuário: ${currentUser.username} <br> Total: R$ ${total.toFixed(2)}`);
            cart = [];
            displayCart();
        } else {
            openModal("Seu carrinho está vazio!");
        }
    });

    const loginModal = document.getElementById("login-modal");
    const signupModal = document.getElementById("signup-modal");
    const closeButtons = document.getElementsByClassName("close");

    loginLink.onclick = () => loginModal.style.display = "block";
    signupLink.onclick = () => signupModal.style.display = "block";
    for (const btn of closeButtons) {
        btn.onclick = () => {
            loginModal.style.display = "none";
            signupModal.style.display = "none";
            document.getElementById("myModal").style.display = "none"; 
        };
    }

    window.onclick = (event) => {
        if (event.target === loginModal) loginModal.style.display = "none";
        if (event.target === signupModal) signupModal.style.display = "none";
        if (event.target === document.getElementById("myModal")) document.getElementById("myModal").style.display = "none"; 
    };

    document.getElementById("login-form").onsubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        const user = users.find(user => user.username === username);

        if (user) {
            if (password === user.password) {
                openModal("Login realizado com sucesso!");
                currentUser = user;
                usernameDisplay.innerText = `Usuário: ${currentUser.username}`;
                const parent = loginLink.parentNode;
                if (parent) {
                    parent.replaceChild(usernameDisplay, loginLink);
                }
                loginModal.style.display = "none";
                logoutButton.style.display = "block";
                signupLink.style.display = "none";
            } else {
                openModal("Senha incorreta. Tente novamente.");
            }
        } else {
            openModal("Usuário não encontrado. Verifique o nome de usuário.");
        }
    };

    document.getElementById("signup-form").onsubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;

        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
            openModal("Nome de usuário já em uso. Por favor, escolha outro.");
        } else {
            users.push({ username, password });
            openModal("Cadastro realizado com sucesso!");
            signupModal.style.display = "none";
        }
    };

    logoutButton.addEventListener("click", () => {
        currentUser = null;
        usernameDisplay.innerText = '';
        openModal("Logout realizado com sucesso!");

        const parent = usernameDisplay.parentNode;
        if (parent) {
            parent.replaceChild(loginLink, usernameDisplay);
        }
        logoutButton.style.display = "none";
        signupLink.style.display = "block";
    });

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
});
