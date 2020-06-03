const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DelnewsSchema = Schema({
    id: String,
    title: String,
});

module.exports = mongoose.model("Delnews", DelnewsSchema)
