// Importa a express
const express = require('express');

// inicia o servidor 
const server = express();

// configura o express para aceitar json nas rotas
server.use(express.json());

server.use((req,res, next) => {
  console.log(`Método: ${req.method} URL: ${req.url}`);
  
  return next();
});

function checkUserExists( req, res, next) {
  if(!req.body.name){          
       return res.status(400).json( { error: 'User name is required' });
   }

  return next();
}

function checkUserInArray(req, res, next){
  if (!users[req.params.index]){
    return res.status(400).json({ error: 'User does not exists'});
  }

  return next();
}

const users = ['Leandro','Fabi','Jorginho'];

//rota para listar todos usuarios
server.get('/users', (req, res) => {
  return res.json(users);
});

//rota para criar um usuario
server.post('/users', checkUserExists, (req, res) => {
  // pega o valor da varial name do corpo da requisição
  const { name } = req.body;
  
  // insere a variavel no array
  users.push(name);

  return res.json(users);
});

// rota para listar 1 usuario
server.get('/users/:index', checkUserInArray, (req, res) => {
  // pega o valor da varial index dos parametros da requisição
  const { index } = req.params;
  
  return res.json(users[index]);
});

// rota para editar um usuário existente no array
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  // pega o valor da varial index dos parametros da requisição
  const { index } = req.params;
  // pega o valor da varial name do corpo da requisição
  const { name } = req.body;
  
  users[index] = name;

  return res.json(users);
});

// tora para deletar um usuario do array
server.delete('/users/:index', checkUserInArray, (req, res) => {
  // pega o valor da varial index dos parametros da requisição
  const { index } = req.params;

  // remove um valor do array que está na posicao da variavel index
  users.splice(index,1);

  return res.json(users);
})


// direciona o servidora para a porta 3000
server.listen(3000);