const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const MONGOSE_URL = "mongodb://127.0.0.1:27017/Wanderlust";

main()
    .then(()=>{
        console.log("connected DB");
    }).catch((err)=>{
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGOSE_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.send("Hy I am root path");
});

//index route....
app.get("/listings", async(req,res)=>{
    const allListings = await Listing.find({});
   res.render("Listings/index.ejs",{allListings});
});

//show route.....
app.get("/listings/:id", async(req,res)=>{
    let {id} =   req.params;
    const listing =  await Listing.findById(id);
    res.render("Listings/show.ejs",{listing});
});

// app.get("/testListing", async (req,res)=>{
//     let sampleListing = new Listing({
//        title : "My New Villa",
//        description : "By the beach",
//        price : 1200,
//        location : "Calangute, Goa",
//        country : "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successful testing");
// });

app.listen(8080,()=>{
    console.log("server connected to port 8080");
});
