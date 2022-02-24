const bcrypt = require('bcrypt')
const {MongoClient, ObjectId} = require('mongodb');
 
const url = 'mongodb+srv://user:capSton3@capstone.8i0da.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);
 
const dbName = 'capstone';
const db = client.db(dbName);
const collection = db.collection('data');

exports.index = (req, res) => {
    res.render('index', {
        title: 'Welcome User'
    });
}

exports.allPeople = async(req, res) => {
    await client.connect();
    const filteredDocs = await collection.find({}).toArray();
    client.close();
    res.render('people', {
        people: filteredDocs
    });
}

exports.create = (req, res) => {
    res.render('signup', {
        title: 'Add User'
    });
}

let salt = bcrypt.genSaltSync(10);

exports.createPerson = async(req, res) => {
    await client.connect();
    let hash = bcrypt.hashSync(req.body.password, salt);
    let person = {
        name: req.body.name,
        password: req.body.password,
        text: req.body.usrtext,
        image: req.body.image,
        password: hash
    };
    const insertResult = await collection.insertOne(person);
    client.close();
    res.redirect('/login');
}

exports.login = (req, res) => {
    res.render('login', {
        title: 'Login User'
    });
}

exports.loginPost = async(req, res) => {
    await client.connect();
    const filteredDocs = await collection.find({name: req.body.name}).toArray();
    let hash = bcrypt.compareSync(req.body.password, filteredDocs[0].password);
    if(req.body.name == filteredDocs[0].name && hash){
        res.redirect('/edit?id=' + filteredDocs[0]._id)
    } else{
        res.redirect('/');
    }
}

exports.edit = async(req, res) => {
    await client.connect();
    const filteredDocs = await collection.find(ObjectId(req.query.id)).toArray();
    client.close();
    res.render('edit', {
        title: 'Edit User',
        person: filteredDocs[0]
    });
    
}

exports.editPerson = async(req, res) => {
    await client.connect();
    const updateResult = await collection.updateOne(
        {_id: ObjectId(req.params.id) },
        {$set: {
            name: req.body.name,
            password: req.body.password,
            text: req.body.usrtext,
            image: req.body.image            
        }}
    )
    client.close();
    res.redirect('/');
}

exports.deletePerson = async(req, res) => {
    await client.connect();
    const deleteResult = await collection.deleteOne({
        _id: ObjectId(req.params.id)
    });
    client.close();
    res.redirect('/');
}

exports.viewPerson = async(req, res) => {
    await client.connect();
    const filteredDocs = await collection.findOne({_id: ObjectId(req.params.id)});
    client.close();
    res.render('view', {
        person: filteredDocs
    });
}