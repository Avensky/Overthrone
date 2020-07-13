// load all the things we need
const mongoose         = require('mongoose')

// load up the user model
const Faq            = mongoose.model('Faq')


module.exports = function(app) {
app.get('/api/faqs', (req,res) =>{          //get all faqs info from db
    Faq.find({},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.err(err);
        }
    })
});

app.post('/api/addFaq',(req,res) => {        //add a new faq
//    const { title, author, content} = req.body;
const faqObj = new Faq({
    question        : req.body.question,
    answer          : req.body.answer,
//        faqId : req.body.faqid,
})
faqObj.save((err)=>{
    if(err){
    console.log(err);
    res.send('Unable to save faq data!');
    }
    else
    res.send('faq data saved successfully!');
})
});

app.get('/api/getfaqDetails/:faqid',(req,res)=>{              //get a faq details
Faq.findOne({_id : req.params.faqid},{},(err,doc)=>{
    if(doc)
        res.json(doc);
    else {
        res.status(404).send('Ops!Detail not found');
    }
})
});   

app.post('/api/updatefaq',(req,res)=>{          //update a faq data
    Faq.findOneAndUpdate({
        faqId : req.body.id
    },{
        $set:{
            question        : req.body.question,
            answer          : req.body.answer,
        }
    },(err,doc)=>{
        if(doc)
            res.send('Faq updated successfully!');
        else {
            res.err(err.message);
        }
    })
});

app.delete('/api/deletefaq/:faqid',(req,res)=>{           //delete a perticular faq
    Faq.findOneAndRemove({_id : req.params.faqid},{},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.status(404).send('Ops! Faq not found');
        }
    })
    });
}