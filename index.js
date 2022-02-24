const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    routes = require('./routes/routes.js');
// const bcrypt = require('bcrypt')
// const fs = require("fs")
// const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");

const app = express();

// const {MongoClient, ObjectId} = require('mongodb');
 
// const url = 'mongodb+srv://user:capSton3@capstone.8i0da.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const client = new MongoClient(url);
 
// const dbName = 'capstone';
// const db = client.db(dbName);
// const collection = db.collection('data');

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));

const urlencodedParser = express.urlencoded({
    extended: false
});


// const index = (req, res) => {
//     res.render('index', {
//         title: 'Welcome User'
//     });
// }

// const create = (req, res) => {
//     res.render('signup', {
//         title: 'Add User'
//     });
// }

// let salt = bcrypt.genSaltSync(10);

// const createPerson = async(req, res) => {
//     await client.connect();
//     let hash = bcrypt.hashSync(req.body.password, salt);
//     let person = {
//         name: req.body.name,
//         password: req.body.password,
//         text: req.body.usrtext,
//         image: req.body.image,
//         password: hash
//     };
//     const insertResult = await collection.insertOne(person);
//     client.close();
//     res.redirect('/login');
// }

// const login = (req, res) => {
//     res.render('login', {
//         title: 'Login User'
//     });
// }

// const loginpost = async(req, res) => {
//     await client.connect();
//     const filteredDocs = await collection.find({name: req.body.name}).toArray();
//     let hash = bcrypt.compareSync(req.body.password, filteredDocs[0].password);
//     if(req.body.name == filteredDocs[0].name && hash){
//         res.redirect('/edit?id=' + filteredDocs[0]._id)
//     } else{
//         res.redirect('/');
//     }
// }

// const edit = async(req, res) => {
//     await client.connect();
//     const filteredDocs = await collection.find(ObjectId(req.query.id)).toArray();
//     client.close();
//     res.render('edit', {
//         title: 'Edit User',
//         person: filteredDocs[0]
//     });
    
// }

// const editPerson = async(req, res) => {
//     await client.connect();
//     const updateResult = await collection.updateOne(
//         {_id: ObjectId(req.params.id) },
//         {$set: {
//             name: req.body.name,
//             password: req.body.password,
//             text: req.body.usrtext,
//             image: req.body.image            
//         }}
//     )
//     client.close();
//     res.redirect('/');
// }

// const allPeople = async(req, res) => {
//     await client.connect();
//     const filteredDocs = await collection.find({}).toArray();
//     client.close();
//     res.render('people', {
//         people: filteredDocs
//     });
// }

// const viewPerson = async(req, res) => {
//     await client.connect();
//     const filteredDocs = await collection.findOne({_id: ObjectId(req.params.id)});
//     client.close();
//     res.render('view', {
//         person: filteredDocs
//     });
// }

// const deletePerson = async(req, res) => {
//     await client.connect();
//     const deleteResult = await collection.deleteOne({
//         _id: ObjectId(req.params.id)
//     });
//     client.close();
//     res.redirect('/');
// }

// const picture = async(req, res) => {
//     await client.connect();
//     const filteredDocs = await collection.find(ObjectId(req.query.id)).toArray();
//     res.render('picture', {
//         title: "Edit Picture"
//     });
// }
// const upload = async(req, res) => {
//     await client.connect();
//     const updatePicture = await collection.findOne(
//         {_id: ObjectId(req.params.id) },
//         {$set: {
//             file: req.body.file
//         }}
//     )
//     module.exports = {
//         updatePicture 
//     }
// }



// app.get('/', index)
// app.get('/create', create);
// app.post('/create', urlencodedParser, createPerson);
// app.get('/login', login)
// app.post('/login', urlencodedParser, loginpost);
// app.get('/edit', edit)
// app.post('/edit/:id', urlencodedParser, editPerson);
// app.get('/people', allPeople)
// app.get('/view/:id', viewPerson);
// app.get('/delete/:id', deletePerson)
// app.get('/picture', picture);
// app.post('/picture', urlencodedParser, upload)

app.get('/', routes.index);
app.get('/create', routes.create);
app.post('/create', urlencodedParser, routes.createPerson);
app.get('/login', routes.login)
app.post('/login', urlencodedParser, routes.loginPost);
app.get('/edit', routes.edit);
app.post('/edit/:id', urlencodedParser, routes.editPerson);
app.get('/delete/:id', routes.deletePerson);
app.get('/view/:id', routes.viewPerson);
app.get('/people', routes.allPeople)


app.listen(3000);