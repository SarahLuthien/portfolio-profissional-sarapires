document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');

    if (!contactForm || !statusMessage) {
        console.error('Elementos do formulário ou da mensagem de status não encontrados no HTML.');
        return;
    }

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        statusMessage.style.display = 'none';
        statusMessage.className = '';
        statusMessage.textContent = '';

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value;

        //  Cria um objeto com os dados do formulário.
        const formData = {
            name: nome,
            email: email,
            subject: assunto,
            message: mensagem
        };

        try {
            // Envia os dados para o Serverless Function no Vercel.
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                statusMessage.textContent = data.message;
                statusMessage.classList.add('success');
                contactForm.reset();
            } else {
                statusMessage.textContent = data.message || 'Erro desconhecido ao enviar a mensagem.';
                statusMessage.classList.add('error');
            }
        } catch (error) {
            console.error('Erro na requisição Fetch:', error);
            statusMessage.textContent = 'Ocorreu um erro na comunicação. Verifique sua conexão e tente novamente.';
            statusMessage.classList.add('error');
        } finally {
            statusMessage.style.display = 'block';
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const menuHamburger = document.querySelector('.menu-hamburger');
    const menuList = document.querySelector('.menu_list');

    // Efeito de sombra no header ao rolar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Funcionalidade do menu hambúrguer
    if (menuHamburger) {
        menuHamburger.addEventListener('click', () => {
            menuHamburger.classList.toggle('active');
            menuList.classList.toggle('active');
        });
    }
});