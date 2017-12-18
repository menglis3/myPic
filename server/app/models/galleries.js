var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

priorities = ['Low','Medium','High','Critical'];

var gallerySchema = new Schema({ 

    user:    {type : Schema.Types.ObjectId }, 
    todo: { type: String, requred: true },
    description: { type: String },
    dataCreated: { type: Date, default: Date.now},
    dateDue: { type: Date, default: Date.now},
    completed: { type: Boolean, default: false},
    priority: { type: String, enum: priorities},
    file: {
        filename: { type: String},
        originalName: { type: String },
        dateUploaded: { type: Date, default: Date.now }
    }
    
    
    }); 

module.exports = 
Mongoose.model('Gallery', gallerySchema);
