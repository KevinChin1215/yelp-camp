const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");
// const axios = require("axios");
// const params = {
//     client_id: "Vd516gH0z1RlOA6UKY6jqRIiYACJgFMj5hGOY8GRyzQ",
// };

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const randomElementFromArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    try {
        // const response = await axios.get(
        //     "https://api.unsplash.com/collections/483251/photos",
        //     { params }
        // );
        for (let i = 0; i < 300; i++) {
            // const photo = randomElementFromArr(response.data);
            const randomCitiesIndex = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() * 20) + 10;
            const randomCity = cities[randomCitiesIndex];
            const camp = new Campground({
                author: "63e932b08900b37f7df42937",
                location: `${randomCity.city}, ${randomCity.state}`,
                title: `${randomElementFromArr(descriptors)} ${randomElementFromArr(
                    places
                )}`,
                price,
                // image: photo.urls.regular,
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, ratione, alias quisquam officia labore eligendi natus culpa ut repellat dolorem distinctio unde quasi placeat deserunt maxime commodi aspernatur ipsa incidunt.",
                images: [
                    {
                        url: "https://res.cloudinary.com/dhe4g83lr/image/upload/v1676470610/YelpCamp/vwmhcgqj8cggaorb70jr.jpg",
                        filename: "YelpCamp/vwmhcgqj8cggaorb70jr",
                    },
                    {
                        url: "https://res.cloudinary.com/dhe4g83lr/image/upload/v1676470610/YelpCamp/pvnpllw6iwypv7ncivux.jpg",
                        filename: "YelpCamp/pvnpllw6iwypv7ncivux",
                    },
                ],
                geometry: {
                    type: "Point",
                    coordinates: [randomCity.longitude, randomCity.latitude],
                },
            });
            await camp.save();
        }
    } catch (error) {
        console.error(error);
    }
};

seedDB().then(() => mongoose.connection.close());
