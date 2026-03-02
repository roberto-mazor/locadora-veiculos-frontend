document.addEventListener("DOMContentLoaded", () => {
    const btnEntrar = document.getElementById("btn_entrar");
    const msgErro = document.getElementById("mensagem_erro");

    if (btnEntrar) {
        btnEntrar.addEventListener("click", () => {
            const usuario = document.getElementById("login_usuario").value;
            const senha = document.getElementById("senha_usuario").value;

            // Limpa mensagens de erro anteriores
            msgErro.classList.add("hidden");

            // Validação simples de campos vazios
            if (!usuario || !senha) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            // Envia os dados para o seu Back-end (Nível 2)
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario: usuario,
                    senha: senha
                })
            })
            .then(async resposta => {
                const dados = await resposta.json();

                if (resposta.status === 200) {
                    // SUCESSO: Guarda o token
                    localStorage.setItem("token", "autenticado");
                    localStorage.setItem("nivel", dados.nivel); // Guarda o nível (Admin ou Operador)
                    alert("Bem-vindo! Login realizado com sucesso.");
                    
                    // Redireciona para a página de gestão dentro da pasta pages
                    window.location.href = "pages/gestao.html";
                } else {
                    // ERRO (T2.2): Exibe a mensagem de erro na tela
                    msgErro.textContent = dados.erro || "Falha no login.";
                    msgErro.classList.remove("hidden");
                }
            })
            .catch(erro => {
                console.error("Erro na requisição:", erro);
                alert("Erro ao conectar com o servidor. Verifique se o Back-end está rodando.");
            });
        });
    }
});