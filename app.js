const PRIORIDADES = ["Baixa", "Média", "Alta"];

const chamados = [
    {
        id: 1,
        titulo: "Computador não liga",
        descricao: "O computador não apresenta sinal de energia.",
        prioridade: "Alta",
        status: "Aberto",
        solucao: ""
    },
    {
        id: 2,
        titulo: "Senha bloqueada",
        descricao: "Usuário não consegue acessar o sistema.",
        prioridade: "Média",
        status: "Em atendimento",
        solucao: ""
    },
    {
        id: 3,
        titulo: "Notebook não liga",
        descricao: "O equipamento não apresenta sinal ao ligar.",
        prioridade: "Alta",
        status: "Encerrado",
        solucao: "Foi realizada a troca da fonte de alimentação do computador."
    }
];

const app = document.getElementById("app");

function obterClassePrioridade(prioridade, status) {
    if (prioridade === "Alta") {
        return status === "Encerrado"
            ? "prioridade-alta prioridade-encerrada"
            : "prioridade-alta";
    }

    if (prioridade === "Média") {
        return "prioridade-media";
    }

    return "prioridade-baixa";
}

function obterClasseStatus(status) {
    if (status === "Encerrado") {
        return "status-encerrado";
    }

    if (status === "Em atendimento") {
        return "status-em-atendimento";
    }

    return "status-aberto";
}

function criarBadge(texto, classe) {
    return `<span class="badge ${classe}">${texto}</span>`;
}

function mostrarDashboard() {
    const abertos = chamados.filter(chamado => chamado.status === "Aberto").length;
    const emAtendimento = chamados.filter(chamado => chamado.status === "Em atendimento").length;
    const encerrados = chamados.filter(chamado => chamado.status === "Encerrado").length;
    const alta = chamados.filter(chamado => chamado.prioridade === "Alta").length;

    app.innerHTML = `
        <h1 class="mb-4">Dashboard</h1>

        <div class="row g-3">
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h2 class="h5">Total de chamados</h2>
                        <p class="display-6 mb-0">${chamados.length}</p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h2 class="h5">Chamados abertos</h2>
                        <p class="display-6 mb-0">${abertos}</p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h2 class="h5">Chamados em atendimento</h2>
                        <p class="display-6 mb-0">${emAtendimento}</p>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card h-100">
                    <div class="card-body">
                        <h2 class="h5">Chamados encerrados</h2>
                        <p class="display-6 mb-0">${encerrados}</p>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card h-100">
                    <div class="card-body">
                        <h2 class="h5">Chamados de prioridade Alta</h2>
                        <p class="display-6 mb-0">${alta}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function mostrarDetalhes(id) {
    const chamado = chamados.find(item => item.id === id);

    if (!chamado) {
        mostrarChamados();
        return;
    }

    app.innerHTML = `
        <h1 class="mb-4">Detalhes do chamado</h1>

        <div class="card">
            <div class="card-body">
                <p class="mb-2"><strong>Chamado:</strong> #${chamado.id}</p>
                <p class="mb-2"><strong>Título:</strong> ${chamado.titulo}</p>
                <p class="mb-2"><strong>Descrição:</strong> ${chamado.descricao}</p>
                <p class="mb-2"><strong>Prioridade:</strong> ${criarBadge(chamado.prioridade, obterClassePrioridade(chamado.prioridade, chamado.status))}</p>
                <p class="mb-2"><strong>Status atual:</strong> ${criarBadge(chamado.status, obterClasseStatus(chamado.status))}</p>

                ${chamado.status === "Encerrado" ? `
                    <div class="mt-3 border rounded p-3 bg-light">
                        <h2 class="h5">Solução realizada</h2>
                        <p class="mb-0">${chamado.solucao}</p>
                    </div>
                ` : ""}
            </div>
        </div>

        <div class="mt-3">
            <button class="btn btn-secondary" type="button" data-voltar="chamados">
                Voltar
            </button>
        </div>
    `;

    const botaoVoltar = document.querySelector("[data-voltar='chamados']");
    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", mostrarChamados);
    }
}

function mostrarEncerramento(id) {
    const chamado = chamados.find(item => item.id === id);

    if (!chamado || chamado.status === "Encerrado") {
        mostrarChamados();
        return;
    }

    app.innerHTML = `
        <h1 class="mb-4">Encerrar chamado</h1>

        <div class="card mb-4">
            <div class="card-body">
                <p class="mb-2"><strong>Chamado:</strong> #${chamado.id}</p>
                <p class="mb-2"><strong>Problema:</strong> ${chamado.titulo}</p>
                <p class="mb-2"><strong>Descrição:</strong> ${chamado.descricao}</p>
                <p class="mb-2"><strong>Prioridade:</strong> ${criarBadge(chamado.prioridade, obterClassePrioridade(chamado.prioridade, chamado.status))}</p>
                <p class="mb-2"><strong>Status atual:</strong> ${criarBadge(chamado.status, obterClasseStatus(chamado.status))}</p>
            </div>
        </div>

        <form id="formEncerramento">
            <div class="mb-3">
                <label class="form-label" for="solucao">
                    O que foi feito?
                </label>
                <textarea id="solucao" class="form-control" rows="4" required></textarea>
                <div id="erroEncerramento" class="text-danger mt-2" style="display:none;"></div>
            </div>

            <div class="d-flex gap-2">
                <button class="btn btn-success" type="submit">
                    Confirmar encerramento
                </button>
                <button class="btn btn-outline-secondary" type="button" data-voltar="chamados">
                    Voltar
                </button>
            </div>
        </form>
    `;

    const formulario = document.getElementById("formEncerramento");
    const botaoVoltar = document.querySelector("[data-voltar='chamados']");

    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", mostrarChamados);
    }

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();

        const solucao = document.getElementById("solucao").value.trim();
        const erro = document.getElementById("erroEncerramento");

        if (!solucao) {
            erro.textContent = "Preencha o campo 'O que foi feito?' antes de encerrar o chamado.";
            erro.style.display = "block";
            return;
        }

        chamado.solucao = solucao;
        chamado.status = "Encerrado";
        mostrarChamados();
    });
}

function mostrarChamados() {
    app.innerHTML = `
        <h1 class="mb-4">Chamados</h1>

        <div class="table-responsive">
            <table class="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Prioridade</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    ${chamados.map(chamado => `
                        <tr>
                            <td>#${chamado.id}</td>
                            <td>${chamado.titulo}</td>
                            <td>${criarBadge(chamado.prioridade, obterClassePrioridade(chamado.prioridade, chamado.status))}</td>
                            <td>${criarBadge(chamado.status, obterClasseStatus(chamado.status))}</td>
                            <td>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-sm btn-outline-primary" type="button" data-acao="visualizar" data-id="${chamado.id}">
                                        Visualizar
                                    </button>

                                    ${chamado.status === "Aberto"
                                        ? `<button class="btn btn-sm btn-info" type="button" data-acao="atender" data-id="${chamado.id}">Iniciar atendimento</button>`
                                        : ""
                                    }

                                    ${chamado.status === "Encerrado"
                                        ? `<button class="btn btn-sm btn-secondary" type="button" disabled>Encerrado</button>`
                                        : `<button class="btn btn-sm btn-warning" type="button" data-acao="encerrar" data-id="${chamado.id}">Encerrar chamado</button>`
                                    }
                                </div>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;

    document.querySelectorAll("[data-acao='visualizar']").forEach(botao => {
        botao.addEventListener("click", () => {
            mostrarDetalhes(Number(botao.dataset.id));
        });
    });

    document.querySelectorAll("[data-acao='atender']").forEach(botao => {
        botao.addEventListener("click", () => {
            const chamado = chamados.find(item => item.id === Number(botao.dataset.id));

            if (chamado && chamado.status === "Aberto") {
                chamado.status = "Em atendimento";
                mostrarChamados();
            }
        });
    });

    document.querySelectorAll("[data-acao='encerrar']").forEach(botao => {
        botao.addEventListener("click", () => {
            mostrarEncerramento(Number(botao.dataset.id));
        });
    });
}

function mostrarNovoChamado() {
    app.innerHTML = `
        <h1 class="mb-4">Novo chamado</h1>

        <form id="formChamado">
            <div class="mb-3">
                <label class="form-label" for="titulo">Título</label>
                <input class="form-control" id="titulo" required>
            </div>

            <div class="mb-3">
                <label class="form-label" for="descricao">Descrição</label>
                <textarea class="form-control" id="descricao" rows="4" required></textarea>
            </div>

            <div class="mb-3">
                <label class="form-label" for="prioridade">Prioridade</label>
                <select class="form-select" id="prioridade" required>
                    <option value="">Selecione</option>
                    ${PRIORIDADES.map(prioridade => `<option value="${prioridade}">${prioridade}</option>`).join("")}
                </select>
            </div>

            <button class="btn btn-success" type="submit">Cadastrar</button>
        </form>
    `;

    const formulario = document.getElementById("formChamado");
    formulario.addEventListener("submit", evento => {
        evento.preventDefault();

        const titulo = document.getElementById("titulo").value.trim();
        const descricao = document.getElementById("descricao").value.trim();
        const prioridade = document.getElementById("prioridade").value;

        if (!titulo || !descricao || !prioridade) {
            return;
        }

        chamados.push({
            id: chamados.length + 1,
            titulo,
            descricao,
            prioridade,
            status: "Aberto",
            solucao: ""
        });

        mostrarChamados();
    });
}

const links = document.querySelectorAll("[data-view]");

links.forEach(link => {
    link.addEventListener("click", evento => {
        evento.preventDefault();

        const view = link.dataset.view;

        if (view === "dashboard") {
            mostrarDashboard();
        }

        if (view === "chamados") {
            mostrarChamados();
        }

        if (view === "novo") {
            mostrarNovoChamado();
        }
    });
});

mostrarDashboard();
