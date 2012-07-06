# katina for Node.js

Node module for scraping app reviews from the App Store

## Installation
`npm install katina`

## Usage
```javascript

var k = require('katina');

// list all app store country ids
console.dir(k.APPSTORE_CODES);

var app_id     = 284882215; // Your app's id here. This one is facebook's.
var country_id = 143441;    // The App Store id for the country you're interested in.  

k.getReviewsFor(app_id, country_id, 
	
	function(err,reviews){
	
		console.dir(reviews)
	
	}
);

```

* In order to find your app's id:

- Login into your iTunesConnect account [here](http://itunesconnect.apple.com/)
- Click on "Manage your Applications"
- Look for the application that you're trying to find the apple id for, then click on the link App Details for that application.
- The page will now list details of your application, next to where is says Apple ID should be a number that looks like "319597415." That is your application's Apple ID.