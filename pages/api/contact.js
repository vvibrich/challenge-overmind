export default function (req, res) {
    let nodemailer = require('nodemailer')

    try{
        const transporter = nodemailer.createTransport({
            port: 465,
            host: "smtpi.kinghost.net",
            auth: {
                user: 'desafioovermind@desafioovermind.kinghost.net',
                pass: '0v3r@m1nD',
            },
            secure: true
        });

        const mailData = {
            from: 'desafioovermind@desafioovermind.kinghost.net',
            to: 'contato@overmind.ai',
            subject: `[DESAFIO] ${req.body.name} se registrou no site`,
            html: `<div>
                    <b>Nome: </b> ${req.body.name}
                    <br/>
                    <b>Telefone: </b> ${req.body.phone}
                    <br/>
                    <b>Email: </b> ${req.body.email}
                    <br/>
                    <b>Senha: </b> ${req.body.password}
                </div>`
        }

        if(!req.body.name || !req.body.phone || !req.body.email || !req.body.password){
            res.status(400).json({
                error: 'Preencha todos os campos'
            })
        }else{
            transporter.sendMail(mailData, function (err, info) {
                if(err)
                    console.log(err)
                else
                    res.status(200);
            })
        }
        console.log(req.body)
    }catch(err){
        console.log(err)
    }
  }