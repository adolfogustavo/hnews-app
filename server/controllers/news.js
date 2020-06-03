const fetch = require('isomorphic-unfetch');
const Hnews = require("../models/hnews");
const Delnews = require("../models/delnews");
const moment = require('moment');
const hn_api_url = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
const api_url = 'http://localhost:3977/api/v1';


async function updateNews() {
    try {
        return fetch(hn_api_url).then(
            data => (data.json())
        ).then(
            news_data => {

                let obj = {};
                for (var i = 0, len = news_data.hits.length; i < len; i++) {
                    obj[news_data.hits[i]['story_title']] = news_data.hits[i];
                }

                news_data.hits = new Array();
                for ( var key in obj ) {
                    news_data.hits.push(obj[key]);
                }

                news_data.hits.map(async d => {

                    const existingNews = await Hnews.findOne({ title: d.title, story_title: d.story_title });

                    const deletedNews = await Delnews.findOne({ title: {$in: [d.story_title, d.title]} });

                    if (existingNews === null && deletedNews === null) {
                        const hnews = new Hnews ({
                            id: d.objectID,
                            created_at: d.created_at,
                            title: d.title,
                            story_title: d.story_title,
                            story_url: d.story_url,
                            url: d.url,
                            story_text: d.story_text,
                            author: d.author
                        });

                        hnews.save((err) => {
                            if (err) throw err;
                        })
                    }
                    

                });

                return true;
            }
        );

    } catch (err) {
        throw err;
    }
}


async function transformDate(created_at) {
    try {
        let date = '';
        let now = moment.utc().format('YYYY-MM-DD HH:mm:ss');
        let given = moment.utc(created_at).format('YYYY-MM-DD HH:mm:ss');

        let ms = moment(now, "YYYY-MM-DD").diff(moment(given, "YYYY-MM-DD")),
            d = moment.duration(ms),
            diffInDays = Math.floor(d.asDays());

        if (diffInDays === 1) {
            date = 'Yesterday';
        } else if (diffInDays === 0) {
            date = moment.utc(created_at).format('hh:mm A')
        } else if (diffInDays > 1) {
            date = moment.utc(created_at).format('MMMM D')
        }
        
        return date;
    } catch (error) {
        throw(error)
    }
}

async function getNews(req, res) {
    try {
        let news = [];
        const dbNews = await Hnews.find({}).sort({created_at: 'desc'});

        for(let n of dbNews) {
            if((n.title !== null || n.story_title !== null) && (n.story_url !== null || n.url !== null)) {
                news.push({
                    id: n.id,
                    title: n.title === null ? n.story_title : n.title,
                    author: n.author,
                    story_url: n.story_url == null ? n.url : n.story_url,
                    created_at: await transformDate(n.created_at)
                });
            }
        }

        res.json({ news })
    } catch (err) {
        throw err;
    }
}

async function deleteNew(req, res) {
    try {
        console.log('req=>', req.body);
        const { id, title } = req.body;

        // Save ID of the new deleted
        const delnews = new Delnews ({ id, title });
        delnews.save((err) => { if (err) throw err });

        // Delete the new from DB
        Hnews.remove({ id }, function(err) { 
            if(err) throw err;
        });

        res.json({ success: 'ok' })
        
    } catch (err) {
        throw err;
    }
}

module.exports = {
    updateNews,
    getNews,
    deleteNew,
};