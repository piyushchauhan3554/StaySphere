if(process.env.NODE_ENV != "production"){ require("dotenv").config()}
const express = require("express");
const passport=require("passport")
const LocalStrategy=require("passport-local")
const User=require("./models/user.js")
const path = require("path");
const session = require("express-session");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const DBConnection = require("./utils/db.js");
const ExpressError = require("./utils/ExpressError.js");
const listingsRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter=require("./routes/users.js");
const flash=require("connect-flash")
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 5000;
app.engine("ejs", ejsMate);

DBConnection();

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


// root route
app.get("/", (req, res) => {
  res.send("I am root route");
});

app.use(session(sessionOptions));
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
  res.locals.success=req.flash("success")
  res.locals.error=req.flash("error")
  res.locals.currUser=req.user;
  next()
})

// create demoUser
app.get("/demoUser",async (req,res)=>{
  const fakeUser={
    username:"piyush",
    email:"piyush@gamil.com"
  }
  let u=await User.register(fakeUser,"abvirat")
  console.log(u);
  
  res.send("user added successfully")
})

// routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter)
// if none of the route match
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// custom error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("../views/Listings/error.ejs", { message });
});

app.listen(PORT, () => {
  console.log(`Server is listening at PORT:${PORT}`);
});
