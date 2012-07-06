var k = require('katina');

// list all app store ids
console.dir(k.APPSTORE_CODES);

// facebook's app id is: 284882215
// United States' App Store id: 143441
//
k.getReviewsFor(284882215, 143441, 
	
	function(err,reviews){
	
		console.dir(reviews)
	
	}
);