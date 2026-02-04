document.addEventListener('DOMContentLoaded', () => {

    // --- 1. REGRAS DE BLOQUEIO DE HORÁRIOS ---
    const chkDias = document.querySelectorAll('.dias input[type="checkbox"]');
    const chkPeriodos = document.querySelectorAll('.periodo input[type="checkbox"]');
    
    // Seleciona os labels para aplicar o efeito visual de "apagado"
    const labelManha = document.querySelector('.periodo label:nth-of-type(2)'); 
    const labelNoite = document.querySelector('.periodo label:nth-of-type(4)');

    function aplicarRegrasHorario() {
        let diaAtivo = "";
        chkDias.forEach(dia => { if(dia.checked) diaAtivo = dia.parentElement.innerText.toLowerCase(); });

        // Resetar estados antes de aplicar a nova regra
        [labelManha, labelNoite].forEach(l => { 
            if(l) { 
                l.style.opacity = "1"; 
                l.querySelector('input').disabled = false; 
            }
        });

        if (diaAtivo.includes("sab")) {
            // No Sábado: Bloqueia Noite
            labelNoite.style.opacity = "0.3";
            labelNoite.querySelector('input').disabled = true;
            labelNoite.querySelector('input').checked = false;
        } else if (diaAtivo !== "") {
            // Meio de Semana: Bloqueia Manhã
            labelManha.style.opacity = "0.3";
            labelManha.querySelector('input').disabled = true;
            labelManha.querySelector('input').checked = false;
        }
    }

    // --- 2. MÁSCARAS DE ENTRADA (CPF, TEL, DATA) ---
    const aplicarMascara = (id, tipo) => {
        const input = document.getElementById(id);
        if (!input) return;
        input.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, "");
            if (tipo === 'cpf') {
                v = v.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            } else if (tipo === 'tel') {
                v = v.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
            } else if (tipo === 'data') {
                if (v.length > 8) v = v.substring(0, 8);
                if (v.length >= 5) v = v.replace(/^(\d{2})(\d{2})(\d{0,4}).*/, "$1/$2/$3");
                else if (v.length >= 3) v = v.replace(/^(\d{2})(\d{0,2}).*/, "$1/$2");
            }
            e.target.value = v;
        });
    };

    aplicarMascara('resp-cpf', 'cpf');
    aplicarMascara('resp-nasc', 'data');
    aplicarMascara('aluno-nasc', 'data');
    aplicarMascara('resp-tel', 'tel');
    aplicarMascara('resp-conjuge-tel', 'tel');
    aplicarMascara('resp-recado-tel', 'tel');
    aplicarMascara('aluno-tel', 'tel');

    // --- 3. LIMITAR SELEÇÃO ÚNICA ---
    const limitarSelecao = (grupo, callback) => {
        grupo.forEach(item => {
            item.addEventListener('change', () => {
                if (item.checked) grupo.forEach(outro => { if(outro !== item) outro.checked = false; });
                if(callback) callback();
            });
        });
    };

    limitarSelecao(chkDias, aplicarRegrasHorario);
    limitarSelecao(chkPeriodos);

    // --- 4. VALIDAÇÃO FINAL E SALVAMENTO ---
    const linkProsseguir = document.querySelector('.botao-prosseguir a');
    if (linkProsseguir) {
        linkProsseguir.addEventListener('click', (e) => {
            const obrigatorios = ['resp-nome', 'resp-cpf', 'resp-nasc', 'resp-endereco', 'resp-cidade', 'resp-tel', 'aluno-nome', 'aluno-nasc', 'aluno-tel'];
            let vazio = null;

            for (let id of obrigatorios) {
                const campo = document.getElementById(id);
                if (campo.value.trim() === "") { vazio = campo; break; }
            }

            const diaMarcado = document.querySelector('input[name="dia"]:checked');
            const periodoMarcado = document.querySelector('input[name="periodo"]:checked');

            if (vazio) {
                e.preventDefault();
                alert(`Preencha o campo: ${vazio.previousElementSibling.innerText}`);
                vazio.style.border = "2px solid red";
                vazio.focus();
            } else if (!diaMarcado || !periodoMarcado) {
                e.preventDefault();
                alert("Selecione o Dia e o Período de estudo.");
            } else {
                const ficha = {
                    responsavel: {
                        nome: document.getElementById('resp-nome').value,
                        cpf: document.getElementById('resp-cpf').value,
                        nascimento: document.getElementById('resp-nasc').value,
                        endereco: document.getElementById('resp-endereco').value,
                        cidade: document.getElementById('resp-cidade').value,
                        telefone: document.getElementById('resp-tel').value,
                        foneConjuge: document.getElementById('resp-conjuge-tel').value,
                        nomeConjuge: document.getElementById('resp-conjuge-nome').value,
                        foneRecado: document.getElementById('resp-recado-tel').value,
                        nomeRecado: document.getElementById('resp-recado-nome').value
                    },
                    aluno: {
                        nome: document.getElementById('aluno-nome').value,
                        nascimento: document.getElementById('aluno-nasc').value,
                        telefone: document.getElementById('aluno-tel').value,
                        diaEstudo: diaMarcado.parentElement.textContent.trim(),
                        periodo: periodoMarcado.parentElement.textContent.trim()
                    }
                };
                localStorage.setItem('fichaMEGA10', JSON.stringify(ficha));
            }
        });
    }
});