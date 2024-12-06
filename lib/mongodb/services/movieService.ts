import Movie from '../models/Movie';
import { CreateMovieInput, IMovie } from '../types/movie';
import connectDB from '../connection';

export class MovieService {
  static async findAll(limit: number = 10): Promise<IMovie[]> {
    try {
      await connectDB();
      console.log('Fetching all movies...');
      const movies = await Movie.find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
      console.log(`Found ${movies.length} movies`);
      return movies;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  static async findById(id: string): Promise<IMovie | null> {
    try {
      await connectDB();
      return Movie.findById(id).lean();
    } catch (error) {
      console.error('Error in findById:', error);
      throw error;
    }
  }

  static async create(data: CreateMovieInput): Promise<IMovie> {
    try {
      await connectDB();
      return Movie.create(data);
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  }

  static async update(id: string, data: Partial<CreateMovieInput>): Promise<IMovie | null> {
    try {
      await connectDB();
      return Movie.findByIdAndUpdate(id, data, { new: true }).lean();
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await connectDB();
      const result = await Movie.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    }
  }

  static async search(query: string): Promise<IMovie[]> {
    try {
      await connectDB();
      console.log('Searching movies with query:', query);
      const movies = await Movie.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { plot: { $regex: query, $options: 'i' } }
        ]
      })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean();
      console.log(`Found ${movies.length} movies matching query`);
      return movies;
    } catch (error) {
      console.error('Error in search:', error);
      throw error;
    }
  }
}