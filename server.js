/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Ho Jun Hwang Student ID: 112384169 Date: 2020/09/25
* Heroku Link: _______________________________________________________________
*
********************************************************************************/ 
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataService = require("./modules/data-service.js");

const myData = dataService("mongodb+srv://dbUser:ghwns211@cluster0.vor5b.mongodb.net/sample_supplies?retryWrites=true&w=majority");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 8080;

// ************* API Routes


app.get("/", (req, res) =>{
    res.send("home");
})

// POST /api/sales (NOTE: This route must read the contents of the request body)
app.post("/api/sales", (req, res) => {
    myData.addNewSale(req.body).then(()=>{
        res.send("SUCCESS!!!!!!!!!"+ "<br/>" + val);
    }).catch((err)=>{
        res.send("fail");
      });
  });


// GET /api/sales (NOTE: This route must accept the numeric query parameters "page" and "perPage", ie: /api/sales?page=1&perPage=5 )
app.get("/api/sales", (req, res) =>{
    myData.getAllSales(req.query.page, req.query.perPage)
    .then((val)=>{res.send("SUCCESS!!!!!!!!!"+ "<br/>" + val);})
    .catch((val)=>{throw val})
})


// GET /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.get("/api/sales/:id", (req, res) =>{
    myData.getSaleById(req.params.id)
    .then(function(val){res.send("SUCCESS!!!!!!!!!"+ "<br/>" + val);
    })
    .catch((err) => {res.send(err)})
})


// PUT /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8 as well as read the contents of the request body)
app.put("/api/sales/:id", (req, res) =>{
    myData.updateSaleById(req.params.id).then((val)=>{
        res.send("SUCCESS!!!!!!!!!"+ "<br/>" + val);
    }).catch((err)=>{
        res.send(err);
      });
})


// DELETE /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.delete("/api/sales/:id", (req, res) =>{
    myData.deleteSaleById(req.params.id).then((val)=>{
        res.send("SUCCESS!!!!!!!!!"+ "<br/>" + val);
    }).catch((err)=>{
        res.send(err);
      });

})

// ************* Initialize the Service & Start the Server

myData.initialize().then(()=>{
    app.listen(HTTP_PORT,()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

