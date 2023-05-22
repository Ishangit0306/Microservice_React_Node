const express= require('express');
const  axios  = require("axios");
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.post('/events',async (req,res) => {

    const {type, data}= req.body;
    console.log(data);
    if(type==="comment created"){
    const status= data.content.includes('mayank')? 'rejected':'approved';

    await axios.post('http://localhost:4005/events',{
        type:'comment moderated',
        data:{
            id:data.id,
            postId:data.postId,
            status,
            content:data.content
        }

    });
    }
    res.send({});
})


app.listen(4003,()=>{
    console.log('listneing on 4003');

})