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