var express = require('express');
var router = express.Router();

let book = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/create",(req,res,next)=>{
  res.render("create")
})

router.get("/read",(req,res,next)=>{
   res.render("read",{
    book:book,
  })

})

router.post("/create",(req,res,next)=>{
  book.push(req.body)
  res.redirect("/read")
  

})

router.get("/update/:id",(req,res,next)=>{
  let i = req.params.id
  let o = book[i]
  res.render("update",{
    odata: o,
    i: i
  })
})

router.post("/update/:id",(req,res,next)=>{
  let i = req.params.id
  book[i] = req.body
  res.redirect("/read")
})

router.get("/delete/:id",(req,res,next)=>{
  book.splice(req.params.id,1)
  res.redirect("/read")
})






router.get("/viewbook/:id",(req,res,next)=>{
  let a = book[req.params.id]
  res.render("viewbook",{
    data: a,
  })
})

module.exports = router;
