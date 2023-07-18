//CS0043LL Source Code template for #T AY 2022-2023
/*
	Program: Machine Problem 2
	Programmer: Rian Estrellado
	Section: AN22
	Start Date: July 17, 2023
	End Date: July 18, 2023 
*/
const express = require('express')
const router = express.Router();
const userController = require('../controllers/userControllers')
const auth = require("../auth");


router.post('/checkEmail', (req, res) => {
	userController.checkEmailExists(req.body)
	.then(resultFromController => res.send(resultFromController));
});

// route for user registration
router.post('/register', (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController))
});

// route for usr authentication
router.post('/login', (req, res) => {
	userController.loginUser(req.body)
	.then(resultFromController => res.send(resultFromController))
});

// route for retrieving user details
router.post('/details', (req,res) => {
	//provide the user's ID for the profile controller method
	userController.getProfile({userId : req.body.id})
	.then(resultFromController => res.send(resultFromController));
});

router.get("/details", auth.verify, (req,res) => {
	const userData = auth.decode(req.headers.authorization);
	userController.getProfile({userId: userData.id}).then(resultFromController => res.send(resultFromController))
})
//===============================================================
router.post('/createProduct', (req, res) => {
	userController.createProduct(req.body).then(resultFromController => res.send(resultFromController))
});
router.post('/retrieveProduct', (req, res) => {
	userController.retrieveProduct(req.body)
	.then(resultFromController => res.send(resultFromController))
});
router.post('/getProduct', (req,res) => {
	userController.getProduct({userId : req.body.id})
	.then(resultFromController => res.send(resultFromController));
});

module.exports = router;

/*
npm install bcrypt
npm install jsonwebtoken
npm install express
{
    "firstName" : "Rian"
    "lastName" : "Estrellado"
    "email" : "1@gamil.com"
    "password" : "password"
    "mobileNo" : "0123456789"
 }

 {
	"name" : "Shampoo"
	"description" : "Hair product"
	"price" : "50"
 }
*/