const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HnewsSchema = Schema({
    id: String,
    created_at: String,
    title: String,
    story_title: String,
    story_url: String,
    url: String,
    story_text: String,
    author: String,
});

module.exports = mongoose.model("Hnews", HnewsSchema)
