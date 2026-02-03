document.addEventListener("DOMContentLoaded", () => {
    const chkDias = document.querySelectorAll('.dias input[type="checkbox"]');
    const chkPeriodos = document.querySelectorAll('.periodo input[type="checkbox"]');
    
    // Seleciona os labels pela posição (1º Manhã, 3º Noite)
    const labelManha = document.querySelector('.periodo label:nth-of-type(2)'); // O 1º é o texto "Período:"
    const labelNoite = document.querySelector('.periodo label:nth-of-type(4)');

    function aplicarRegras() {
        let diaAtivo = "";
        chkDias.forEach(dia => { if(dia.checked) diaAtivo = dia.parentElement.innerText.toLowerCase(); });

        // Reset
        [labelManha, labelNoite].forEach(l => { if(l){ l.style.opacity="1"; l.querySelector('input').disabled=false; }});

        if (diaAtivo.includes("sab")) {
            labelNoite.style.opacity = "0.3";
            labelNoite.querySelector('input').disabled = true;
            labelNoite.querySelector('input').checked = false;
        } else if (diaAtivo !== "") {
            labelManha.style.opacity = "0.3";
            labelManha.querySelector('input').disabled = true;
            labelManha.querySelector('input').checked = false;
        }
    }

    // Garante apenas um dia e um período
    const limitarSelecao = (grupo, callback) => {
        grupo.forEach(item => {
            item.addEventListener('change', () => {
                if (item.checked) grupo.forEach(outro => { if(outro !== item) outro.checked = false; });
                if(callback) callback();
            });
        });
    };

    limitarSelecao(chkDias, aplicarRegras);
    limitarSelecao(chkPeriodos);
});



// mandar o form

document.addEventListener('DOMContentLoaded', () => {
    const linkProsseguir = document.getElementById('link-prosseguir');

    if (linkProsseguir) {
        linkProsseguir.addEventListener('click', () => {
            // Capturar dias selecionados
            const diasSelecionados = Array.from(document.querySelectorAll('input[name="dia"]:checked'))
                .map(el => el.parentElement.textContent.trim());

            // Capturar períodos selecionados
            const periodosSelecionados = Array.from(document.querySelectorAll('input[name="periodo"]:checked'))
                .map(el => el.parentElement.textContent.trim());

            const fichaCompleta = {
                responsavel: {
                    nome: document.getElementById('resp-nome').value,
                    cpf: document.getElementById('resp-cpf').value,
                    nascimento: document.getElementById('resp-nasc').value,
                    endereco: document.getElementById('resp-endereco').value,
                    cidade: document.getElementById('resp-cidade').value,
                    telefone: document.getElementById('resp-tel').value,
                    foneRecado: document.getElementById('resp-recado-tel').value,
                    nomeRecado: document.getElementById('resp-recado-nome').value
                },
                aluno: {
                    nome: document.getElementById('aluno-nome').value,
                    nascimento: document.getElementById('aluno-nasc').value,
                    telefone: document.getElementById('aluno-tel').value,
                    dias: diasSelecionados.join(', '),
                    periodo: periodosSelecionados.join(', ')
                },
                data: new Date().toLocaleString('pt-BR')
            };

            localStorage.setItem('fichaMEGA10', JSON.stringify(fichaCompleta));
        });
    }
});




// envio
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. REGRAS DE SELEÇÃO (DIA E PERÍODO) ---
    const chkDias = document.querySelectorAll('.dias input[type="checkbox"]');
    const chkPeriodos = document.querySelectorAll('.periodo input[type="checkbox"]');

    const limitarSelecao = (grupo) => {
        grupo.forEach(item => {
            item.addEventListener('change', () => {
                if (item.checked) {
                    grupo.forEach(outro => { if (outro !== item) outro.checked = false; });
                }
            });
        });
    };

    limitarSelecao(chkDias);
    limitarSelecao(chkPeriodos);

    // --- 2. CAPTURA E ENVIO DOS DADOS ---
    const linkProsseguir = document.querySelector('.botao-prosseguir a');

    if (linkProsseguir) {
        linkProsseguir.addEventListener('click', (e) => {
            // Captura os dias e períodos marcados
            const diaSelecionado = Array.from(document.querySelectorAll('input[name="dia"]:checked'))
                .map(el => el.parentElement.textContent.trim())[0] || "Não informado";

            const periodoSelecionado = Array.from(document.querySelectorAll('input[name="periodo"]:checked'))
                .map(el => el.parentElement.textContent.trim())[0] || "Não informado";

            // Cria o objeto com TODOS os campos do seu novo HTML
            const fichaCompleta = {
                responsavel: {
                    nome: document.getElementById('resp-nome').value,
                    cpf: document.getElementById('resp-cpf').value,
                    nascimento: document.getElementById('resp-nasc').value,
                    endereco: document.getElementById('resp-endereco').value,
                    cidade: document.getElementById('resp-cidade').value,
                    telefone: document.getElementById('resp-tel').value,
                    nomeConjuge: document.getElementById('resp-conjuge-nome').value,
                    foneConjuge: document.getElementById('resp-conjuge-tel').value,
                    nomeRecado: document.getElementById('resp-recado-nome').value,
                    foneRecado: document.getElementById('resp-recado-tel').value
                },
                aluno: {
                    nome: document.getElementById('aluno-nome').value,
                    nascimento: document.getElementById('aluno-nasc').value,
                    telefone: document.getElementById('aluno-tel').value,
                    diaEstudo: diaSelecionado,
                    periodo: periodoSelecionado
                },
                dataRegistro: new Date().toLocaleString('pt-BR')
            };

            // Salva na memória do navegador para a próxima página ler
            localStorage.setItem('fichaMEGA10', JSON.stringify(fichaCompleta));
        });
    }
});