document.addEventListener('DOMContentLoaded', function() {
    // Sistema de abas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classes ativas de todos os botões e painéis
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            button.classList.add('active');
            
            // Mostrar o painel correspondente
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
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
                    <p>Quando a aplicação executa esta consulta, a condição se torna:</p>
                    <code>username='' OR '1'='1' AND password=''</code>
                    <p>Como '1'='1' é sempre verdadeiro, a cláusula WHERE retorna todos os registros, permitindo o acesso sem credenciais válidas.</p>
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
}); 