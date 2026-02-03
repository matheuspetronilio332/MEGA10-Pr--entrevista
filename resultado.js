document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURAÇÃO DO CARROSSEL ---
    let counter = 1;
    const totalSlides = 4; // Total de imagens
    const intervalTime = 3500; // Tempo em milisegundos (4 segundos)

    // Função para mudar o slide
    const nextImage = () => {
        counter++;
        
        // LÓGICA INFINITA: Se passar do último, volta para o primeiro
        if (counter > totalSlides) {
            counter = 1;
        }

        const radioBtn = document.getElementById('radio' + counter);
        if (radioBtn) {
            radioBtn.checked = true;
        }
    };

    // Inicia o temporizador
    let slideInterval = setInterval(nextImage, intervalTime);

    // BÔNUS: Pausar o carrossel quando o mouse estiver em cima (melhora a experiência)
    const carrosselContainer = document.querySelector('.carrocel');
    if (carrosselContainer) {
        carrosselContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carrosselContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextImage, intervalTime);
        });
    }

    // --- VALIDAÇÃO DA MATRÍCULA (Sua regra de negócio) ---
    const submitBtn = document.querySelector('.btn-submit');
    const whatsappAuth = document.querySelector('#auth-check');
    const confirmSection = document.querySelector('.section-confirmation');

    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            if (!whatsappAuth.checked) {
                e.preventDefault();
                alert("Marque como autorizado para prosseguir para o próximo passo.");
                
                confirmSection.style.border = "2px solid #ff4d4d";
                confirmSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                alert("Sucesso! Prosseguindo...");
            }
        });
    }
}); 