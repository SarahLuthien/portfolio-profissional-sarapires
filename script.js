
const meuFormulario = document.getElementById("meuFormulario");
meuFormulario.addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const nome = event.target.elements.nome.value;
  const email = event.target.elements.email.value;
  const assunto = event.target.elements.assunto.value;
  

  if (nome === ""){;
  alert("Campo Nome é obrigatório.");
  meuFormulario.nome.focus();    
    return false;
   }  if (email === ""){
    alert("Campo Email é obrigatório.");
    meuFormulario.email.focus();    
    return false;

   } if (assunto === ""){
    alert("Campo Assunto é obrigatório.");
    meuFormulario.assunto.focus();    
    return false;
   
   } else
   alert(`O formulário foi enviado com o Email: ${email} \n Com o Nome: ${nome} \n Com o assunto: ${assunto} \n Entraremos em contato em breve. Obrigada!`);
   return true
    

});
