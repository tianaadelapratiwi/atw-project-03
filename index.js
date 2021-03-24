const express = require('express')
const userRouter = require('./router/users')
const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var myLogger = function (request, response, next) {
  console.log('LOGGED')
  next()
}

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Tiana_Adela_Pratiwi', {useNewUrlParser: true, useUnifiedTopology: true})


app.use(myLogger)

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', function(request, response) {
	const kelas = {
		id: 1,
		nama: 'Javascript'
	}

	// console.log('Hello Word!')
	response.render('pages/index' , {kelas: kelas})
})

app.get('/about', function(request, response){
	response.render('pages/about')
})

app.use(userRouter)

app.listen(3000, function() {
	console.log('server is okay')