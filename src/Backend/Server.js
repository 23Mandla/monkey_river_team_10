const express = require('express');
const app = require('../app/API/UserAPI'); 
const dbconnection = require('../app/utils/dbconnection');


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
