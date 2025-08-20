<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let formData = {
    date: new Date().toISOString().split('T')[0],
    workout_duration: '',
    calories_burned: '',
    notes: ''
  };

  let isSubmitting = false;

  async function handleSubmit() {
    if (isSubmitting) return;
    
    isSubmitting = true;
    
    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          workout_duration: formData.workout_duration ? parseInt(formData.workout_duration) : null,
          calories_burned: formData.calories_burned ? parseInt(formData.calories_burned) : null
        })
      });

      if (response.ok) {
        dispatch('workoutAdded');
        
        formData = {
          date: new Date().toISOString().split('T')[0],
          workout_duration: '',
          calories_burned: '',
          notes: ''
        };
      } else {
        console.error('Failed to save workout');
      }
    } catch (error) {
      console.error('Error saving workout:', error);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="workout-form">
  <h2>Add Workout</h2>
  
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
      placeholder="Workout details, exercises performed, how you felt..."
      bind:value={formData.notes}
      rows="4"
    ></textarea>
  </div>

  <div class="form-actions">
    <button type="submit" disabled={isSubmitting} class="submit-btn">
      {isSubmitting ? 'Saving...' : 'Save Workout'}
    </button>
  </div>
</form>

<style>
  .workout-form {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
  }

  .workout-form h2 {
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
    min-height: 100px;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }

  .submit-btn {
    background: #fd7e14;
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
    background: #e85d04;
  }

  .submit-btn:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .workout-form {
      padding: 1.5rem;
    }
    
    .form-grid {
      grid-template-columns: 1fr;
    }
  }
</style>