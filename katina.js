// imports
var   http = require('http'),
		fs = require('fs'),
		parser = require('xml2json');




APPSTORE_CODES = {
	'Argentina':          143505,
	'Australia':          143460,
	'Belgium':            143446,
	'Brazil':             143503,
	'Canada':             143455,
	'Chile':              143483,
	'China':              143465,
	'Colombia':           143501,
	'Costa Rica':         143495,
	'Croatia':            143494,
	'Czech Republic':     143489,
	'Denmark':            143458,
	'Deutschland':        143443,
	'El Salvador':        143506,
	'Espana':             143454,
	'Finland':            143447,
	'France':             143442,
	'Greece':             143448,
	'Guatemala':          143504,
	'Hong Kong':          143463,
	'Hungary':            143482,
	'India':              143467,
	'Indonesia':          143476,
	'Ireland':            143449,
	'Israel':             143491,
	'Italia':             143450,
	'Korea':              143466,
	'Kuwait':             143493,
	'Lebanon':            143497,
	'Luxembourg':         143451,
	'Malaysia':           143473,
	'Mexico':             143468,
	'Nederland':          143452,
	'New Zealand':        143461,
	'Norway':             143457,
	'Osterreich':         143445,
	'Pakistan':           143477,
	'Panama':             143485,
	'Peru':               143507,
	'Phillipines':        143474,
	'Poland':             143478,
	'Portugal':           143453,
	'Qatar':              143498,
	'Romania':            143487,
	'Russia':             143469,
	'Saudi Arabia':       143479,
	'Schweiz/Suisse':     143459, 
	'Singapore':          143464,
	'Slovakia':           143496,
	'Slovenia':           143499,
	'South Africa':       143472,
	'Sri Lanka':          143486,
	'Sweden':             143456,
	'Taiwan':             143470,
	'Thailand':           143475,
	'Turkey':             143480,
	'United Arab Emirates'  :143481,
	'United Kingdom':     143444,
	'United States':      143441,
	'Venezuela':          143502,
	'Vietnam':            143471,
	'Japan':              143462,
	'Dominican Republic': 143508,
	'Ecuador':            143509,
	'Egypt':              143516,
	'Estonia':            143518,
	'Honduras':           143510,
	'Jamaica':            143511,
	'Kazakhstan':         143517,
	'Latvia':             143519,
	'Lithuania':          143520,
	'Macau':              143515, 
	'Malta':              143521,
	'Moldova':            143523,  
	'Nicaragua':          143512,
	'Paraguay':           143513,
	'Uruguay':            143514
};

var scrapeReviews = function(app_id, country_id, page_num) {

	var reviews = '';

	// request headers
	var x_store_front = country_id + '-1';
	var request_headers = {
				 
				 'User-Agent': 'iTunes/10.5 (Macintosh; U; Mac OS X 10.6)',
		'X-Apple-Store-Front': x_store_front

	};

	var request_path = '/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=' + app_id + '&pageNumber=' + page_num + '&sortOrdering=4&onlyLatestVersion=false&type=Purple+Software';

	var request_options = {
		
		host :'ax.phobos.apple.com.edgesuite.net',
		port: 80,
		headers: request_headers,
		path: request_path,
		method: 'GET'

	};

	var req = http.request(request_options, 
		
		// response callback
		function(res){

			res.setEncoding('utf8');

			// receiving response
			res.on('data',
				function(data){
					reviews += data;
				}
			);

			// error
			res.on('error', function(e) {
  				console.log('Error: ' + e.message);
			});	

			// response received
			res.on('end',
				function(){ 
					parseReviews(reviews); 
				}
			);


		}
	
	);

	req.end();

	
}

var parseReviews = function(reviews){
	
	fs.readFile(__dirname + '/reviews.xml', function(err, data) {
    
    	var json = parser.toJson(data,{object: true});

    	console.dir(JSON.stringify(json['Document']['View']['ScrollView']['VBoxView']['View']['MatrixView']['VBoxView'][0]['VBoxView']['VBoxView'][2]));

    });
}

//scrapeReviews(289923007,143441,0);
parseReviews();