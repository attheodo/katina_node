var k = require('katina');

// list all app store ids
console.dir(k.APPSTORE_CODES);


// Stereomoods app id is: 524634435

// Stereomood's app id is: 524634435
// United States' App Store id: 143441
//
k.getReviewsFor(524634435, 143441, 
	
	function(err,reviews){
	
		console.dir(reviews)
	
	}
);