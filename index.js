var express = require("express");

var path = require("path");

var cors = require("cors");

var request = require("request");

var bodyParser = require("body-parser"); // M I L E S T O N E Nº 4

var BASE_API_PATH = "/api/v1"; // M I L E S T O N E Nº 4

var BASE_API_PATH_v2 = "/api/v2"; //M I L E S T O N E Nº 10

var app = express();

var port = (process.env.PORT || 10000);

app.use(bodyParser.json());

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.use(cors());

//-------------------------------- INTEGRACIONES -----------------------------------------------------

//INTEGRACIONES - PROXYS - JOSE PABLO CARRASCO COBOS
//Api Compañeros SOS - G04 - illiteracy_stats
var pathIlliteracy='/api/v1/illiteracy';
var apiServerHostIlliteracy = "https://sos2021-04.herokuapp.com";
 
app.use(pathIlliteracy, function(req, res) {
  var url = apiServerHostIlliteracy + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

var pathIlliteracyLID='/api/v1/illiteracy/loadInitialData';
var apiServerHostIlliteracyLID = "https://sos2021-04.herokuapp.com";
 
app.use(pathIlliteracyLID, function(req, res) {
  var url = apiServerHostIlliteracyLID + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//Apis Externas
//NBA (proviene de RapidApis)
var pathNba = '/games?per_page=25&page=0';
var apiServerHostNba = "https://free-nba.p.rapidapi.com";

app.use(pathNba, function (req, res) {
  var url = apiServerHostNba + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//Games (proviene de RapidApis)
var pathGames = '/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc';
var apiServerHostGames = "https://free-to-play-games-database.p.rapidapi.com";

app.use(pathGames, function (req, res) {
  var url = apiServerHostGames + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//--------------------------------- M I L E S T O N E D03 ------------------------------------------------

// BACK_API_REST de anxiety -> Jose Pablo Carrasco (@EsDeSepa)

var anxiety_stats_api = require("./src/back/anxiety_stats_API/v2"); // M I L E S T O N E Nº 5

anxiety_stats_api.register(app, BASE_API_PATH_v2); // M I L E S T O N E Nº 5

//--------------------------------- M I L E S T O N E D03 ------------------------------------------------

var anxiety_stats_api_INT = require("./src/back/anxiety_stats_API/integration");

anxiety_stats_api_INT.register(app, "/api/integration");

// App Listen (para todas las peticiones)

console.log("iniciando servidor");

app.listen(port, () => {
  console.log("Server ready listening on port " + port);
})