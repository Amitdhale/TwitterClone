const express = require('express');
const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const cors = require('cors');
const stripe = require('stripe')("sk_test_51PSsvjKPj8Vp4D5AjqaJLkonG5wWze2nChiqh7YUzLG7P1Ymtd8qrakVuzAwWrHsp1Lodb4VFbams3xmeVl0QjLi00hqTqqoeH");
const {v4: uuidv4} = require('uuid');
// const str = require('stripe');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri =  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vcfuvwq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try{
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const postCollection = client.db("database").collection("posts");
    const userCollection = client.db("database").collection("users");
    const premiumCollection = client.db("database").collection("premium");

    // Set up your Express routes here
    app.get("/post", async (req, res) => {
      const posts = (await postCollection.find().toArray()).reverse();
      res.send(posts);
    });

    app.get("/user", async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    app.get("/preminum", async (req, res) => {
      const preminums = await premiumCollection.find().toArray();
      res.send(preminums);
    });
    app.get("/loggedInUser",async (req,res)=>{
      const email = req.query.email;
      const user = await userCollection.find({email}).toArray();
      res.send(user);
    })

    app.get("/userPost",async (req,res)=>{
      const email = req.query.email;
      const post = (await postCollection.find({email:email}).toArray()).reverse();
      res.send(post);
    })

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post);
      res.send(result);
    });

    app.post("/register",async (req,res)=>{
      const user = req.body;
      user.maxtweetlimit = 1;
      const result = await userCollection.insertOne(user);
      res.send(result);

    })

    

    app.patch("/userUpdates/:email",async (req,res)=>{
      const filter = req.params;
      const profile = req.body;
      const option = {upsert:true}
      const updateDoc = {$set:profile};
      const result = await userCollection.updateOne(filter,updateDoc,option);
      res.send(result);
    })

  

    app.post("/payment", async (req, res) => {
      const { planid, email, token } = req.body;
      // console.log(planid);
      // console.log(email);
  
      const idempotencyKey = uuidv4();
  
      try {
        const plan = await premiumCollection.findOne({ _id: new ObjectId(planid) });
        if (!plan) {
          return res.status(404).send('Plan not found');
        }
  
        const customer = await stripe.customers.create({
          email: token.email,
          source: token.id,
        });
  
        const charge = await stripe.charges.create({
          amount: plan.price * 100,
          currency: 'inr',
          customer: customer.id,
          receipt_email: token.email,
        }, {
          idempotencyKey: idempotencyKey,
        });

        const updateResult = await userCollection.updateOne(
          { email: email }, // Assuming email is a unique identifier for users
          { $set: { post_limit: plan.no_of_post } }
        );
  
        res.json(charge);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });
  
    
    

  }catch(err){
    console.log(err);

  }


    

  }
      



// Start the server and connect to MongoDB
run().catch(console.dir);

// Ensure client is closed when the server stops
process.on('SIGINT', async () => {
  await client.close();
  process.exit(0);
});



app.get("/",(req,res)=>{
    res.send("Hello from Twitter ");
})
app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
})