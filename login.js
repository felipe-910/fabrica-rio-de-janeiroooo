// Arquivo: login.js
// Lógica para lidar com os formulários de login e cadastro

// As funções loginUser e registerUser estão disponíveis globalmente (do auth.js)

/**
 * Lida com o envio do formulário de login/cadastro.
 * @param {Event} event - O evento de envio do formulário.
 */
async function validarLogin(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const form = event.target;
    const email = form.querySelector('#usuario').value;
    const password = form.querySelector('#senha').value;
    
    // Verifica se o formulário é de cadastro (se tiver o campo de confirmação de senha)
    const confirmPasswordInput = form.querySelector('#confirmar-senha');
    
    if (confirmPasswordInput) {
        // É um formulário de cadastro
        const confirmPassword = confirmPasswordInput.value;
        
        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }
        
        const result = await registerUser(email, password);
        
        if (result.success) {
            alert(result.message + " Você será redirecionado para a tela de login.");
            // Simula a troca para o formulário de login após o cadastro
            toggleForm(false); 
        } else {
            alert("Erro no cadastro: " + result.message);
        }
        
    } else {
        // É um formulário de login
        const result = await loginUser(email, password);
        
        if (result.success) {
            alert(result.message + " Redirecionando...");
            window.location.href = 'index.html'; // Redireciona para a página principal
        } else {
            alert("Erro no login: " + result.message);
        }
    }
}

/**
 * Alterna entre os formulários de login e cadastro.
 * @param {boolean} isRegister - Se true, mostra o formulário de cadastro.
 */
function toggleForm(isRegister) {
    const mainContainer = document.querySelector('.container');
    const form = mainContainer.querySelector('form');
    
    // Remove o listener antigo para evitar duplicação
    form.removeEventListener('submit', validarLogin);

    if (isRegister) {
        // Mudar para Cadastro
        form.innerHTML = `
            <h1>Cadastro</h1>

            <div class="input-box">
                <input placeholder="Email" type="email" id="usuario" name="usuario" required>
                <i class="bx bxs-envelope"></i>
            </div>

            <div class="input-box">
                <input placeholder="Senha" type="password" id="senha" name="senha" required>
                <i class="bx bxs-lock-alt"></i>
            </div>
            
            <div class="input-box">
                <input placeholder="Confirmar Senha" type="password" id="confirmar-senha" name="confirmar-senha" required>
                <i class="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" class="login">Cadastrar</button>

            <div class="register-link">
                <p>Já tem conta? <a href="#" onclick="toggleForm(false); return false;">Fazer Login</a></p>
            </div>
        `;
    } else {
        // Mudar para Login
        form.innerHTML = `
            <h1>Login</h1>

            <div class="input-box">
                <input placeholder="Email" type="email" id="usuario" name="usuario" required>
                <i class="bx bxs-envelope"></i>
            </div>

            <div class="input-box">
                <input placeholder="Senha" type="password" id="senha" name="senha" required>
                <i class="bx bxs-lock-alt"></i>
            </div>

            <div class="remember">
                <label>
                    <input type="checkbox">
                    Lembrar senha
                </label>
                <a href="#">Esqueci a senha</a>
            </div>

            <button type="submit" class="login">Entrar</button>

            <!-- Container para o botão do Google -->
            <div id="google-login-button" class="google-login-button"></div>

            <div class="register-link">
                <p>Não tem conta? <a href="#" onclick="toggleForm(true); return false;">Criar conta</a></p>
            </div>
        `;
        // Re-renderiza o botão do Google se ele existir
        if (typeof google !== "undefined") {
            const googleButton = document.getElementById("google-login-button");
            if (googleButton) {
                google.accounts.id.renderButton(
                    googleButton,
                    { theme: "outline", size: "large", type: "standard", text: "signin_with", shape: "pill" }
                );
            }
        }
    }
    
    // Adiciona o novo listener
    form.addEventListener('submit', validarLogin);
}

// Inicializa o formulário de login e adiciona o listener
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.container form');
    if (form) {
        form.addEventListener('submit', validarLogin);
        
        // Adiciona o listener para o link "Criar conta"
        const registerLink = document.querySelector('.register-link a');
        if (registerLink) {
            registerLink.addEventListener('click', function(e) {
                e.preventDefault();
                toggleForm(true);
            });
        }
    }
});
