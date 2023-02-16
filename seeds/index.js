const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63eb11f077e1da0971f345db',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. At quaerat quis perspiciatis, perferendis, nostrum alias sapiente illum illo, odio esse dolores repellendus neque obcaecati! Veritatis animi quibusdam odio. Incidunt, eaque!',
            price,
            geometry: { type: 'Point', coordinates: [125.638227, 9.604752] },
            images: [{
                    url: 'https://res.cloudinary.com/dpu7hnkuc/image/upload/v1676539813/YelpCamp/pygl0rnrpu0b5yzch20j.jpg',
                    filename: 'YelpCamp/pygl0rnrpu0b5yzch20j',
                },
                {
                    url: 'https://res.cloudinary.com/dpu7hnkuc/image/upload/v1676444145/YelpCamp/gqmbrhtm4mrsfniozihb.jpg',
                    filename: 'YelpCamp/gqmbrhtm4mrsfniozihb',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})