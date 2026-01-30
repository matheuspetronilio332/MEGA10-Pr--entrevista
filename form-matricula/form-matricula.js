document.addEventListener("DOMContentLoaded", () => {
    const dias = document.querySelectorAll(".dia");

    const periodoManha = document.querySelector(".lbl-manha");
    const periodoTarde = document.querySelector(".lbl-tarde");
    const periodoNoite = document.querySelector(".lbl-noite");

    const chkManha = document.getElementById("periodo-manha");
    const chkTarde = document.getElementById("periodo-tarde");
    const chkNoite = document.getElementById("periodo-noite");

    function atualizarPeriodos() {
        let marcouSabado = false;
        let marcouSemana = false;

        dias.forEach(dia => {
            if (dia.checked) {
                if (dia.value === "sab") {
                    marcouSabado = true;
                } else {
                    marcouSemana = true;
                }
            }
        });

        if (marcouSabado) {
            periodoManha.style.display = "flex";
            periodoNoite.style.display = "none";
            chkNoite.checked = false;
        } 
        else if (marcouSemana) {
            periodoManha.style.display = "none";
            periodoNoite.style.display = "flex";
            chkManha.checked = false;
        } 
        else {
            periodoManha.style.display = "flex";
            periodoNoite.style.display = "flex";
        }
    }

    // 👉 Só um período pode ser marcado
    function somenteUmPeriodo(marcado) {
        [chkManha, chkTarde, chkNoite].forEach(chk => {
            if (chk !== marcado) chk.checked = false;
        });
    }

    dias.forEach(dia => {
        dia.addEventListener("change", atualizarPeriodos);
    });

    chkManha.addEventListener("change", () => somenteUmPeriodo(chkManha));
    chkTarde.addEventListener("change", () => somenteUmPeriodo(chkTarde));
    chkNoite.addEventListener("change", () => somenteUmPeriodo(chkNoite));
});
