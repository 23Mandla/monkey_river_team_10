const express = require('express');
const app = require('../API/UserAPI'); 
const dbconnection = require('../app/utils/dbconnection');


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
