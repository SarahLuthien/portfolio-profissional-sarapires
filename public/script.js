document.addEventListener('DOMContentLoaded', () => {

    // --- ALTERNAÇÃO DE TEMA CLARO / ESCURO  ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');

        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const applyTheme = (theme) => {
            if (theme === 'light') {
                body.classList.add('light-mode');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                body.classList.remove('light-mode');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        };

        // Verifica o tema salvo no localStorage 
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (systemPrefersDark) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }

        themeToggle.addEventListener('click', () => {
            const newTheme = body.classList.toggle('light-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }


    // --- FORMULÁRIO DE CONTATO ---
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');

    if (contactForm && statusMessage) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            statusMessage.style.display = 'none';
            statusMessage.className = '';
            statusMessage.textContent = '';

            const formData = {
                name: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('assunto').value,
                message: document.getElementById('mensagem').value
            };

            try {
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
    }

    // --- HEADER SCROLL E MENU HAMBÚRGUER ---
    const header = document.querySelector('header');
    const menuHamburger = document.querySelector('.menu-hamburger');
    const menuList = document.querySelector('.menu_list');

    // Efeito de sombra no header ao rolar
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Funcionalidade do menu hambúrguer
    if (menuHamburger && menuList) {
        menuHamburger.addEventListener('click', () => {
            menuHamburger.classList.toggle('active');
            menuList.classList.toggle('active');
        });
    }
});