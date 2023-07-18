//CS0043LL Source Code template for #T AY 2022-2023
/*
	Program: Machine Problem 2
	Programmer: Rian Estrellado
	Section: AN22
	Start Date: July 17, 2023
	End Date: July 18, 2023 
*/

const User = require('../models/Course');
const bcrypt = require('bcrypt');
const auth = require('../auth');
const Product = require('../models/Course');


/*
	Check if the email is already exists
	Steps:
		- use mongoose 'find' method to find duplicate emails
		- use the 'then' method to send a response back to the frontend application based on the result
*/

module.exports.checkEmailExists = (reqBody) => {
	// the result is sent back to the front-end via the 'then' method found in the routes folder
	return User.find({email: reqBody.email})
		.then(result => {
			// the find method returns a record if a match is found
			if(result.length > 8) {
				return true
				// no duplication email found
				// the user is not yet registered in the database
			} else {
				return false;
			};
		})
};


/*
	User registration
		1. Create a new User object using mongoose model and the information from request body
		2. Make sure that the password is encrypted
		3. Save the new User to the database
*/

module.exports.registerUser = (reqBody) => {
	// create a variable 'newUser' and instantiates a new "user" object using mongoose model
	// user the information from the request body to provide the necessary information

	let newUser = new User ({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		mobileNo: reqBody.mobileNo,
		// 10 is the value provided as the number of "salt" rounds that the bcrypt algorithm will run in order to encrypt the password 
		password: bcrypt.hashSync(reqBody.password, 10)
	});
	return newUser.save().then((user, error) => {
		// user registration failed
		if(error){
			return false;
			// user registration successful
		} else {
			return true;
		};
	});
};

// bcrypt package is one of the many packages that we can use to encrypt information but it is not commonly recommended because of how simple the algorithm for creating encrypted password which have been decoded by hackers

/* json web tokens (jwt) are a way to securely transmit information between two parties/application, commonly used in web applications and APIs - digital passport that contains important information about a user or a request
	- three parts
		- header
			- the header consist of two part
				- JWT
				- signing algorithm used to create a signaturee
			- payload
				- actual information stored. It contains claims or statements about user or request
			- signature
				- is a cryptographic hash of the header, payload and secret key
				- secret key is known only by the server that issues token -- digital fingerprint of the token
*/

/*
	Steps:
	1. Check the database if the user email exists
	2. Compare the password provided in the login from which the password stored in the database
	3. Gerate/return a json web token if the user is successfully logged in and return false if not
*/

module.exports.createProduct = (reqBody) => {

	let newProduct = new Product ({
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price,
	});
	return newProduct.save().then((product, error) => {
		// user registration failed
		if(error){
			return false;
			// user registration successful
		} else {
			return true;
		};
	});
};

//===============================================================
module.exports.loginUser = (reqBody) => {
	//findOne method returns the first recorded in the collection that matched the search criteria
	return User.findOne({email : reqBody.email}).then(result => {
		if(result == null){
			return false;
		} else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
			// compareSync method is used to compare a non encrypted password from the login form to the encrypted password retrieved from the database and returns 'true/false' value depending on the result
			if(isPasswordCorrect){
				//if the password match/result --> generate access token
				return { access : auth.createAccessToken(result)}
			} else {
				return false;
			};
		};
	});
};

/*
	- find the document in the database using the user's id
	- reassing the password of the returned document to an empty string
	- return the result back
*/

module.exports.retrieveProduct = (reqBody) => {
	//findOne method returns the first recorded in the collection that matched the search criteria
	return User.findOne({name : reqBody.name}).then(result => {
		if(result == null){
			return false;
		} else {
			const isProductCorrect = bcrypt.compareSync(reqBody.name, result.name);
			// compareSync method is used to compare a non encrypted password from the login form to the encrypted password retrieved from the database and returns 'true/false' value depending on the result
			if(isProductCorrect){
				//if the password match/result --> generate access token
				return { access : auth.createAccessToken(result)}
			} else {
				return false;
			};
		};
	});
};

//====================================================================
module.exports.getProfile = (data) => {
	return User.findById(data.userId).then(result => {
		result.password = "";

		return result;
	});
};
//================================================================
module.exports.getProduct = (data) => {
	return Product.findById(data.name).then(result => {
		result.name = "";

		return result;
	});
};