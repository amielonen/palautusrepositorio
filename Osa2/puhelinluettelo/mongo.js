const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = 
'mongodb+srv://fullstack:<password>@cluster0.hdr8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name : String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: 'MongoMies',
    number: '040-020202'
})

person.save().then(response => {
    console.log('person saved!')
    mongoose.connection.close()
})