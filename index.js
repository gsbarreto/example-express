const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const personSchema = new mongoose.Schema({
    name: String
});

const Person = mongoose.model('Person', personSchema);

app.post('/person', async (req, res) => {
    const { name } = req.body

    const newPerson = new Person({ name })

    await newPerson.save();

    return res.status(200).json({ receivedName: `Nome recebido ${name}` })
})

app.get('/person', async (req, res) => {
    const allPersons = await Person.find();

    return res.status(200).json(allPersons)
})

async function main() {
    await mongoose.connect('mongodb+srv://admin:4szXaF6fvbDIxCKs@test-database.snnar.mongodb.net/teste?retryWrites=true&w=majority')


    app.listen(3000, () => {
        console.log("Aplicação rodando na porta 3000 >>>",);
    })
}

main()


//mongodb+srv://admin:<password>@test-database.snnar.mongodb.net/?retryWrites=true&w=majority

//4szXaF6fvbDIxCKs