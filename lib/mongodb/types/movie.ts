export interface IMovie {
  _id: string;
  title: string;
  year: number;
  plot: string;
  rated?: string;
  released?: Date;
  runtime?: string;
  directors?: string[];
  cast?: string[];
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateMovieInput {
  title: string;
  year: number;
  plot: string;
  rated?: string;
  released?: Date;
  runtime?: string;
  directors?: string[];
  cast?: string[];
  type?: string;
}