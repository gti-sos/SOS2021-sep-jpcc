// Variables necesarias por database - anxiety_stats

var path = require("path");
var Datastore = require("nedb");

//Database Generada - anxiety_stats

var BASE_API_PATH = "/api/v1";
var datafile = path.join(__dirname, 'anxiety_stats.db');
var db = new Datastore({ filename: datafile, autoload: true });
var anxiety_stats_data = [];

//var anxiety_stats = db.getAllData();

// API_REST de anxiety -> Jose Pablo Carrasco (@EsDeSepa)

module.exports.register = (app, BASE_API_PATH) => { // M I L E S T O N E  Nº 5


	//--------------------------------- M I L E S T O N E Nº 6 (F06) ------------------------------------------------



	app.get(BASE_API_PATH + "/anxiety_stats/loadInitialData", (req, res) => {
		anxiety_stats_data = [
			{
				"country": 'Spain_Andalucia',
				"year": 2017,
				"anxiety_men": 4.92,
				"anxiety_women": 9.84,
				"anxiety_population": 7.43
			},
			{
				"country": 'Spain_Madrid',
				"year": 2017,
				"anxiety_men": 2.49,
				"anxiety_women": 5.42,
				"anxiety_population": 4.03
			}
		];

		db.find({ $or: [{ country: "Spain_Andalucia" }, { country: "Spain_Madrid" }] }, { _id: 0 }, function (err, data) {
			if (err) {
				console.error("ERROR accesing DB in GET");
				res.sendStatus(500);
			} else {
				if (data.length == 0) {
					db.insert(anxiety_stats_data);
					console.log(`Loaded initial data: <${JSON.stringify(anxiety_stats_data, null, 2)}>`);
					res.sendStatus(201);
				} else {
					console.error(`initial data already exists`);
					res.sendStatus(409);
				}
			}
		});


	});

	//

	// 6.1 GET a la lista de recursos (p.e. “/api/v1/stats”) devuelve una lista con todos los recursos (un array de objetos en JSON)

	app.get(BASE_API_PATH + "/anxiety_stats", (req, res) => {

		var query = req.query;

		//Aquí se obtienen offset y limit con query, si son null, le hacemos un delete y listo.
		var limit = parseInt(query.limit);
		var offset = parseInt(query.offset);

		//Deleteamos los offset y limit.
		delete query.offset;
		delete query.limit;

		//Parseamos el año a Integer, mis otras 3 propiedades numéricas también son necesarias.
		if (query.hasOwnProperty("year")) {
			query.year = parseInt(query.year);
			console.log(query.year);
		}
		if (query.hasOwnProperty("anxiety_men")) {
			query.anxiety_men = parseFloat(query.anxiety_men);
			console.log(query.anxiety_men);
		}
		if (query.hasOwnProperty("anxiety_women")) {
			query.anxiety_women = parseFloat(query.anxiety_women);
			console.log(query.anxiety_women);
		}
		if (query.hasOwnProperty("anxiety_population")) {
			query.anxiety_population = parseFloat(query.anxiety_population);
			console.log(query.anxiety_population);
		}

		console.log(query);

		db.find(query).skip(offset).limit(limit).exec((error, anxiety_stats) => {
			anxiety_stats.forEach((n) => {
				delete n._id;
			});

			if (anxiety_stats.length < 0) {
				res.sendStatus(400, "Bad request");
				console.log("Requested data is INVALID");
			}
			else {
				res.send(JSON.stringify(anxiety_stats, null, 2));
				console.log("Data sent:" + JSON.stringify(anxiety_stats, null, 2));

			}
		});

	});

	//6.2 POST a la lista de recursos (p.e. “/api/v1/stats”) crea un nuevo recurso.

	app.post(BASE_API_PATH + "/anxiety_stats", (req, res) => {

		var data = req.body; // Objeto entero - Si quiero acceder a algo concreto con el .name.
		var country = req.body.country;
		var year = req.body.year;

		db.find({ "country": country, "year": year }).exec((error, anxiety_stats) => {
			if (anxiety_stats.length > 0) {
				res.sendStatus(409);
				console.log("There's an object with those primary keys");
				return;
			}
			if ((data == null)
				|| (data.country == null)
				|| (data.year == null)
				|| (data.anxiety_men == null)
				|| (data.anxiety_women == null)
				|| (data.anxiety_population == null)
				|| ((Object.keys(data).length != 5))) {

				res.sendStatus(400, "Falta uno o más campos");
				console.log(data);
				console.log("POST not created");
				return;
			}
			db.insert(data);

			res.sendStatus(201, "Post created");
			console.log(JSON.stringify(data, null, 2));
		});
		/*var data = req.body;
		anxiety_stats_data.push(data);
		console.log(`new data pushed: <${JSON.stringify(anxiety_stats_data, null, 2)}>`);
		res.sendStatus(201);*/
	});

	// POST Alternativo para añadir - 6.2 - anxiety_stats //M I L E S T O N E Fº 4

	/*{
		"country": "Spain_Galicia",
		"year": 2017,
		"anxiety_men": 5.99,
		"anxiety_women": 14.35,
		"anxiety_population": 10.35
	}*/


	//6.3 GET a un recurso (p.e. “/api/v1/stats/sevilla/2013”) devuelve ese recurso (un objeto en JSON) .

	app.get(BASE_API_PATH + "/anxiety_stats/:country/:year", (req, res) => {

		var country = req.params.country; //Pillar el contenido después de los dos puntos.
		var year = parseInt(req.params.year);

		db.find({ "country": country, "year": year }).exec((err, param) => {
			if (param.length == 1) {
				delete param[0]._id;

				res.send(JSON.stringify(param[0], null, 2));
				console.log("/GET - Recurso Específico /country/year: " + JSON.stringify(param[0]), null, 2);
			}
			else {
				res.sendStatus(404, "Not found");
			}
		});

		/*var country = req.params.country;
		var year = parseInt(req.params.year);

		console.log(`GET stat by country: <${country}> and year: <${year}>`);
		for (var stat of anxiety_stats_data) {
			if (stat.country === country && stat.year === year) {
				return res.status(200).json(stat);
			}
		}

		return res.sendStatus(404); */
	});

	//6.4 DELETE a un recurso (p.e. “/api/v1/stats/sevilla/2013”) borra ese recurso (un objeto en JSON).

	app.delete(BASE_API_PATH + "/anxiety_stats/:country/:year", (req, res) => {

		var country = req.params.country; //Pillar el contenido después de los dos puntos.
		var year = parseInt(req.params.year);

		db.remove({ "country": country, "year": year }, { multi: true }, (err, paramsDeleted) => {
			if (paramsDeleted == 0) {
				res.sendStatus(404, "Not found");
			}
			else {
				res.sendStatus(200);
			}
		});

		/*var country = req.params.country;
		var year = parseInt(req.params.year);

		console.log(`DELETE by country <${country}> and year: <${year}>`);

		for (var i = 0; i < anxiety_stats_data.length; i++) {
			if (anxiety_stats_data[i]["country"] === country && anxiety_stats_data[i]["year"] === year) {
				anxiety_stats_data.splice(i, 1);
				return res.sendStatus(200);
			}
		}

		return res.sendStatus(404);*/
	});

	//6.5 PUT a un recurso (p.e. “/api/v1/stats/sevilla/2013”) actualiza ese recurso. 

	app.put(BASE_API_PATH + "/anxiety_stats/:country/:year", (req, res) => {

		var countryData = req.params.country; //Pillar el contenido después de los dos puntos.
		var countryD = req.body.country;

		var yearData = parseInt(req.params.year);
		var yearD = parseInt(req.body.year);

		var body = req.body;

		if (countryData != countryD || yearData != yearD) {
			res.sendStatus(409);
			console.warn("There is a conflict!");
		}
		else {
			db.update({ "country": countryData, "year": yearData }, body, (err, paramsUpdated) => {
				if (paramsUpdated == 0) {
					res.sendStatus(404, "Not found");
				}
				else {
					res.sendStatus(200);
					console.log("PUT Correcto");
				}
			});
		}
	});

	/*var country = req.params.country;
	var year = parseInt(req.params.year);
	var newDataAnxiety = req.body;

	console.log(`PUT ${newDataAnxiety.country} OVER ${country} `);
	console.log(`PUT ${newDataAnxiety.year} OVER ${year} `);

	if (anxiety_stats_data.length == 0) {
		console.log("No Valido")
		return res.sendStatus(404);
	} else {
		for (var i = 0; i < anxiety_stats_data.length; i++) {
			var stat = anxiety_stats_data[i];
			if (stat.country === country && stat.year === year) {
				anxiety_stats_data[i] = newDataAnxiety;
				return res.send('PUT success');
			}
		}
	}
});*/

	//6.6 POST a un recurso (p.e. “/api/v1/stats/sevilla/2013”) debe dar un error de método no permitido.

	app.post(BASE_API_PATH + "/anxiety_stats/:country/:date", (req, res) => {
		console.log("POST no valido/encontrado");
		return res.sendStatus(405);

	});

	//6.7 PUT a la lista de recursos (p.e. “/api/v1/stats”) debe dar un error de método no permitido.

	app.put(BASE_API_PATH + "/anxiety_stats", (req, res) => {
		console.log("PUT no valido/encontrado");
		return res.sendStatus(405);

	});

	//6.8 DELETE a la lista de recursos (p.e. “/api/v1/stats”) borra todos los recursos

	app.delete(BASE_API_PATH + "/anxiety_stats", (req, res) => {
		db.remove({}, { multi: true }, (error, anxiety_stats_deleted) => {
			console.log(anxiety_stats_deleted + " anxiety_stats deleted");
		});
		res.sendStatus(200, "OK");

	})

};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------

