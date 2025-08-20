import { json } from '@sveltejs/kit';
import { statements } from '$lib/db.js';

export async function GET({ url }) {
  const limit = url.searchParams.get('limit') || '50';
  const startDate = url.searchParams.get('start_date');
  const endDate = url.searchParams.get('end_date');

  try {
    let workouts;
    
    if (startDate && endDate) {
      workouts = statements.getWorkoutsByDateRange.all({ start_date: startDate, end_date: endDate });
    } else {
      workouts = statements.getWorkouts.all(parseInt(limit));
    }
    
    return json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return json({ error: 'Failed to fetch workouts' }, { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const data = await request.json();
    
    const result = statements.insertWorkout.run({
      date: data.date,
      workout_duration: data.workout_duration || null,
      calories_burned: data.calories_burned || null,
      notes: data.notes || null
    });
    
    return json({ id: result.lastInsertRowid, success: true });
  } catch (error) {
    console.error('Error creating workout:', error);
    return json({ error: 'Failed to create workout' }, { status: 500 });
  }
}