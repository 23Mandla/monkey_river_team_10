const mongoose = require('mongoose');
const express = require('express');
const app = require('../app/API/UserAPI'); 


(async function dbconnection() {
    try {
        await mongoose.connect("mongodb://localhost:27017/Spha");
        console.log("Database connected");
    } catch(err){
        console.log(err)
        throw err;
    }
})()


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
