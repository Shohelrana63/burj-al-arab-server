const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const port = 5000

const app = express()

app.use(cors());
app.use(bodyParser.json());


var serviceAccount = require("./burj-al-arab-master-firebase-adminsdk-xp7pk-b1fa0bb74a.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://burj-al-arab-master.firebaseio.com"
});



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

    app.get('/bookings', (req, res) => {
        const bearer = req.headers.authorization;
        if (bearer && bearer.startsWith('Bearer ')) {
            const idToken = bearer.split(' ')[1];
            console.log({ idToken });
            admin.auth().verifyIdToken(idToken)
                .then(function (decodedToken) {
                    const tokenEmail = decodedToken.email;
                    const queryEmail = req.query.email;
                    console.log(tokenEmail, queryEmail);
                    if (tokenEmail == req.query.email) {
                        bookings.find({ email: req.query.email })
                            .toArray((err, documents) => {
                                res.send(documents);
                            })
                    }

                    console.log({ uid });
                    // ...
                }).catch(function (error) {
                    // Handle error
                });
        }





    })

});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port)