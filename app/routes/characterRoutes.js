// load all the things we need
const mongoose         = require('mongoose')

// load up the user model
const Character            = mongoose.model('Character')


module.exports = function(app) {
app.get('/api/characters', (req,res) =>{          //get all characters info from db
    Character.find({},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.err(err);
        }
    })
});

app.post('/api/addCharacter',(req,res) => {        //add a new character
//    const { title, author, content} = req.body;
const characterObj = new Character({
    name        : req.body.name,
    age         : req.body.age,
//        characterId : req.body.characterid,
    bio         : req.body.bio,
    relatives   : req.body.relatives
})
characterObj.save((err)=>{
    if(err){
    console.log(err);
    res.send('Unable to save character data!');
    }
    else
    res.send('character data saved successfully!');
})
});

app.get('/api/getcharacterDetails/:characterid',(req,res)=>{              //get a character details
Character.findOne({_id : req.params.characterid},{},(err,doc)=>{
    if(doc)
        res.json(doc);
    else {
        res.status(404).send('Ops!Detail not found');
    }
})
});   

app.post('/api/update',(req,res)=>{          //update a character data
Character.findOneAndUpdate({characterId : req.body.characterid},{$set:{publisher : req.body.publisher}},(err,doc)=>{
    if(doc)
        res.send('Character updated successfully!');
    else {
        res.err(err.message);
    }
})
});

app.delete('/api/deletecharacter/:characterid',(req,res)=>{           //delete a perticular character
Character.findOneAndRemove({_id : req.params.characterid},{},(err,doc)=>{
    if(doc)
        res.json(doc);
    else {
        res.status(404).send('Ops! Character not found');
    }
})
});
}