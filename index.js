const express = require("express");
const app = express();
const cors = require('cors');
 require('./db/db');
const userSchema = require('./db/userSchema')
const Product = require('./db/Product');
// const port = 80;
app.use(express.json());
app.use(cors());
app.post('/register',async(req,res)=>{
    let user = new userSchema(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
});

app.post('/login',async(req,res)=>{
    let user = await userSchema.findOne(req.body).select("-password");
    if(req.body.email && req.body.password){
        if(user){
            res.send(user);
        }else{
            res.send({result:"no user found"});
        }
    }else{
        res.send({result:"no user found"});
    }
   
});

app.post('/add',async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.get('/list', async (req,res)=>{
    let products = await Product.find();
    if(products.length>0){
        res.send(products);
    }else{
        res.send({result:"NO products Found"});
    }
});

app.delete('/list/:id',async (req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id});
    res.send(result);
});

app.get('/list/:id',async (req,res)=>{
    const result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send({result:"NO Product found"});
    }
});

app.put('/list/:id',async (req,res)=>{
    const result  = await Product.updateOne({_id:req.params.id},{
        $set : req.body
    });
    res.send(result);
});

app.get('/search/:key',async (req,res)=>{
    const result = await Product.find({
        "$or":[
            {name: {$regex: req.params.key}}
        ]
    });
    res.send(result);
})


app.listen(5000);