//CS0043LL Source Code template for #T AY 2022-2023
/*
	Program: Machine Problem 2
	Programmer: Rian Estrellado
	Section: AN22
	Start Date: July 17, 2023
	End Date: July 18, 2023 
*/

// load express for our back-end
const express = require('express')
const mongoose = require('mongoose')
// this allows to control the app's Cross origin resource Sharing
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');


const app = express();
// we create an app variable that store results of the express function that initialize our express apllication and allow us to access different methods that will make back-end creation easy

mongoose.connect("mongodb+srv://4dm1n12345:4dm1n12345@sandbox.qawwvbl.mongodb.net/an22_sample_database?retryWrites=true&w=majority",{
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

// allows all resource
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// define the /users string to be included for all users routes defined in the 'users' routes file
app.use('/user', userRoutes);
//app.use('/product', userRoutes);

app.listen(process.env.PORT || 4000, () => { 
	console.log(`Server is running localhost: ${ process.env.PORT || 4000}`)
})