const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 8080;
const { API_VERSION, IP_SERVER, PORT_DB } = require('./config');
const NewsController = require('./controllers/news');

mongoose.connect(`mongodb://${IP_SERVER}:${PORT_DB}/hackernews`, 
{ useNewUrlParser: true, useUnifiedTopology: true }, 
(err, res) => {
    if(err) {
        throw err;
    } else {
        NewsController.updateNews();
        console.log('The conection with the DB has been stablished succesfully and the data has been updated');

        app.listen(port, () => {
            console.log('#######################')
            console.log('####### API REST ######')
            console.log('#######################')
            console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`)
        })
    }
});