var http = require('http');

var config = {
	id: 2813390, // dedault is Wegberg
	units: {
		metric: 'metric',
		imperial: 'imeprial'
	},
	lang: {
		de: 'de',
		en: 'en'
	},
	mode: {
		json: 'json',
		xml: 'xml'
	}
}

var reqOptions = {
  host: 'http://api.openweathermap.org',
  path: '/data/2.5/',

  getBaseUri: function() {
  	return this.host + this.path;
  }
};

var convertDegreeToDirection = function(degree) {
	/* Umrechnung der Windrichtung in Grad
	 * Nord 	    0° / 360° 	Süd 			180°
	 * Nordnordost 	22.5° 	  	Südsüdwest 		202.5°
	 * Nordost 		45° 		Südwest 		225°
	 * Ostnordost 	67.5° 		Westsüdwest 	247.5°
	 * Ost 			90° 		West			270°
	 * Ostsüdost 	112.5° 		Westnordwest 	292.5°
	 * Südost 		135° 		Nordwest 		315°
	 * Südsüdost 	157.5° 		Nordnordwest 	337.5°
	 */
	 function north2South(deg) {
	 	if(deg === 0) 			{ return 'Nord'}
		else if(deg === 22.5) 	{ return 'Nordnordost' }
		else if(deg === 45) 	{ return 'Nordost' }
		else if(deg === 65.7) 	{ return 'Ostnordost' }
		else if(deg === 90) 	{ return 'Ost' }
		else if(deg === 112.5) 	{ return 'Ostsüdost' }
		else if(deg === 135) 	{ return 'Südost' }
		else if(deg === 157.5) 	{ return 'Südsüdost' }
		else return deg;
	 }

	 function south2North(deg) {
	 	if(deg === 180) 		{ return 'Süd'  }
		else if(deg === 202.5) 	{ return 'Südsüdwest' }
		else if(deg === 225) 	{ return 'Südwest' }
		else if(deg === 247.5) 	{ return 'Südwest' }
		else if(deg === 270) 	{ return 'Westsüdwest' }
		else if(deg === 292.5) 	{ return 'West' }
		else if(deg === 315) 	{ return 'Westnordwest' }
		else if(deg === 337.5) 	{ return 'Nordwest' }
		else if(deg === 360) 	{ return 'Nordnordwest' }
		else return deg;
	 }

	 return direction = (degree >= 180) ? south2North(degree) : north2South(degree);
}


var convertMsToKmh = function(speed) {
	var KMH_FACTOR = 3.6; 
	return speed * KMH_FACTOR;
}

var doGet = function(url, callback) {
	if(url === undefined || url === null) {
		throw new error('Id is undefined');
	}
	if(!callback) {
		throw new error('Callback is undefined');
	}
	
	http.get(url, function(res) {
	  	console.log("Got response: " + res.statusCode);
	  	var data = "";
	  	res.on('data', function(chunk) {
	  	    data += chunk;
	  	});

	  	res.on('end', function() {
	  		// Parse JSON-String to Object
	  		var dataObj = JSON.parse(data);
	  	  	callback(dataObj);
	  	});

	}).on('error', function(e) {
  		console.log("Got error: " + e.message);
	});
}

var getWeather = function(id, callback) {
	if(!id) { id = config.id; } // if no id is set, use default id 
	
	var baseUri = reqOptions.getBaseUri();
	var uri = baseUri + 'weather?id=' + config.id+'&units='+config.units.metric+'&lang='+config.lang.de+'';
	
	doGet(uri, function(data) {
		// set up weather response object	
		var  weather = {
			id: data.id,
			name: data.name,
			icon: data.weather[0].icon,
			description: data.weather[0].description,
			temperature: {
				temp: data.main.temp.toFixed(1),
				tempMin: (data.main.temp_min !== undefined) ? data.main.temp_min.toFixed(1) : data.main.temp_min,
				tempMax: (data.main.temp_max !== undefined) ? data.main.temp_max.toFixed(1) : data.main.temp_max,
			},
			wind: {
				speed: convertMsToKmh(data.wind.speed).toFixed(1),
				gust: convertMsToKmh(data.wind.gust).toFixed(1),
				direction: convertDegreeToDirection(data.wind.deg)
			}
		}

		if(callback) {
			callback(weather);
		}
	});
}

var getCityList = function(city, callback) {

	var baseUri = reqOptions.getBaseUri();
	var uri = baseUri + 'find?q='+city+'&mode='+config.mode.json+'';

	doGet(uri, function(data) {
		var cityList = [];

		console.log(data);

		// extract city information of response
		if(data.list) {
			data.list.forEach(function(item, index){
				cityList.push({ 
					id: item.id, 
					name: item.name ,
					country: item.sys.country
				});
			});
		}
		
		// create object with result data
		var dataObj = {
			count: data.count,
			cities: cityList
		}
		
		if(callback) {
			callback(dataObj);
		}
	});
}

//TODO: Add error handling

//For debugging pruposes
//getWeather(function(data){console.log(data)});
//getCityList('Erkelenz', function(data){console.log(data)})
exports.getWeatherData = function(request, response) {
	console.log('getWeatherData');
	getWeather(null, function(weather){
		response.send(weather);
	});
}

exports.getWeatherDataById = function(request, response) {
	console.log('getWeatherDataById');
	getWeather(request.query.id, function(weather){
		response.send(weather);
	});
}

exports.getCityByText = function(request, response) {
	console.log('getCityByText');
	getCityList(request.query.city, function(data){
		response.send(data);
	});
}