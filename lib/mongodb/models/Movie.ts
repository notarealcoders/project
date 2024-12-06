import mongoose from 'mongoose';

// Define the Movie schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this movie.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  plot: {
    type: String,
    required: [true, 'Please provide a plot for this movie.'],
  },
  year: {
    type: Number,
    required: [true, 'Please provide a year for this movie.'],
  },
  rated: String,
  released: Date,
  runtime: String,
  directors: [String],
  cast: [String],
  type: {
    type: String,
    default: 'movie'
  }
}, {
  timestamps: true,
});

// Create or retrieve the Movie model
const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);

export default Movie;