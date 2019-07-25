require('dotenv').config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/wido', { useNewUrlParser: true })
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
      range: "Neighborhood",
      countries: [],
      places: [],
      friends: [],
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
      range: "Neighborhood",
      countries: [],
      places: [],
      friends: [],
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
      range: "Neighborhood",
      countries: [],
      places: [],
      friends: [],
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
      range: "Neighborhood",
      countries: [],
      places: [],
      friends: [],
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
      range: "Neighborhood",
      countries: [],
      places: [],
      friends: [],
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
      range: "Neighborhood",
      countries: [],
      places: [],
      friends: [],
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
      range: "Neighborhood",
      countries: [],
      places: [],
      friends: [],
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
      range: "Neighborhood",
      countries: [],
      places: [],
      friends: [],
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
      range: "Neighborhood",
      countries: [],
      places: [],
      friends: [],
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
      range: "Neighborhood",
      countries: [],
      places: [],
      friends: [],
      imgName: "https://www.whatsappprofiledpimages.com/wp-content/uploads/2018/07/nature-profile5-300x289.jpg",
      // imgPath: "https://www.whatsappprofiledpimages.com/wp-content/uploads/2018/07/nature-profile5-300x289.jpg",
      status: "Active",
      token: "",
    },
  ]
  