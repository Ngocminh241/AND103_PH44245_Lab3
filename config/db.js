const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const atLas = 'mongodb+srv://admin:admin@cluster0.jcetqj6.mongodb.net/lab3'

const connect = async () =>{
    try{
        await mongoose.connect(atLas);
        console.log('connect success');
    }catch(error){
        console.log(error);
        console.log('connect fail');
    }
}
module.exports = {connect};