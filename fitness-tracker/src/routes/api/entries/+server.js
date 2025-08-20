import { json } from '@sveltejs/kit';
import { statements } from '$lib/db.js';

export async function GET({ url }) {
  const limit = url.searchParams.get('limit') || '50';
  const startDate = url.searchParams.get('start_date');
  const endDate = url.searchParams.get('end_date');

  try {
    let bodyMeasurements, workouts;
    
    if (startDate && endDate) {
      bodyMeasurements = statements.getBodyMeasurementsByDateRange.all({ start_date: startDate, end_date: endDate });
      workouts = statements.getWorkoutsByDateRange.all({ start_date: startDate, end_date: endDate });
    } else {
      bodyMeasurements = statements.getBodyMeasurements.all(parseInt(limit));
      workouts = statements.getWorkouts.all(parseInt(limit));
    }
    
    return json({
      bodyMeasurements,
      workouts
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const data = await request.json();
    const results = {};
    
    // Insert body measurement if weight, body fat %, or muscle mass is provided
    if (data.weight || data.body_fat_percentage || data.muscle_mass) {
      const bodyMeasurementResult = statements.insertBodyMeasurement.run({
        date: data.date,
        weight: data.weight || null,
        body_fat_percentage: data.body_fat_percentage || null,
        muscle_mass: data.muscle_mass || null,
        notes: data.notes || null
      });
      results.bodyMeasurement = { id: bodyMeasurementResult.lastInsertRowid };
    }
    
    // Insert workout if workout duration or calories burned is provided
    if (data.workout_duration || data.calories_burned) {
      const workoutResult = statements.insertWorkout.run({
        date: data.date,
        workout_duration: data.workout_duration || null,
        calories_burned: data.calories_burned || null,
        notes: data.notes || null
      });
      results.workout = { id: workoutResult.lastInsertRowid };
    }
    
    return json({ ...results, success: true });
  } catch (error) {
    console.error('Error creating entry:', error);
    return json({ error: 'Failed to create entry' }, { status: 500 });
  }
}