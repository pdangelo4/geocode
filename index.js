require('dotenv').config();
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.accessToken });
const express = require('express'); 
const methodOverride = require('method-override')

const app = express();

// middlewar and config
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

// Controllers
app.use('/api', require('./controllers/api'));

app.get('/', (req,res) => {
    res.render('citySearch');
})

app.get('/search', (req, res) => {
    res.render('citySearch');
})

//render the city searc view
app.post('/search', (req, res) => {
    // res.send('STUB - Home route works!')
    let city = req.body.city;
    let state = req.body.seattle;
    let query = `${city}, ${state}`
   
    geocodingClient.forwardGeocode({query})
        .send()
        .then(response => {
            const match = response.body.features[0];
            let lat = match.center[1];
            let long = match.center[0];
            let splitPlace_name = match.place_name.split(',');
            let city = splitPlace_name[0];
            let state = splitPlace_name[1];
            //res.send(match.features[0].center);

            res.render('searchResults', {
                // result: match.feature[0]
                lat,
                long,
                city,
                state
            });
        })
})

const db = require('./models');
// use forward geocoding to searcch for cities

// render the search results page
app.post('/search', (req, res) => {
    req.send(req.body);
})

//add the selected city to our favorites
// render the search results page
app.post('/favorites', (req, res) => {
    res.send(req.body)
    db.place.create(req.body)
    .then(() => {
        res.redirect('/favorites');
    })
    .catch(err => {
        if(err) console.log(err);
        res.send("An error happened while creating a faorite")
    })
})

//pull all o fthe fovarite cities and pass them
app.get('/favorites', (req ,res) => {
    //res.send('STUB - favorites page');
    db.place.findAll()
    .then(places => {
        res.render('favorites/index', {
            places
        })
    })
    .catch(err => {
        if(err) console.log(err);
        res.send("An error happened while creating a faorite")
    })
})

// delete the city from th efavorites table, and then redirect
app.delete('/favorites/:id', (req, res) => {
    db.place.destroy({
        where: {id: req.params.id}
    })
    .then(() => {
        res.redirect('/favorites')
    })
    .catch(err => {
        if(err) console.log(err);
        res.send("An error happened while creating a faorite")
    })
})

// app.post('/add', (req, res) => {
    
// })
// app.get('/api/favorites', (req, res) => {
//     res.json({
//         key1: "joebob",
//         key2: "example"
//     })
// })



app.listen(3001, () => {
    console.log("Server is now istening on 3001")
})