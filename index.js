const express = require('express')
const app = express()
const port = 5000



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://arabian:ArabianHorse60@cluster0.sqmks.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("burjAlArab").collection("bookings");
    console.log('db connect successful');
    client.close();
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port)