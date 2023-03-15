const express = require('express');
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.90qadcl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async() =>{

    try{
        const productsCollection = client.db('Moon_Tech').collection('products');


        // Get all products
        app.get('/products', async(req,res) =>{
            const query = {};
            const result = await productsCollection.find(query).toArray();


            res.send(result);
        })

        // Add products
        app.post('/product', async (req, res) => {
            const product = req.body;

            const result = await productsCollection.insertOne(product);
            res.send(result);
        })

        // Delete products
        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;

            const result = await productsCollection.deleteOne({_id: ObjectId(id)});

            res.send(result);
        })

    }finally{

    }
}

run().catch(e => console.log(e));









app.get('/', (req,res) =>{
    res.send('Moon tech server is running')
});



app.listen(port, () =>{
    console.log( `Moon tech server is running is on port ${port}`);
})