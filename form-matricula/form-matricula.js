document.addEventListener("DOMContentLoaded", () => {
    // --- MÁSCARAS DE INPUT ---
    const cpfInput = document.querySelector('input[placeholder="---.---.--- --"]');
    const telInputs = document.querySelectorAll('input[type="tel"]');

    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, "");
            if (v.length > 11) v = v.slice(0, 11);
            v = v.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            e.target.value = v;
        });
    }

    telInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, "");
            if (v.length > 11) v = v.slice(0, 11);
            v = v.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d)(\d{4})$/, "$1-$2");
            e.target.value = v;
        });
    });

    // --- LÓGICA DE SELEÇÃO DE DIAS E PERÍODOS ---
    const chkDias = document.querySelectorAll('.dias input[type="checkbox"]');
    const chkPeriodos = document.querySelectorAll('.periodo input[type="checkbox"]');
    
    const labelManha = document.querySelector('.periodo label:nth-of-type(1)');
    const labelNoite = document.querySelector('.periodo label:nth-of-type(3)');

    function atualizarRegras() {
        let diaSelecionado = "";

        chkDias.forEach(dia => {
            if (dia.checked) {
                diaSelecionado = dia.parentElement.textContent.trim().toLowerCase();
            }
        });

        // Resetar estados visuais
        [labelManha, labelNoite].forEach(lbl => {
            if (lbl) {
                lbl.style.opacity = "1";
                lbl.style.pointerEvents = "auto";
                lbl.querySelector('input').disabled = false;
            }
        });

        if (diaSelecionado !== "") {
            // Regra para Sábado: Apaga NOITE
            if (diaSelecionado.includes("sab")) {
                if (labelNoite) {
                    labelNoite.style.opacity = "0.3";
                    labelNoite.style.pointerEvents = "none";
                    const inputNoite = labelNoite.querySelector('input');
                    inputNoite.checked = false;
                    inputNoite.disabled = true;
                }
            } 
            // Regra para dias de semana: Apaga MANHÃ
            else {
                if (labelManha) {
                    labelManha.style.opacity = "0.3";
                    labelManha.style.pointerEvents = "none";
                    const inputManha = labelManha.querySelector('input');
                    inputManha.checked = false;
                    inputManha.disabled = true;
                }
            }
        }
    }

    // Regra: Só pode marcar UM DIA por vez
    chkDias.forEach(chk => {
        chk.addEventListener('change', () => {
            if (chk.checked) {
                chkDias.forEach(outro => {
                    if (outro !== chk) outro.checked = false;
                });
            }
            atualizarRegras();
        });
    });

    // Regra: Só pode marcar UM PERÍODO por vez
    chkPeriodos.forEach(chk => {
        chk.addEventListener('change', () => {
            if (chk.checked) {
                chkPeriodos.forEach(outro => {
                    if (outro !== chk) outro.checked = false;
                });
            }
        });
    });
});