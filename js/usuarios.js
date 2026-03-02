const token = localStorage.getItem("token");
const nivel = localStorage.getItem("nivel");

// Se não estiver logado OU se não for Admin, expulsa para a gestão comum
if (token !== "autenticado" || nivel !== "Admin") {
    alert("Acesso restrito a administradores!");
    window.location.href = "gestao.html"; 
}

document.addEventListener("DOMContentLoaded", () => {
    fnCarregarUsuarios();

    // 2. Cadastro de Usuário (US5 e US6)
    document.getElementById("form_usuario").addEventListener("submit", (e) => {
        e.preventDefault();

        const dados = {
            login: document.getElementById("novo_login").value,
            senha: document.getElementById("nova_senha").value,
            nivel_acesso: document.getElementById("novo_nivel").value // Captura o valor do SELECT
        };

        fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        })
        .then(res => res.json())
        .then(() => {
            alert(`Usuário ${dados.login} criado como ${dados.nivel_acesso}!`);
            location.reload();
        })
        .catch(err => console.error("Erro:", err));
    });

    // 3. Logout
    document.getElementById("btn_logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "../login.html";
    });
});

// 4. Listagem de Usuários (Para visualização do Admin)
function fnCarregarUsuarios() {
    // Note: Você precisará criar a rota app.get("/usuarios") no seu index.js se quiser listar
    fetch('http://localhost:3000/usuarios_lista') // Nome sugerido para evitar conflito
    .then(res => res.json())
    .then(usuarios => {
        const corpoTabela = document.getElementById("tabela_usuarios");
        usuarios.forEach(user => {
            corpoTabela.innerHTML += `
                <tr>
                    <td class="px-6 py-4 font-bold">#${user.id}</td>
                    <td class="px-6 py-4">${user.login}</td>
                    <td class="px-6 py-4 text-gray-500">${user.nivel_acesso}</td>
                    <td class="px-6 py-4 text-center text-gray-400 italic">Protegido</td>
                </tr>
            `;
        });
    });
}