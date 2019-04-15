var mongoose = require('mongoose');
var schema = mongoose.Schema;
var Schema = new schema({
    password:String,
    username:String,
    status:Boolean
});

let taskSchema = new schema({
    task:String,
    status:Boolean,
    username:String
});

const Todo = mongoose.model("todo", taskSchema);
var model = mongoose.model("PasswordApp",Schema);

module.exports={
    Schema:model,
    taskSchema:Todo
};
