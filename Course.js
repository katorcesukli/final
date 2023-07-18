//CS0043LL Source Code template for #T AY 2022-2023
/*
	Program: Machine Problem 2
	Programmer: Rian Estrellado
	Section: AN22
	Start Date: July 17, 2023
	End Date: July 18, 2023 
*/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName : {
		type : String,
		required : [true, "First name is required"]
	},
	lastName : {
		type : String,
		required : [true, "Last name is required"]
	},
	email : {
		type : String, 
		required : [true, "Email is required"]
	},
	password : {
		type : String,
		required : [true, "Password is required"]
	},
	isAdmin : {
		type : Boolean,
		default : false
	},
	mobileNo : {
		type : String, 
		required : [true, "Mobile No is required"]
	},
	// The "enrollments" property/field will be an array of objects containing the course IDs, the date and time that the user enrolled to the course and the status that indicates if the user is currently enrolled to a course
	enrollments : [
		{
			courseId : {
				type : String,
				required : [true, "Course ID is required"]
			},
			enrolledOn : {
				type : Date,
				default : new Date()
			},
			status : {
				type : String,
				default : "Enrolled"
			}
		}
	]
})

module.exports = mongoose.model("User", userSchema);
//===================================================================
const productSchema = new mongoose.Schema({
	name : {
		type : String,
		required : [true, "Name is required"]
	},
	description : {
		type : String,
		required : [true, "Description is required"]
	},
	price : {
		type : Number, 
		required : [true, "Price is required"]
	},
	isActive : {
		type : Boolean,
		default : false
	},
	createdOn : {
		type : Date, 
		required : [true, "Date is required"],
		default : new Date()
	},
	userOrders : [
		{
			userId : {
				type : String,
				required : [true, "User ID is required"]
			},
			orderId : {
				type : String,
				default : new Date()
			}
			
		}
	]
})

module.exports = mongoose.model("Product", productSchema);