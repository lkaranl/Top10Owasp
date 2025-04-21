document.addEventListener('DOMContentLoaded', function() {
    // Configuração de animações de rolagem suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Implementação da demonstração de SQL Injection
    const sqlLoginBtn = document.getElementById('sql-login-btn');
    if (sqlLoginBtn) {
        sqlLoginBtn.addEventListener('click', function() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const resultDiv = document.getElementById('sql-result');
            
            // Simulando verificação vulnerável a SQL Injection
            if (username.toLowerCase().includes("' or '1'='1") || 
                password.toLowerCase().includes("' or '1'='1")) {
                resultDiv.innerHTML = `
                    <div class="alert alert-danger">
                        <strong>Ataque bem-sucedido!</strong> Você conseguiu fazer login sem credenciais válidas.
                    </div>
                    <p>Consulta SQL simulada:</p>
                    <code>SELECT * FROM usuarios WHERE username='${username}' AND password='${password}'</code>
                    <p>A injeção mudou a lógica da consulta para sempre retornar verdadeiro.</p>
                `;
            } else if (username === 'admin' && password === 'admin123') {
                resultDiv.innerHTML = `
                    <div class="alert alert-success">
                        <strong>Login bem-sucedido!</strong> Credenciais válidas.
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="alert">
                        Login falhou. Credenciais inválidas.
                    </div>
                `;
            }
        });
    }

    // Implementação da demonstração de Quebra de Autenticação
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            const email = document.getElementById('email').value;
            const resultDiv = document.getElementById('reset-result');
            
            if (email) {
                // Simulando processo de redefinição de senha vulnerável
                resultDiv.innerHTML = `
                    <div class="alert alert-danger">
                        <strong>Vulnerabilidade detectada!</strong> Um link de redefinição foi enviado para ${email}.
                    </div>
                    <p>Problemas nesta implementação:</p>
                    <ul>
                        <li>Não há verificação de que o e-mail existe no sistema</li>
                        <li>Não há limite de tentativas de redefinição</li>
                        <li>Não há notificação ao usuário legítimo</li>
                        <li>O token de redefinição pode ser previsível ou ter vida longa</li>
                    </ul>
                `;
            } else {
                resultDiv.innerHTML = `<div class="alert">Por favor, insira um e-mail.</div>`;
            }
        });
    }

    // Implementação da demonstração de Exposição de Dados Sensíveis
    const paymentBtn = document.getElementById('payment-btn');
    if (paymentBtn) {
        paymentBtn.addEventListener('click', function() {
            const creditCard = document.getElementById('credit-card').value;
            const cvv = document.getElementById('cvv').value;
            const resultDiv = document.getElementById('data-result');
            
            if (creditCard && cvv) {
                // Simulando transmissão de dados sem criptografia
                resultDiv.innerHTML = `
                    <div class="alert alert-danger">
                        <strong>Dados sensíveis expostos!</strong> Os seguintes dados foram transmitidos sem criptografia:
                    </div>
                    <code>
                        POST /process-payment HTTP/1.1<br>
                        Host: exemplo.com<br>
                        Content-Type: application/x-www-form-urlencoded<br><br>
                        cartao=${creditCard}&cvv=${cvv}
                    </code>
                    <p>Um atacante poderia interceptar estes dados usando:</p>
                    <ul>
                        <li>Man-in-the-middle attacks</li>
                        <li>Sniffing de rede</li>
                        <li>Acesso aos logs do servidor</li>
                    </ul>
                `;
            } else {
                resultDiv.innerHTML = `<div class="alert">Por favor, preencha todos os campos.</div>`;
            }
        });
    }

    // Implementação da demonstração de XXE
    const parseXmlBtn = document.getElementById('parse-xml-btn');
    if (parseXmlBtn) {
        parseXmlBtn.addEventListener('click', function() {
            const xmlInput = document.getElementById('xml-input').value;
            const resultDiv = document.getElementById('xxe-result');
            
            if (xmlInput) {
                // Verificar se o XML contém uma entidade externa maliciosa
                if (xmlInput.includes('SYSTEM') && 
                    (xmlInput.includes('file:///') || xmlInput.includes('http://') || xmlInput.includes('https://'))) {
                    resultDiv.innerHTML = `
                        <div class="alert alert-danger">
                            <strong>Ataque XXE detectado!</strong> O parser XML tentou carregar uma entidade externa.
                        </div>
                        <p>O XML contém uma referência a uma entidade externa que poderia:</p>
                        <ul>
                            <li>Ler arquivos do sistema</li>
                            <li>Realizar solicitações de rede</li>
                            <li>Causar ataques de negação de serviço</li>
                        </ul>
                        <p>Um processador XML vulnerável teria processado: <code>${xmlInput.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></p>
                    `;
                } else {
                    resultDiv.innerHTML = `
                        <div class="alert alert-success">
                            <strong>XML processado com segurança.</strong>
                        </div>
                        <p>Dica: Tente uma entrada XML com uma entidade externa, como:</p>
                        <pre>
&lt;?xml version="1.0" encoding="ISO-8859-1"?&gt;
&lt;!DOCTYPE foo [
&lt;!ELEMENT foo ANY &gt;
&lt;!ENTITY xxe SYSTEM "file:///etc/passwd" &gt;]&gt;
&lt;usuario&gt;&lt;nome&gt;&xxe;&lt;/nome&gt;&lt;/usuario&gt;
                        </pre>
                    `;
                }
            } else {
                resultDiv.innerHTML = `<div class="alert">Por favor, insira um XML para análise.</div>`;
            }
        });
    }

    // Implementação da demonstração de Quebra de Controle de Acesso
    const accessBtn = document.getElementById('access-btn');
    if (accessBtn) {
        accessBtn.addEventListener('click', function() {
            const userId = document.getElementById('user-id').value;
            const resultDiv = document.getElementById('access-result');
            
            // Simular um endpoint de API que não verifica autorização
            if (userId) {
                resultDiv.innerHTML = `
                    <div class="alert alert-danger">
                        <strong>Falha no controle de acesso!</strong> Dados obtidos para o usuário ID: ${userId}
                    </div>
                    <code>
                        GET /api/users/${userId}/data HTTP/1.1<br>
                        Host: exemplo.com<br>
                        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...<br><br>
                        {<br>
                            "id": ${userId},<br>
                            "nome": "Usuário ${userId}",<br>
                            "email": "usuario${userId}@exemplo.com",<br>
                            "cartao_credito": "**** **** **** 1234",<br>
                            "saldo_conta": "R$ ${Math.floor(Math.random() * 10000) / 100}"<br>
                        }
                    </code>
                    <p>Neste exemplo, a API não verifica se o usuário autenticado tem permissão para acessar os dados do usuário ${userId}.</p>
                `;
            } else {
                resultDiv.innerHTML = `<div class="alert">Por favor, insira um ID de usuário.</div>`;
            }
        });
    }
}); 