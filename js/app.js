// 1. Configuração do Botão e Eventos
const btn_reservar = document.getElementById("btn_reservar");

if (btn_reservar) {
    btn_reservar.addEventListener("click", () => {
        // 2. Captura de dados (Página 65 do PDF)
        const formDados = {
            nome: document.getElementById("nome_cliente").value,
            email: document.getElementById("email_cliente").value,
            categoria: document.getElementById("categoria_veiculo").value
        };

        // 3. Validação (Critério de Aceite do Projeto)
        if (!formDados.nome || !formDados.email) {
            alert("Por favor, preencha o Nome e o E-mail.");
            return;
        }

        // 4. Envio para o BackEnd (Página 66 do PDF)
        fetch('http://localhost:3000/reservar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDados)
        })
        .then(resposta => resposta.json())
        .then(dados => {
            console.log("Sucesso:", dados);
            alert("Reserva realizada com sucesso!");
            fnLimparCampos();
        })
        .catch(erro => {
            console.error("Erro na conexão:", erro.message);
            alert("Erro ao conectar com o servidor.");
        });
    });
}

// 5. Função para Limpar Campos (Boas práticas do PDF)
function fnLimparCampos() {
    document.getElementById("nome_cliente").value = "";
    document.getElementById("email_cliente").value = "";
    document.getElementById("categoria_veiculo").selectedIndex = 0;
}

// 6. Carregamento Inicial (Página 19 do PDF)
function fnCarregarDadosIniciais() {
    fetch('http://localhost:3000/veiculos')
        .then(res => res.json())
        .then(veiculos => {
            console.log("Veículos disponíveis:", veiculos);
            //chamar funções para atualizar a tela se necessário
        })
        .catch(erro => console.log("Erro ao carregar:", erro.message));
}

// Inicia ao abrir a página
fnCarregarDadosIniciais();