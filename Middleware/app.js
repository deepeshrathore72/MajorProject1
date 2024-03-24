const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// middleWare -> response send
// app.use((req, res, next)=>{
//     console.log("Hi, I am 1st middleware");
//     next();//we can also return next(), taaki next() ke baad me likha hua code execute na ho.
//     // console.log("This is after next()");
// });

// app.use((req, res, next)=>{
//     console.log("Hi, I am 2nd middleware");
//     next();
// });

app.use((req, res, next)=>{
    console.log("i am only for random");
    next();
});

const checkToken = (req, res, next)=>{
    let{token} = req.query;
    if(token === "giveaccess"){
        next();
    }
    throw new ExpressError(401, "Access Denied; Please provide a valid token");
};

app.get("/api", checkToken ,(req, res)=>{
    res.send("data");
});

app.get("/", (req, res)=>{
    res.send("Hi, i am root");
});

app.get("/random", (req, res)=>{
    res.send("this is a random page");
});

// // logger - morgan
// app.use((req, res, next)=>{
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// });
// middleware function can manipulate request object and can update them.

// middleware tabhi kaam karega jab use normal get functions se upar likha jaye

app.use("/err", (req, res)=>{
    abcd = abcd;
});

app.use("/admin", ( req, res)=>{
    throw new ExpressError(403, "Access to admin is forbidden");
});

app.use((err, req, res, next)=>{
    let {status = 500, message = "some error occured"} = err;
    res.status(status).send(message);
});

// app.use((err, req, res, next)=>{
//     console.log("-------error2 middleWare------");
//     next(err);
// });

// 404
app.use((req, res)=>{
    res.send( {error : "Page not found"} );
});

app.listen(8080, ()=>{
    console.log("server is listening on port 8080");
});