# Instruções de Configuração - Login e Cadastro com Firebase

Este documento detalha as etapas necessárias para configurar e utilizar o sistema de login e cadastro implementado com **Firebase Authentication**.

## 1. Arquivos Entregues

Os seguintes arquivos foram criados ou modificados para implementar a autenticação via Firebase:

| Arquivo | Status | Descrição |
| :--- | :--- | :--- |
| `firebase_config.js` | **NOVO** | Contém as configurações do seu projeto Firebase. **Requer sua edição.** |
| `auth.js` | MODIFICADO | Lógica de autenticação (login, cadastro, logout) usando as funções do Firebase. |
| `login.js` | NOVO | Gerencia a interação do formulário de login/cadastro e chama as funções de `auth.js`. |
| `upload/login.html` | MODIFICADO | Inclui os SDKs do Firebase e o novo script `login.js`. |

## 2. Configuração do Projeto Firebase

Para que o sistema funcione, você deve configurar seu projeto no console do Firebase:

### 2.1. Habilitar Autenticação por E-mail/Senha

1.  Acesse o [Firebase Console](https://console.firebase.google.com/) e selecione seu projeto.
2.  No menu lateral, vá para **Authentication** (Autenticação).
3.  Clique na aba **Sign-in method** (Método de login).
4.  Habilite o provedor **Email/Password** (E-mail/Senha).

### 2.2. Obter as Credenciais de Configuração

Você precisa obter as chaves de configuração do seu aplicativo web para preencher o arquivo `firebase_config.js`:

1.  Na visão geral do seu projeto no Firebase Console, clique no ícone **Web** (`</>`) para registrar um novo aplicativo web.
2.  Ao final do registro, o Firebase fornecerá um objeto de configuração JavaScript.
3.  Copie os valores e use-os para editar o arquivo `firebase_config.js`.

**Exemplo de Edição do `firebase_config.js`:**

```javascript
// Arquivo: firebase_config.js

const firebaseConfig = {
    apiKey: "SUA_CHAVE_API_REAL_AQUI", // <-- SUBSTITUA
    authDomain: "seu-projeto-id.firebaseapp.com", // <-- SUBSTITUA
    projectId: "seu-projeto-id", // <-- SUBSTITUA
    storageBucket: "seu-projeto-id.appspot.com",
    messagingSenderId: "SEU_SENDER_ID_REAL_AQUI",
    appId: "SEU_APP_ID_REAL_AQUI" // <-- SUBSTITUA
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
```

## 3. Estrutura de Arquivos

Certifique-se de que os arquivos estejam na seguinte estrutura (assumindo que `login.html` está na raiz ou em um diretório acessível):

```
.
├── auth.js
├── firebase_config.js
├── login.js
├── upload/
│   ├── login.html (modificado)
│   └── ... outros arquivos
└── ...
```

## 4. Como Usar

1.  Abra o arquivo `login.html` no seu navegador.
2.  A tela inicial será o formulário de **Login**.
3.  Clique em **"Criar conta"** para alternar para o formulário de **Cadastro**.
4.  Preencha o e-mail e a senha (e a confirmação de senha no cadastro).
5.  O sistema fará a comunicação com o Firebase para criar o usuário ou realizar o login.
6.  Em caso de sucesso, o usuário será redirecionado para `index.html`.

---
*Documento gerado por Manus AI.*
