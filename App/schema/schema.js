const mongoose = require('mongoose');
const schema = mongoose.Schema;
let taskSchema = new schema({
    task:String,
    status:Boolean,
    username:String
});

const Todo = mongoose.model("todo", taskSchema);

module.exports={taskSchema:Todo};