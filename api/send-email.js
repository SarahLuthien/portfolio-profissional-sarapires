
// Serverless Function no Vercel.

const nodemailer = require('nodemailer');

// Configuração do Nodemailer para enviar e-mails.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 'req' contém os dados da requisição do seu formulário.
// 'res' é usado para enviar uma resposta de volta para o seu formulário.
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido. Use POST.' });
  }

  // Extrai os dados do corpo da requisição.
  const { name, email, subject, message } = req.body;

  // Validação dos dados recebidos.
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos do formulário.' });
  }

  // Configuração das opções do e-mail.
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.DESTINATION_EMAIL,
    subject: `Nova Mensagem do Site de ${name} - Assunto: ${subject}`,
    html: `
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail do Remetente:</strong> ${email}</p>
            <p><strong>Assunto:</strong> ${subject}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
        `
  };

  // Tentiva de  envio do e-mail usando o Nodemailer.
  try {
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Sua mensagem foi enviada com sucesso!' });
  } catch (error) {

    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({
      message: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.'
    });
  }
};