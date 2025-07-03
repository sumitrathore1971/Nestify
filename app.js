if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");

// const wrapAsync = require("./utils/wrapAsync.js");
// const review = require("./models/reviews.js");
// const Listing = require("./models/listing.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const { log } = require("console");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.MONGODB_URL;

main()
  .then(() => {
    console.log("connection formed");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 60 * 60, // 24 hours
});

store.on("error", () => {
  console.log("ERROR IN MONGO SESSION STRORE");
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// app.get("/", (req, res) => {
//   res.send("i am root");
// });

app.use(session(sessionOptions));
app.use(flash());

//using passport for login and signup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  // console.log(res.locals.success);
  next();
});

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student",
//   });

//   let newUser =await User.register(fakeUser,"helloworld");
//   res.send(newUser);
// });

app.use("/listings", listingRouter);
app.use("/listings", reviewRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(
    new expressError(
      404,
      `Page Not Found! The requested URL ${req.originalUrl} does not exist.`
    )
  );
});

app.use((err, req, res, next) => {
  let { status = 500, message = "somwthing went wrong" } = err;
  // res.status(status).send(message);
  res.status(status).render("./listings/error.ejs", { message });
});

app.listen(8080, () => {
  console.log("app is listening");
});

// app.get("/testlisting", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "indore",
//     Country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful");
// });
