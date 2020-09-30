const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');


const port = 5000

const app = express()

app.use(cors());
app.use(bodyParser.json());


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://arabian:ArabianHorse60@cluster0.sqmks.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const bookings = client.db("burjAlArab").collection("bookings");
    app.post('/addBooking', (req, res) => {
        const newBooking = req.body;
        bookings.insertOne(newBooking)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
        console.log(newBooking);
    })

});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port)