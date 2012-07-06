# katina for Node.js

Node module for scraping app reviews from the App Store

## Installation
Katina is available via the npm packet manager. 
In order to install katina as a module, open your terminal and type in:
`npm install katina`

## Usage
```javascript

var k = require('katina');

// list all app store country ids
console.dir(k.APPSTORE_CODES);

var app_id     = 524634435; // Your app's id here. This one is for the Steremood app.
var country_id = 143441;    // The App Store id for the country you're interested in.  

k.getReviewsFor(app_id, country_id, 
	
	// callback
	function(err,reviews){
	
		console.dir(reviews)
	
	}
);

```

In order to find your app's id:

   1. Login into your iTunesConnect account [here](http://itunesconnect.apple.com/)
   2. Click on "Manage your Applications"
   3. Look for the application that you're trying to find the apple id for, then click on the link App Details for that application.
   4. The page will now list details of your application, next to where is says Apple ID should be a number that looks like "319597415." That is your application's Apple ID.