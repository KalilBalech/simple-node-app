const express = require('express')
const cors = require('cors');
const multer = require('multer');
const path = require('path')
const bodyParser = require('body-parser');
const os = require('os'); // Import the os module
const fs = require('fs')

const app = express()
const port = 8000

app.use(cors()) // permitir a chamada da função
// Middleware para analisar o corpo da requisição como JSON
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/dadosNoFormatoJSON', (req, res) => {
  const university = {
    nome: 'ITA',
    data: 1950,
    curso: 'engenharia'
  };
  
  // Use res.json() para enviar o objeto JSON como resposta
  res.json(university);
});

const upload = multer({ dest: os.tmpdir() });

// Configurar o armazenamento dos arquivos usando Multer
app.post('/upload', upload.single('file'), function(req, res) {
  const title = req.body.title;
  const file = req.file;

  console.log(title);
  console.log(file);

  res.send("Imagem enviada com sucesso")

  res.sendStatus(200);
});

app.post('/user', (req, res)=>{

  const {name, lastName, age} = req.body

  res.send(`O ${name}, nascido na família ${lastName}, possui ${age} anos de idade`)
})

app.get('/user/:name?/:lastName?/:age?', (req, res) => {
  const { name, lastName, age } = req.params;

  res.send(`O ${name || 'Nome'}, nascido na família ${lastName || 'Sobrenome'}, possui ${age || 'Idade'} anos de idade`);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})