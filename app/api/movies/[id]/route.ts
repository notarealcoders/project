import { NextResponse } from 'next/server';
import { MovieService } from '@/lib/mongodb/services/movieService';
import { createMovieSchema } from '@/lib/mongodb/validation/movie';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const movie = await MovieService.findById(params.id);
    if (!movie) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
    return NextResponse.json({ movie }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch movie' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = createMovieSchema.partial().parse(body);
    const movie = await MovieService.update(params.id, validatedData);
    if (!movie) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
    return NextResponse.json({ movie }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update movie' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const success = await MovieService.delete(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Movie deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete movie' },
      { status: 500 }
    );
  }
}