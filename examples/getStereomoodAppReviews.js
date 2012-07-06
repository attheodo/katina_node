var k = require('katina');

// list all app store ids
console.dir(k.APPSTORE_CODES);

<<<<<<< HEAD
// Stereomoods app id is: 524634435
=======
// Stereomood's app id is: 524634435
>>>>>>> fbbe41949cc8fa2f0c08d113c34c6a3a941a0b8a
// United States' App Store id: 143441
//
k.getReviewsFor(524634435, 143441, 
	
	function(err,reviews){
	
		console.dir(reviews)
	
	}
);