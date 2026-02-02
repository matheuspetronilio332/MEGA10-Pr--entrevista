// lógica dia de vencimento
document.addEventListener('DOMContentLoaded', () => {
    const dayCheckboxes = document.querySelectorAll('.day-select');
    const submitBtn = document.querySelector('.btn-submit');

    // 1. Lógica de Seleção Única (Comportamento de Radio Button)
    dayCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Desmarca todos os outros se este for marcado
                dayCheckboxes.forEach(other => {
                    if (other !== this) other.checked = false;
                });
            } else {
                // Opcional: impede que o usuário desmarque tudo (sempre deixa um ativo)
                this.checked = true;
            }
        });
    });

    // 2. Lógica do Botão de Enviar
    submitBtn.addEventListener('click', () => {
        // Encontra qual dia está selecionado
        const selectedDay = Array.from(dayCheckboxes).find(cb => cb.checked).value;
        
        // Simulação de envio
        console.log("Enviando matrícula...");
        console.log("Dia de vencimento escolhido:", selectedDay);
        
        alert(`Matrícula enviada com sucesso! Vencimento escolhido: Dia ${selectedDay}`);
        
        // Aqui você poderia usar um fetch() para enviar os dados para seu servidor
    });
});