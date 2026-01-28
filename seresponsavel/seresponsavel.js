function verificarQuestao8Responsavel() {
    const radioSim = document.getElementById("sim");
    const radioNao = document.getElementById("nao");
    const campoCurso = document.querySelector(".cursoInput");

    // Se SIM
    if (radioSim.checked) {
        if (campoCurso.value.trim() === "") {
            alert("Informe o curso ou qualificação.");
            campoCurso.focus();
            return;
        }

        // SIM → com curso
        window.location.href = "../comcurso/comcurso.html";
        return;
    }

    // Se NÃO
    if (radioNao.checked) {
        window.location.href = "../resultado.html";
        return;
    }

    alert("Selecione uma opção para continuar.");
}
