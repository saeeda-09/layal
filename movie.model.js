const                    
   mongoose = require('mongoose');

const MovieSchema = mongoose.Schema(
    {
       name: {
        type: String,
        required: true 
    },
   
    description: { 
        type: String
    },
    genres: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    releaseYear: {
        type: Number
    },
    image: {
        type: String,
        default: ""
    }

    },
    {
        timestamps: true
    }
);


const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;