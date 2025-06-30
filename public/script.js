// public/script.js
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

        //  Cria um objeto com os dados do formulário, incluindo o assunto.
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



// const meuFormulario = document.getElementById("meuFormulario");
// meuFormulario.addEventListener("submit", function (event) {
//     event.preventDefault(); // Impede o envio padrão do formulário

//     const nome = event.target.elements.nome.value;
//     const email = event.target.elements.email.value;
//     const assunto = event.target.elements.assunto.value;

//     let validacao_nome = document.getElementById('validacao_nome');
//     let validacao_email = document.getElementById('validacao_email');
//     let validacao_assunto = document.getElementById('validacao_assunto');



//     if (nome === "") {
//         ;
//         validacao_nome.innerHTML = `<p class= "aviso"> Campo Nome obrigatório! </p>`
//         meuFormulario.nome.focus();
//         return false;
//     } if (email === "") {
//         validacao_email.innerHTML = `<p class= "aviso"> Campo Email obrigatório! </p>`
//         meuFormulario.email.focus();
//         return false;

//     } if (assunto === "") {
//         validacao_assunto.innerHTML = `<p class= "aviso"> Campo Assunto obrigatório! </p>`
//         meuFormulario.assunto.focus();
//         return false;

//     } else
//         alert(`O formulário foi enviado com o Email: ${email} \n Com o Nome: ${nome} \n Com o assunto: ${assunto} \n Entraremos em contato em breve. Obrigada!`);
//     validacao_nome.innerHTML = "";
//     validacao_assunto.innerHTML = "";
//     return true


// });

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