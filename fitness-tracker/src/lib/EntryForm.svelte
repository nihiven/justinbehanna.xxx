<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let formData = {
    date: new Date().toISOString().split('T')[0],
    weight: '',
    body_fat_percentage: '',
    muscle_mass: '',
    workout_duration: '',
    calories_burned: '',
    notes: ''
  };

  let isSubmitting = false;

  async function handleSubmit() {
    if (isSubmitting) return;
    
    isSubmitting = true;
    
    try {
      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          weight: formData.weight ? parseFloat(formData.weight) : null,
          body_fat_percentage: formData.body_fat_percentage ? parseFloat(formData.body_fat_percentage) : null,
          muscle_mass: formData.muscle_mass ? parseFloat(formData.muscle_mass) : null,
          workout_duration: formData.workout_duration ? parseInt(formData.workout_duration) : null,
          calories_burned: formData.calories_burned ? parseInt(formData.calories_burned) : null
        })
      });

      if (response.ok) {
        dispatch('entryAdded');
        
        formData = {
          date: new Date().toISOString().split('T')[0],
          weight: '',
          body_fat_percentage: '',
          muscle_mass: '',
          workout_duration: '',
          calories_burned: '',
          notes: ''
        };
      } else {
        console.error('Failed to save entry');
      }
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="entry-form">
  <h2>Add New Entry</h2>
  
  <div class="form-grid">
    <div class="form-group">
      <label for="date">Date</label>
      <input 
        type="date" 
        id="date" 
        bind:value={formData.date} 
        required 
      />
    </div>

    <div class="form-group">
      <label for="weight">Weight (lbs)</label>
      <input 
        type="number" 
        id="weight" 
        step="0.1" 
        placeholder="e.g. 150.5"
        bind:value={formData.weight} 
      />
    </div>

    <div class="form-group">
      <label for="body_fat">Body Fat %</label>
      <input 
        type="number" 
        id="body_fat" 
        step="0.1" 
        placeholder="e.g. 15.2"
        bind:value={formData.body_fat_percentage} 
      />
    </div>

    <div class="form-group">
      <label for="muscle_mass">Muscle Mass (lbs)</label>
      <input 
        type="number" 
        id="muscle_mass" 
        step="0.1" 
        placeholder="e.g. 125.0"
        bind:value={formData.muscle_mass} 
      />
    </div>

    <div class="form-group">
      <label for="workout_duration">Workout Duration (minutes)</label>
      <input 
        type="number" 
        id="workout_duration" 
        placeholder="e.g. 45"
        bind:value={formData.workout_duration} 
      />
    </div>

    <div class="form-group">
      <label for="calories_burned">Calories Burned</label>
      <input 
        type="number" 
        id="calories_burned" 
        placeholder="e.g. 300"
        bind:value={formData.calories_burned} 
      />
    </div>
  </div>

  <div class="form-group full-width">
    <label for="notes">Notes</label>
    <textarea 
      id="notes" 
      placeholder="Any additional notes about your workout, diet, or how you're feeling..."
      bind:value={formData.notes}
      rows="3"
    ></textarea>
  </div>

  <div class="form-actions">
    <button type="submit" disabled={isSubmitting} class="submit-btn">
      {isSubmitting ? 'Saving...' : 'Save Entry'}
    </button>
  </div>
</form>

<style>
  .entry-form {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
  }

  .entry-form h2 {
    margin: 0 0 1.5rem 0;
    color: #333;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .full-width {
    grid-column: 1 / -1;
  }

  label {
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #333;
    font-size: 0.9rem;
  }

  input, textarea {
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #007acc;
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }

  .submit-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .submit-btn:hover:not(:disabled) {
    background: #218838;
  }

  .submit-btn:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .entry-form {
      padding: 1.5rem;
    }
    
    .form-grid {
      grid-template-columns: 1fr;
    }
  }
</style>