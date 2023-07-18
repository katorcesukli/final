//CS0043LL Source Code template for #T AY 2022-2023
/*
	Program: Machine Problem 2
	Programmer: Rian Estrellado
	Section: AN22
	Start Date: July 17, 2023
	End Date: July 18, 2023 
*/

// this file store the methods for creaating jsonwbtokens
const jwt = require('jsonwebtoken');
const secret = 'bcsAN22';

module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};
	// Generate a JSON web token using the jwt's sign method
	// Generate the token using the form data and the secret code
	return jwt.sign(data, secret, {})
};

module.exports.verify = (req, res, next) => {
	module.exports.decode = (token) => {
		//token recieved and is not undefined
		if(typeof token !== "undefined"){
		//retrieves only the token and removes the "bearer prefix"
		token = token.slice(7,token.length);
		return jwt.verify(token,secret, (err,data) => {
			if(err){
				return null;
			} else {
				//the decode method is used to obtain the informatoin
				return jwt.decode(token, {complete:true}).payload;
			}
		})
		// token does not exist
		} else {
			return null;
		};
	};
}