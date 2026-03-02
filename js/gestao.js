// Redireciona se não houver sinal de autenticação no navegador
if (!localStorage.getItem("token")) {
    window.location.href = "../login.html"; 
}

// 2. Carregamento Inicial ao abrir a página
document.addEventListener("DOMContentLoaded", () => {
    fnCarregarReservas();
    // Você pode preencher o nome do operador aqui para maior pessoalidade
    document.getElementById("nome_operador").textContent = "Operador Logado";
});

// 3. Função para buscar reservas no Back-end
function fnCarregarReservas() {
    fetch('http://localhost:3000/agendamentos', {
        method: 'GET',
        headers: { 
            'Authorization': localStorage.getItem("token"),
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(reservas => {
        fnMontarTabela(reservas);
    })
    .catch(err => console.error("Erro ao carregar agendamentos:", err.message));
}

// 4. Função para montar a tabela dinamicamente (Páginas 97 e 98 do PDF)
function fnMontarTabela(reservas) {
    const corpoTabela = document.getElementById("tabela_reservas");
    corpoTabela.innerHTML = ""; // Limpa a tabela antes de preencher

    reservas.forEach(reserva => {
        // Criando a linha com Tailwind CSS para manter o padrão visual
        const linha = `
            <tr class="hover:bg-gray-50 transition">
                <td class="px-6 py-4 font-medium text-gray-900">#${reserva.id}</td>
                <td class="px-6 py-4">${reserva.nome_cliente}</td>
                <td class="px-6 py-4 text-gray-600">${reserva.email_cliente}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">
                        ${reserva.categoria_interesse || 'Padrão'}
                    </span>
                </td>
                <td class="px-6 py-4 text-sm">${new Date(reserva.data_reserva).toLocaleDateString('pt-BR')}</td>
                <td class="px-6 py-4 text-center">
                    <button onclick="fnExcluirReserva(${reserva.id}, event.target)" 
                        class="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded-full text-xs font-bold transition duration-300">
                        EXCLUIR
                    </button>
                </td>
            </tr>
        `;
        corpoTabela.innerHTML += linha;
    });
}

// 5. Função para Excluir Reserva (User Story 3 - Páginas 126 e 131 do PDF)
function fnExcluirReserva(id, elemento) {
    if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
        fetch(`http://localhost:3000/agendamento/${id}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': localStorage.getItem("token") 
            }
        })
        .then(res => res.json())
        .then(dados => {
            // Remove a linha da tabela sem precisar recarregar a página inteira [cite: 690]
            elemento.closest("tr").remove();
            alert("Reserva cancelada com sucesso!");
        })
        .catch(err => alert("Erro ao excluir: " + err.message));
    }
}

// 6. Botão de Logout [cite: 603]
document.getElementById("btn_logout")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "../login.html";
});