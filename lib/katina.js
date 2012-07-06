// imports
var   http = require('http'),
		fs = require('fs'),
		parser = require('xml2json');

exports.APPSTORE_CODES = {
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

// This is the exported function
var getReviewsFor = function(app_id, country_id, callback) {
  
	var app_reviews = [];

	function next(page_num) {
    
	    scrapeReviews(app_id, country_id, page_num, function (err, reviews) {
	    
			if(err) {
				return callback(err, null);
			}
				
			var r = parseReviews(reviews);

			if(r == null) {
				return callback(null, app_reviews);
			}

			app_reviews.push(r);

			next(++page_num);
	    
	    });
 
  	}
  	
  	next(0);
}

exports.getReviewsFor = getReviewsFor;

var scrapeReviews = function(app_id, country_id, page_num, callback) {

	var reviews = '';

	// request headers
	var x_store_front = country_id + '-1';
	var request_headers = {
				 
		'User-Agent': 'iTunes/10.5 (Macintosh; U; Mac OS X 10.6)',
		'X-Apple-Store-Front': x_store_front

	};

	var request_path = '/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=' + app_id + '&pageNumber=' 
						+ page_num + '&sortOrdering=4&onlyLatestVersion=false&type=Purple+Software';

	var request_options = {
		
		host :'ax.phobos.apple.com.edgesuite.net',
		port: 80,
		headers: request_headers,
		path: request_path,
		method: 'GET'

	};

	// TODO: use 'request'
	// make the request
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
  				
  				callback(e,null);
			
			});	

			// response received
			res.on('end',
				function(){ 
					
					callback(null,reviews);

				}
			);
		}
	
	);

	req.end();

}

var parseReviews = function(reviews){
	
	var reviews_data = parser.toJson(reviews,{object: true});

	try {

		var num_of_reviews = reviews_data['Document']['View']['ScrollView']['VBoxView']['View']['MatrixView']
									['VBoxView'][0]['VBoxView']['VBoxView'].length;

		var page_reviews = [];
	
	} catch (err) {
		
		return null;
	}
	

	for(var i=0; i < num_of_reviews; i+=1){

    	var review = {};

    	// author
    	try {
    	
    		var review_author = reviews_data['Document']['View']['ScrollView']['VBoxView']['View']['MatrixView']
    							['VBoxView'][0]['VBoxView']['VBoxView'][i]['HBoxView'][1]['TextView']['SetFontStyle']['GotoURL']['b']; 
    		review['author'] = review_author;

    	} 
    	catch(err){

    		review['author'] = undefined;
    	
    	}

    	// review body
    	try {
    	
    		var review_body = reviews_data['Document']['View']['ScrollView']['VBoxView']['View']['MatrixView']['VBoxView'][0]
    							['VBoxView']['VBoxView'][i]['TextView']['SetFontStyle']['$t'];
    		review['review'] = review_body;

    	} catch(err) {
			
			review['review'] = undefined;
    	
    	}
    	
		// application version
		try {

    		var review_appVersion = reviews_data['Document']['View']['ScrollView']['VBoxView']['View']['MatrixView']['VBoxView'][0]
    									['VBoxView']['VBoxView'][i]['HBoxView'][1]['TextView']['SetFontStyle']['$t'];
    		review['version'] = review_appVersion.split(' ')[1].split('-')[0];

    	} catch (err) {

    		review['version'] = undefined;
    	
    	}
    	

    	// review title
    	try {

    		var review_title = reviews_data['Document']['View']['ScrollView']['VBoxView']['View']['MatrixView']['VBoxView'][0]
    							['VBoxView']['VBoxView'][i]['HBoxView'][0]['TextView']['SetFontStyle']['b'];
			review['title'] = review_title;

		} catch (err) {
			review['title'] = undefined;
		}

		// review rating
		try {

			var review_rating = reviews_data['Document']['View']['ScrollView']['VBoxView']['View']['MatrixView']['VBoxView'][0]
									['VBoxView']['VBoxView'][i]['HBoxView'][0]['HBoxView']['HBoxView'][0]['alt'];
			review['rating'] = parseInt(review_rating.split(' ')[0],10);				

		} catch (err) {

			review['rating'] = undefined;
		
		}

    	page_reviews.push(review);


    }

    return page_reviews;

}
