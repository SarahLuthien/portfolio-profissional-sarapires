
const meuFormulario = document.getElementById("meuFormulario");
meuFormulario.addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const nome = event.target.elements.nome.value;
  const email = event.target.elements.email.value;
  const assunto = event.target.elements.assunto.value;

  var validacao_nome = document.getElementById('validacao_nome');
  var validacao_email = document.getElementById('validacao_email');
  var validacao_assunto = document.getElementById('validacao_assunto');

  

  if (nome === ""){;
    validacao_nome.innerHTML  = `<p class= "aviso"> Campo Nome obrigatório! </p>`
  meuFormulario.nome.focus();    
    return false;
   }  if (email === ""){
    validacao_email.innerHTML = `<p class= "aviso"> Campo Email obrigatório! </p>`
    meuFormulario.email.focus();    
    return false;

   } if (assunto === ""){
    validacao_assunto.innerHTML = `<p class= "aviso"> Campo Assunto obrigatório! </p>`
    meuFormulario.assunto.focus();    
    return false;
   
   } else
   alert(`O formulário foi enviado com o Email: ${email} \n Com o Nome: ${nome} \n Com o assunto: ${assunto} \n Entraremos em contato em breve. Obrigada!`);
   validacao_nome.innerHTML = "";
   validacao_assunto.innerHTML = "";
   return true
    

});
