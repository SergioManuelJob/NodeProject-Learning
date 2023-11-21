const mongoose = require('mongoose')
const app = require('./app')
const port = 3000
const urlMongoDb = "mongodb+srv://admin:adminn123456@sergiodb.xgpgc2o.mongodb.net/?retryWrites=true&w=majority"

mongoose
  .connect(urlMongoDb)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    }) 
  })
  .catch((err) => {
    console.log(err);
  });

