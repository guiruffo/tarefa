const express = require('express');
const server = express();
var objetos = [
    {id: 1, descricao: 'Comprar pão', finalizado: false},
    {id: 2, descricao: 'Comprar leite', finalizado: true},
];

server.use(express.json());
server.get('/objeto', function(request, response){
    return response.json(objetos);
})

server.get('/objeto/:id', function(request, response){
    const id = request.params.id;
    const objeto = objetos.filter(o => o.id == id);
    return response.json(objeto);
})

server.post('/objeto', function(request, response){
    const objeto = request.body;
    objetos.push(objeto);
    return response.status(201).send();
})
server.delete('/objeto/:id', function(request, response){
    const id = request.params.id;
    objetos = objetos.filter(o => o.id != id);
    return response.status(200).send();
})

server.put('/objeto/:id', function(request, response){
    const id = request.params.id;
    const objeto = request.body;

    objetos.forEach(o => {
        if(o.id == id) {
            o.descricao = objeto.descricao;
            o.finalizado = objeto.finalizado;
            return;
        }
    })
    return response.send();
})
server.listen(process.env.PORT || 3000);