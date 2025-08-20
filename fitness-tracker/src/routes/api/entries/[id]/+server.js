import { json } from '@sveltejs/kit';
import { statements } from '$lib/db.js';

export async function PUT({ params, request }) {
  try {
    const data = await request.json();
    const id = parseInt(params.id);
    
    statements.updateEntry.run({
      id,
      weight: data.weight || null,
      body_fat_percentage: data.body_fat_percentage || null,
      muscle_mass: data.muscle_mass || null,
      workout_duration: data.workout_duration || null,
      calories_burned: data.calories_burned || null,
      notes: data.notes || null
    });
    
    return json({ success: true });
  } catch (error) {
    console.error('Error updating entry:', error);
    return json({ error: 'Failed to update entry' }, { status: 500 });
  }
}

export async function DELETE({ params }) {
  try {
    const id = parseInt(params.id);
    statements.deleteEntry.run(id);
    
    return json({ success: true });
  } catch (error) {
    console.error('Error deleting entry:', error);
    return json({ error: 'Failed to delete entry' }, { status: 500 });
  }
}