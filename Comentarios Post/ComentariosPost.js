var express 	= 	require("express"),
	app			= 	express(), 
	puerto 		= 	8081, 
	bodyParser 	= 	require('body-parser'), 
	MongoClient = 	require("mongodb").MongoClient, coleccion;

//Para indicar que se envía y recibe información por medio de Json...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Datos de prueba...
var mensajes = [
				{
					id 			: 	1, 
					nombre		: 	"Serj",
					mensaje 	:  
					fecha  		:  	 
					Hora		:
						},
				{
					id 			: 	2, 
					nombre		: 	"",
					mensaje 	: 	"Andres"
					fecha  		:  	 
					Hora		: 
				},
				{
					id 			: 	3, 
					nombre		: 	"",
					mensaje 	: 	"Karen" 
					fecha  		:  	 
					Hora		:
				}
				{
					id 			: 	4, 
					nombre		: 	"",
					mensaje 	: 	"Alexandra" 
					fecha  		:  	 
					Hora		:
				}

				];

var Comentarios = [
				{   nombre		:"Grohl", 
					comentario  :"Nirvana",
					like		: 0,
					idcomentario: 1,
				},

				{   nombre		:"Jerry", 
					comentario  :"Alice in Chains",
					like		: 0,
					idcomentario: 2,
				},

				{   nombre		:"Gossard", 
					comentario  :"Pearl Jam",
					like		: 0,
					idcomentario: 3,
				},

				{   nombre		:"Matt", 
					comentario  :"Soundgarden",
					like		: 0,
					idcomentario: 4,
				},


				];


//Servicios REST...
app.get('/updateLike/:id', function(req, res)
{
	res.json(actualizarLikes);   
});


app.post('/createComentarios', function (req, res)
{
	res.json(crearComentarios(req.body));
});


app.get('/getAllMensajes', function(req, res)
{
	res.json(mensajes);   
});

app.post('/createMensaje', function (req, res)
{
	res.json(crearMensaje(req.body));
});

app.get('/getAllData', function(req, res)
{
	res.json(Comentarios);   
});

app.post('/createData', function (req, res)
{
	res.json(crearEditarUsuario(req.body, 1));
});

app.put('/updateData', function (req, res)
{
	res.json(crearEditarUsuario(req.body, 2));
});

app.delete('/deleteData/:id', function(req, res)
{
	var ind = buscarIDUser(req.param("id"));
	if(ind >= 0)
	{
		objeto.splice(ind, 1);
	}
	res.json({status : ind >= 0 ? true : false});
});

app.get('/getData/:id', function(req, res)
{
	var ind = buscarIDUser(req.param("id"));
	var devuelve = {datos : ind >= 0 ? objeto[ind] : "", status : ind >= 0 ? true : false};
	res.json(devuelve);
});

//Para cualquier url que no cumpla la condición...
app.get("*", function(req, res)
{
	res.status(404).send("Página no encontrada :( en el momento");
});

var crearMensaje = function(data){

	mensajes.push(data);
	mensajes[mensajes.length - 1].id = mensajes.length;

	return {Estado : "CreadoMensaje"};
}

//Crear o edita un usuario...
var crearComentarios = function(data, tipo)
{
	var idedita = tipo === 1 ? 0 : data.id;
	var existe = userExiste(data.identifi, data.email, idedita);
	if(!existe)
	{
		if(tipo === 1)
		{
			objeto.push(data);
			objeto[objeto.length - 1].id = objeto.length;
			idedita = objeto[objeto.length - 1].id;
		}
		else
		{
			objeto[buscarIDUser(idedita)] = data;
		}
	}
	return {id : !existe ? idedita : 0, status : !existe};
}

//Busca la posición del usuario en el array...
var buscarIDUser = function(id)
{
	var ind = -1;
	for(var i = 0; i < objeto.length; i++)
	{
		if(Number(objeto[i].id) === Number(id))
		{
			ind = i;
			break;
		}
	}
	return ind;
};

//Para saber si un usuario ya existe...
var userExiste = function(identifica, email, ind)
{
	var existe = false;
	for(var i = 0; i < objeto.length; i++)
	{
		if(identifica === objeto[i].identifi || email.toLowerCase() === objeto[i].email.toLowerCase())
		{
			if(Number(objeto[i].id) !== Number(ind))
			{
				existe = true;
				break;
			}
		}
	}
	return existe;
};
var idcomentario = function(idcomentario)
{
	var query = {idcomentario : Number(req.param("id"))};
	var incrementa = {$inc : {"like" : 1}};
	coleccion.update(query, incrementa, function(err, actualiza)
	{
		var cursor = coleccion.find(query, {"_id" : false, "like" : true});
		cursor.toArray(function(err, doc)
		{
			res.json(doc);
		});
	});
});

var actualizarLikes = function(actualizarLikes)
{
	var data = req.body;
	coleccion.count(function(err, count)
	{
		data.idcomentario = count + 1;
		data.like = 0;
		coleccion.insert(data, function(err, records)
		{
			res.json({status : true});
		});
	});
});

app.get("*", function(req, res)
{
	res.status(404).send("Página no encontrada :( en el momento");
});

app.listen(puerto);
console.log("Express server iniciado en el " + puerto);