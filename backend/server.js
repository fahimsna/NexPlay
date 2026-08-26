const express = require("express");
console.log("MY SERVER FILE RUNNING");

const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");


// =======================
// LOAD ENV
// =======================

dotenv.config();

console.log("SERVER FILE:", __filename);
console.log("CURRENT MONGO URI:", process.env.MONGO_URI);



// =======================
// DATABASE
// =======================

const connectDB = require("./config/db");



// =======================
// ROUTES IMPORT
// =======================

const settingsRoutes = require("./routes/settingsRoutes");
const sportsRoutes = require("./routes/sportsRoutes");
const activityRoutes = require("./routes/activityRoutes");

const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const advertisementRoutes = require("./routes/advertisementRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const upcomingRoutes = require("./routes/upcomingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const featuredContentRoutes = require("./routes/featuredContentRoutes");
const streamingPlatformRoutes = require("./routes/streamingPlatformRoutes");
const streamingAvailabilityRoutes = require("./routes/streamingAvailabilityRoutes");
const commentRoutes = require("./routes/commentRoutes");

const userRoutes = require("./routes/userRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");


// NEW FEATURE

const engagementRoutes = require("./routes/engagementRoutes");

console.log("ENGAGEMENT ROUTE LOADED");



// =======================
// APP
// =======================

const app = express();



// =======================
// DATABASE CONNECT
// =======================

connectDB();



// =======================
// MIDDLEWARE
// =======================


app.use(

cors({

origin:[

"http://localhost:5173",

"http://localhost:5174"

],

credentials:true,

})

);



app.use(express.json());


app.use(

express.urlencoded({

extended:true,

})

);



// =======================
// STATIC FILES
// =======================


app.use(

"/uploads",

express.static(

path.join(__dirname,"uploads")

)

);



// =======================
// API ROUTES
// =======================


app.use(

"/api/auth",

authRoutes

);


app.use(

"/api/company",

companyRoutes

);


app.use(

"/api/advertisements",

advertisementRoutes

);


app.use(

"/api/campaigns",

campaignRoutes

);


app.use(

"/api/dashboard",

dashboardRoutes

);


app.use(

"/api/analytics",

analyticsRoutes

);


app.use(

"/api/upcoming",

upcomingRoutes

);


app.use(

"/api/settings",

settingsRoutes

);


app.use(

"/api/sports",

sportsRoutes

);


app.use(

"/api/admin",

adminRoutes

);


app.use(

"/api/reviews",

reviewRoutes

);
// =======================
// CONTINUE API ROUTES
// =======================


app.use(

"/api/featured-content",

featuredContentRoutes

);


app.use(

"/api/streaming-platforms",

streamingPlatformRoutes

);


app.use(

"/api/streaming-availability",

streamingAvailabilityRoutes

);


app.use(

"/api/comments",

commentRoutes

);




// =======================
// SPRINT 4 ROUTES
// =======================


app.use(

"/api/activity",

activityRoutes

);


app.use(

"/api/users",

userRoutes

);


app.use(

"/api/watchlist",

watchlistRoutes

);




// =======================
// USER ENGAGEMENT SYSTEM
// =======================


app.use(

"/api/engagement",

engagementRoutes

);




// =======================
// ROOT
// =======================


app.get("/",(req,res)=>{


res.send(

"NexPlay Backend Running"

);


});





// =======================
// SOCKET.IO LIVE VISITOR
// =======================


const server = http.createServer(app);



const io = new Server(server,{

cors:{

origin:[

"http://localhost:5173",

"http://localhost:5174"

],

credentials:true

}

});





const visitors = new Set();





io.on("connection",(socket)=>{


visitors.add(socket.id);



console.log(

"Visitor Connected:",

socket.id

);



io.emit(

"visitorCount",

visitors.size

);
socket.on("getVisitorCount",()=>{

  socket.emit(
    "visitorCount",
    visitors.size
  );

});





socket.on("disconnect",()=>{


visitors.delete(socket.id);



console.log(

"Visitor Disconnected:",

socket.id

);



io.emit(

"visitorCount",

visitors.size

);



});


});






// =======================
// SERVER START
// =======================


const PORT = process.env.PORT || 8000;



server.listen(PORT,()=>{


console.log(

`Server running on port ${PORT}`

);


});