const mongoose = require('mongoose');
const {model, Schema } = mongoose;

const loginSchema = new Schema({
    username: String,
    password: String,
    createdAt: {
        default: Date.now(),
        type: Date,
    },
    exsercises:{
        type:[
            {
                title:String,
                exsercise: Array,
            }
        ],
        default:[]
    }
})

const Login = model('Login', loginSchema);

module.exports = Login;