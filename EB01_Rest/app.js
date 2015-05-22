var express = 	require("express"),
	app		= 	express()
	puerto 	= 	8081, 
	bodyParser 	= require('body-parser');

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

var usuarios = [
				{
					id 			: 	1, 
					nombre 		: 	"Kurt", 
					apellido	: 	"Cobain", 
					foto		:   "http://www.librarising.com/astrology/celebs/images2/KL/kurtcobain.jpg"
				},
					{
					id 			: 	2, 
					nombre 		: 	"Wayne", 
					apellido	: 	"Rooney", 
					foto		:   "http://echomon.co.uk/wp-content/uploads/2013/07/Wayne-Rooney-Nike-Wallpaper.jpg"
				},
					{
					id 			: 	3, 
					nombre 		: 	"Chino", 
					apellido	: 	"Moreno", 
					foto		:   "http://fc05.deviantart.net/fs70/f/2010/293/e/f/deftones_chino_moreno_be_quiet_by_ink2paper916-d3164j0.jpg"
				},];


//Servicios REST...
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
	res.json(usuarios);   
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
var crearEditarUsuario = function(data, tipo)
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

app.listen(puerto);
console.log("Express server iniciado en el " + puerto);