var express = require('express');
var router = express.Router();
const Book = require("../models/Bookschema")
const upload = require("../utils/multer").single("image")
const fs = require("fs")
const path = require("path")

// let book = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/create",(req,res,next)=>{
  res.render("create")
})

router.get("/read",async(req,res,next)=>{
  //  res.render("read",{
  //   book:book,
  // })
  

  // Book.find().then((book)=>{
  //   res.render("read",{book: book})
  // }).catch((err)=>res.send(err))

  try{
    const book =await Book.find()
    res.render("read",{book:book})
  }
  catch(error){
    res.send(error)
  }

})

router.post("/create",upload,async(req,res,next)=>{

  // res.json({body:req.body, file:req.file}) 

  // book.push(req.body)
  // res.redirect("/read")

  // Book.create(req.body)
  // .then(()=>{
  //   // res.redirect("/read")
  // }).catch((err)=>res.send(err))

  try{

    // res.send({body:req.body , file:req.file})
    // await upload(req,res,async function (error){
    //   if(error){
    //     res.send(error)
    //     return
    //   }
    // })
    const newbook = new Book({...req.body, image: req.file.filename})
    await newbook.save()
    res.redirect("/read")
  }
  catch(error){
    res.send(error)
  }
    
//   try {
//     const newbook = new Books(req.body);
//     await newbook.save();
//     res.redirect("/readall");
// } catch (error) {
//     res.send(error);
// }
})

router.get("/update/:id",async (req,res,next)=>{
  // let i = req.params.id
  // let o = book[i]
  // res.render("update",{
  //   odata: o,
  //   i: i
  // })

  try{
    const book =await Book.findById(req.params.id)
    res.render("update",{
      odata: book,

    })
  }
  catch(error){
    res.send(error)
  }
})

router.post("/update/:id",upload,async(req,res,next)=>{
  // let i = req.params.id
  // book[i] = req.body
  // res.redirect("/read")
  try{
    // await Book.findByIdAndUpdate(req.params.id, req.body)
    // res.redirect("/read")

    const updatedata = {...req.body}
    console.log(updatedata);
    if(req.file){
      updatedata.image = req.file.filename

      fs.unlinkSync(
        path.join(
            __dirname,"..","public","images",
            req.body.oldimage));
    }

    await Book.findByIdAndUpdate(req.params.id, updatedata)
    res.redirect("/read")

  }

  
  catch(error){res.send(error)}
})

router.get("/delete/:id",async(req,res,next)=>{
  // book.splice(req.params.id,1)
  // res.redirect("/read")

  try{
    const book = await Book.findByIdAndDelete(req.params.id)
    fs.unlinkSync(path.join(__dirname,"..","public","images",book.image))
    res.redirect("/read")
  }
  catch(error){
    res.send(error)
  }
})






router.get("/viewbook/:id", async(req,res,next)=>{
  // let a = book[req.params.id]
  // res.render("viewbook",{
  //   data: a,
  // })
  const data = await Book.findById(req.params.id)
  res.render("viewbook",{data: data})
})

module.exports = router;
