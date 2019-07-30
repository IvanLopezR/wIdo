require('dotenv').config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Place = require("../models/Place");

const bcryptSalt = 10;

mongoose
  .connect(process.env.ATLASDB, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    User.deleteMany()
      .then(() => {
        return User.create(users)
      })
      .then(usersCreated => {
        console.log(`${usersCreated.length} users created with the following id:`);
        console.log(usersCreated.map(u => u._id));
      })
      .then(() => {
        // Close properly the connection to Mongoose
        mongoose.disconnect()
      })
      .catch(err => {
        mongoose.disconnect()
        throw err
      })
    Place.deleteMany()
      .then(() => {
        return Place.create(places)
      })
      .then(placesCreated => {
        console.log(`${placesCreated.length} users created with the following id:`);
        console.log(placesCreated.map(u => u._id));
      })
      .then(() => {
        // Close properly the connection to Mongoose
        mongoose.disconnect()
      })
      .catch(err => {
        mongoose.disconnect()
        throw err
      })
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    name: "Alice Mars",
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    email: "alice@yahoo.es",
    phone: "625901738",
    address: "Barcelona, España",
    country: "ESP",
    range: "Neighborhood",
    countries: [],
    places: [],
    following: [],
    followers: [],
    imgName: "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
    // imgPath: "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
    status: "Active",
    token: "",
  },
  {
    name: "Bob Lirem",
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    email: "bob1979@gmail.com",
    phone: "639023421",
    address: "Sevilla, España",
    country: "ESP",
    range: "Neighborhood",
    countries: [],
    places: [],
    following: [],
    followers: [],
    imgName: "https://data.whicdn.com/images/55805982/large.jpg",
    // imgPath: "https://data.whicdn.com/images/55805982/large.jpg",
    status: "Active",
    token: "",
  },
  {
    name: "Arlem Basim",
    username: "arlem",
    password: bcrypt.hashSync("arlem", bcrypt.genSaltSync(bcryptSalt)),
    email: "arlem@icloud.com",
    phone: "638923724",
    address: "Leganes, España",
    country: "ESP",
    range: "Neighborhood",
    countries: [],
    places: [],
    following: [],
    followers: [],
    imgName: "https://i.ebayimg.com/images/g/IIEAAOSwBt5ZNIwr/s-l1600.jpg",
    // imgPath: "https://i.ebayimg.com/images/g/IIEAAOSwBt5ZNIwr/s-l1600.jpg",
    status: "Active",
    token: "",
  },
  {
    name: "Anne Grisley",
    username: "anne",
    password: bcrypt.hashSync("anne", bcrypt.genSaltSync(bcryptSalt)),
    email: "anne_gr_88@gmail.com",
    phone: "637826335",
    address: "Mallorca, España",
    country: "ESP",
    range: "Neighborhood",
    countries: [],
    places: [],
    following: [],
    followers: [],
    imgName: "http://www.allsparkfireworks.com/blog/wp-content/uploads/2014/03/firework-sparkler-girl.jpg",
    // imgPath: "http://www.allsparkfireworks.com/blog/wp-content/uploads/2014/03/firework-sparkler-girl.jpg",
    status: "Active",
    token: "",
  },
  {
    name: "Jose Mendez",
    username: "jose",
    password: bcrypt.hashSync("jose", bcrypt.genSaltSync(bcryptSalt)),
    email: "josemen77_1@hotmail.com",
    phone: "689002318",
    address: "Pontevedra, España",
    country: "ESP",
    range: "Neighborhood",
    countries: [],
    places: [],
    following: [],
    followers: [],
    imgName: "https://a.deviantart.net/avatars-big/v/a/vampir-cat.jpg?4",
    // imgPath: "https://a.deviantart.net/avatars-big/v/a/vampir-cat.jpg?4",
    status: "Active",
    token: "",
  },
  {
    name: "Clara Acebes",
    username: "clara",
    password: bcrypt.hashSync("clara", bcrypt.genSaltSync(bcryptSalt)),
    email: "clara@yahoo.es",
    phone: "672898812",
    address: "Almeria, España",
    country: "ESP",
    range: "Neighborhood",
    countries: [],
    places: [],
    following: [],
    followers: [],
    imgName: "https://icreatived.com/wp-content/uploads/2014/10/Interesting-Creative-Facebook-Profile-Picture-Ideas-25.jpg",
    // imgPath: "https://icreatived.com/wp-content/uploads/2014/10/Interesting-Creative-Facebook-Profile-Picture-Ideas-25.jpg",
    status: "Active",
    token: "",
  },
  {
    name: "Federico Sila",
    username: "federico",
    password: bcrypt.hashSync("federico", bcrypt.genSaltSync(bcryptSalt)),
    email: "fede_si86@icloud.com",
    phone: "659037784",
    address: "Caceres, España",
    country: "ESP",
    range: "Neighborhood",
    countries: [],
    places: [],
    following: [],
    followers: [],
    imgName: "https://thewondrous.com/wp-content/uploads/2015/07/beautiful-profile-pics.jpg",
    // imgPath: "https://thewondrous.com/wp-content/uploads/2015/07/beautiful-profile-pics.jpg",
    status: "Active",
    token: "",
  },
  {
    name: "Javier Lanza",
    username: "javier",
    password: bcrypt.hashSync("javier", bcrypt.genSaltSync(bcryptSalt)),
    email: "javi.lanz@gmail.com",
    phone: "690883482",
    address: "Murcia, España",
    country: "ESP",
    range: "Neighborhood",
    countries: [],
    places: [],
    following: [],
    followers: [],
    imgName: "https://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-natural-7.jpg",
    // imgPath: "https://profilepicturesdp.com/wp-content/uploads/2018/07/profile-picture-natural-7.jpg",
    status: "Active",
    token: "",
  },
  {
    name: "Christian Gonzalez",
    username: "christian",
    password: bcrypt.hashSync("christian", bcrypt.genSaltSync(bcryptSalt)),
    email: "chrisgon@outlook.com",
    phone: "689332401",
    address: "Valencia, España",
    country: "ESP",
    range: "Neighborhood",
    countries: [],
    places: [],
    following: [],
    followers: [],
    imgName: "https://www.whatsappprofiledpimages.com/wp-content/uploads/2019/01/Nature-Profile-Picture-1-300x241.jpg",
    // imgPath: "https://www.whatsappprofiledpimages.com/wp-content/uploads/2019/01/Nature-Profile-Picture-1-300x241.jpg",
    status: "Active",
    token: "",
  },
  {
    name: "Isis García",
    username: "isis",
    password: bcrypt.hashSync("isis", bcrypt.genSaltSync(bcryptSalt)),
    email: "isis_garter1979@outlook.com",
    phone: "666903286",
    address: "Cuenca, España",
    country: "ESP",
    range: "Neighborhood",
    countries: [],
    places: [],
    following: [],
    followers: [],
    imgName: "https://www.whatsappprofiledpimages.com/wp-content/uploads/2018/07/nature-profile5-300x289.jpg",
    // imgPath: "https://www.whatsappprofiledpimages.com/wp-content/uploads/2018/07/nature-profile5-300x289.jpg",
    status: "Active",
    token: "",
  },
]


let places = [
  {
    title: "Puerta del Sol",
    coordinates: {
      lng: -3.7034510620068204,
      lat: 40.41686581045498,
    },
    type: "Visit Place",
    imgName: "https://www.spaintraveltourism.com/wp-content/uploads/2017/12/AdobeStock_96103737-e1517299556435.jpeg",
  },
  {
    title: "Plaza España",
    coordinates: {
      lng: -5.987103676732431,
      lat: 37.377042031976124,
    },
    type: "Visit Place",
    imgName: "http://espiritualoha.com/wp-content/uploads/2017/09/unnamed-760x500.jpg",
  },
  {
    title: "Giralda",
    coordinates: {
      lng: -5.992518118939188,
      lat: 37.38624368289414,
    },
    type: "Visit Place",
    imgName: "http://blog.ticketea.com/wp-content/uploads/2018/02/giralda.jpg",
  },
  {
    title: "Islas Cies",
    coordinates: {
      lng: -8.906033731984735,
      lat: 42.22065310808131,
    },
    type: "Visit Place",
    imgName: "https://saltaconmigo.com/blog/wp-content/uploads/2018/03/Galicia-Islas-Cies-Praia-Rodas-Playa.jpg",
  },
  {
    title: "Catedral de Barcelona",
    coordinates: {
      lng: 2.17609385057483,
      lat: 41.384305009033895,
    },
    type: "Visit Place",
    imgName: "https://destinacionbarcelona.com/wp-content/uploads/2016/08/catedral-barcelona-n.jpg",
  },
  {
    title: "Tower Bridge",
    coordinates: {
      lng: -0.07536535600149818,
      lat: 51.50553030332033,
    },
    type: "Visit Place",
    imgName: "https://secretadventures.org/images/3ttqloew.jpg",
  },
  {
    title: "Eiffel Tower",
    coordinates: {
      lng: -2.294453542137717,
      lat: 48.85834370184909,
    },
    type: "Visit Place",
    imgName: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/74/aa/fc.jpg",
  },
  {
    title: "Roman Coliseum",
    coordinates: {
      lng: 12.492254836506959,
      lat: 41.89027917599775,
    },
    type: "Visit Place",
    imgName: "https://upload.wikimedia.org/wikipedia/commons/5/53/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg",
  },
  {
    title: "Red Square",
    coordinates: {
      lng: 37.623155084601876,
      lat: 55.75255128956968,
    },
    type: "Visit Place",
    imgName: "https://republica.gt/wp-content/uploads/2018/06/Plaza-roja-03.jpg",
  },
  {
    title: "Akihabara",
    coordinates: {
      lng: 139.77334328100665,
      lat: 35.70196016210616,
    },
    type: "Visit Place",
    imgName: "https://www.jrailpass.com/blog/wp-content/uploads/2018/09/best-manga-anime-locations-japan.jpg",
  },
  {
    title: "Wall Street",
    coordinates: {
      lng: -74.01065976192115,
      lat: 40.70711315775591,
    },
    type: "Visit Place",
    imgName: "https://info7rm.blob.core.windows.net.optimalcdn.com/images/2016/11/11/596872_bolsa_nueva_york.jpg",
  },
  {
    title: "Zapiecek",
    coordinates: {
      lng: 21.010981408527755,
      lat: 52.24969757781259,
    },
    type: "Food Place",
    imgName: "https://media-cdn.tripadvisor.com/media/photo-s/0f/0b/2b/e6/zapiecek-on-jerozolimskie.jpg",
  },
]