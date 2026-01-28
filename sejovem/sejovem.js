function verificarQuestao8() {
    const radioSim = document.getElementById("sim");
    const radioNao = document.getElementById("nao");
    const campoCurso = document.querySelector(".cursoInput");

    // Se marcou SIM
    if (radioSim.checked) {
        if (campoCurso.value.trim() === "") {
            alert("Informe qual curso ou qualificação você possui.");
            campoCurso.focus();
            return;
        }

        // Redireciona para página COM curso
        window.location.href = "../comcurso/comcurso.html";
        return;
    }

    // Se marcou NÃO
    if (radioNao.checked) {
        window.location.href = "../resultado.html";
        return;
    }

    // Segurança extra
    alert("Selecione uma opção para continuar da pergunta 8.");
}
