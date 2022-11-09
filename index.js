const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const { ObjectID } = require('bson');
require('dotenv').config();
const port = process.env.PORT || 5000;

// -------------------- Middle ware ------------------------
app.use(cors());
app.use(express.json())


// --------------------------Mongodb Connect-----------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fvciqgr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// -------------------------CRUD operation-------------------
async function run () {
    try{
        const reviewCollection = client.db('Bnature').collection('reviews');
        const projectCollection = client.db('Bnature').collection('project');

        app.get('/review', async (req, res) => {
        const query = {};
        const cursor = reviewCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
        })

        app.get('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id:ObjectID(id) }
            const result = await reviewCollection.findOne(query);
            res.send(result);
        })

        app.get('/projects', async (req, res) => {
            const query = {};
            const cursor = projectCollection.find(query);
            const result = await cursor.toArray();
            console.log(result)
            res.send(result);
        })
    }
    finally{

    }
}

run().catch(error => console.log(error))



app.get('/', (req, res) => {
    res.send('B-nature Server site running')
})

app.listen(port, ()=> {
    console.log(`Running this site ${port}`)
})