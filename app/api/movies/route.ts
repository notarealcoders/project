import { NextRequest, NextResponse } from 'next/server';
import { MovieService } from '@/lib/mongodb/services/movieService';
import { createMovieSchema } from '@/lib/mongodb/validation/movie';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('search');
    
    const movies = query 
      ? await MovieService.search(query)
      : await MovieService.findAll();
      
    return NextResponse.json({ movies }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createMovieSchema.parse(body);
    const movie = await MovieService.create(validatedData);
    return NextResponse.json({ movie }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create movie' },
      { status: 400 }
    );
  }
}