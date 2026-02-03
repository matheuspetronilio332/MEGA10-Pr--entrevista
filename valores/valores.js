document.addEventListener('DOMContentLoaded', () => {
    // Selecionando os elementos com os nomes exatos do seu HTML
    const submitBtn = document.querySelector('.btn-submit');
    const confirmSection = document.querySelector('.section-confirmation');
    const whatsappAuth = document.querySelector('.section-confirmation input[type="checkbox"]');
    const dayCheckboxes = document.querySelectorAll('.day-select');

    // 1. Lógica de seleção única para os dias (Dia 05 ou Dia 20)
    dayCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                dayCheckboxes.forEach(other => {
                    if (other !== this) other.checked = false;
                });
            } else {
                this.checked = true; // Impede desmarcar os dois
            }
        });
    });

    // 2. Validação ao clicar no botão Enviar
    if (submitBtn) {
        submitBtn.addEventListener('click', (event) => {
            
            // Verifica se o checkbox de autorização está marcado
            if (!whatsappAuth.checked) {
                event.preventDefault(); // Para o envio
                
                alert("Marque como autorizado para prosseguir para o próximo passo.");
                
                // Aplica o destaque de erro no container de confirmação
                if (confirmSection) {
                    confirmSection.style.border = "2px solid #ff4d4d";
                    confirmSection.style.backgroundColor = "rgba(255, 0, 0, 0.05)";
                }
                return;
            }

            // Se estiver tudo certo, prossegue
            const selectedDay = Array.from(dayCheckboxes).find(cb => cb.checked)?.value;
            alert("Sucesso! Matricula enviada ");
        });
    }

    // 3. Limpa o erro visual quando o usuário marcar o checkbox
    if (whatsappAuth) {
        whatsappAuth.addEventListener('change', () => {
            if (whatsappAuth.checked && confirmSection) {
                confirmSection.style.border = ""; // Volta ao padrão do CSS
                confirmSection.style.backgroundColor = ""; 
            }
        });
    }
});




document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CARROSSEL AUTOMÁTICO INFINITO ---
    let counter = 1;
    const totalSlides = 4; 
    setInterval(() => {
        counter++;
        if (counter > totalSlides) counter = 1;
        const radio = document.getElementById('radio' + counter);
        if (radio) radio.checked = true;
    }, 4000);
});



// pix

function copiarPix() {
    // 1. Seleciona o input com a chave
    const chavePix = document.getElementById('chave-pix');
    
    // 2. Copia o conteúdo para a área de transferência
    navigator.clipboard.writeText(chavePix.value).then(() => {
        // 3. Feedback visual para o usuário
        const btn = document.querySelector('.btn-copiar-pix');
        const textoOriginal = btn.innerText;
        
        btn.innerText = "✅ Copiado!";
        btn.style.backgroundColor = "#2ecc71"; // Verde sucesso

        // Volta ao normal após 3 segundos
        setTimeout(() => {
            btn.innerText = textoOriginal;
            btn.style.backgroundColor = "#2b59c3";
        }, 3000);
    }).catch(err => {
        alert("Erro ao copiar a chave. Tente selecionar e copiar manualmente.");
    });
}







// enviar 
document.addEventListener('DOMContentLoaded', () => {
    // 1. Recupera os checkboxes de vencimento desta página
    const dayCheckboxes = document.querySelectorAll('.day-select');
    const btnSubmit = document.getElementById('auth-check');

    // Garante seleção única de vencimento (05 ou 20)
    dayCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                dayCheckboxes.forEach(other => { if (other !== this) other.checked = false; });
            } else { this.checked = true; }
        });
    });

    if (btnSubmit) {
        btnSubmit.addEventListener('click', () => {
            // A. Resgata a ficha salva na página form-matricula
            const ficha = JSON.parse(localStorage.getItem('fichaMEGA10'));

            if (!ficha) {
                alert("Por favor, preencha o formulário de matrícula primeiro.");
                window.location.href = "../form-matricula/form-matricula.html";
                return;
            }

            // B. Captura o vencimento escolhido (se necessário para o texto)
            const vencimentoEscolhido = Array.from(dayCheckboxes).find(cb => cb.checked)?.value || "05";

            const meuWhats = "5543998257979"; // SUBSTITUA PELO SEU NÚMERO COM DDD

            // C. Montagem do texto exatamente como você solicitou
            const mensagem = 
`*MATRÍCULA: ADMINISTRATIVO E INFORMÁTICA - EAD*

*Dados do Responsável:*

*Nome completo:* ${ficha.responsavel.nome}
*CPF:* ${ficha.responsavel.cpf}
*Data de nascimento:* ${ficha.responsavel.nascimento}
*Endereço:* ${ficha.responsavel.endereco}
*Cidade:* ${ficha.responsavel.cidade}
*Telefone:* ${ficha.responsavel.telefone}
*Fone conj:* (Não informado)
*Fone Recado e nome:* ${ficha.responsavel.foneRecado} - ${ficha.responsavel.nomeRecado}

*Dados do Aluno:*

*Nome:* ${ficha.aluno.nome}
*Data de Nasc:* ${ficha.aluno.nascimento}
*Telefone:* ${ficha.aluno.telefone}

1) *Curso:* Gestão em administração + informática básica

2) *Duração:* 12 meses

3) *Parcelamento:* 12 X de R$ 250,00 (com desconto exclusivo para com pagamento em dia) 12 X R$ 169,00, primeira mensalidade dia 10/11/2025

4) *Vencimento das parcelas:* todo dia ${vencimentoEscolhido} com carência até 10 garantindo o bonus

5) *Módulos:* Windows, Word, Excel, Powerpoint, Secretariado, Atendimento ao Cliente, Auxiliar Financeiro, Operador de Caixa, auxiliar de R.H., Vendas, Telemarketing e Marketing pessoal

6) *Materiais digitais:* Fornecido pela MEGA10 sem custos adicionais

7) *Rescisão:* Em caso de desistência, 10% do valor restante

8) *Aulas realizadas:* com Atendimento semanal, as ${ficha.aluno.dias}, no período da ${ficha.aluno.periodo.toLowerCase()}

✅ Para confirmar a matrícula, responda “SIM”.`;

            // D. Envio formatado para a API do WhatsApp
            const url = `https://api.whatsapp.com/send?phone=${meuWhats}&text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');
        });
    }
});