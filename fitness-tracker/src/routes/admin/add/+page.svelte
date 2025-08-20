<script>
  import { goto } from '$app/navigation';
  import BodyMeasurementForm from '$lib/BodyMeasurementForm.svelte';
  import WorkoutForm from '$lib/WorkoutForm.svelte';

  let activeTab = 'measurements';

  async function handleMeasurementAdded() {
    alert('Body measurement saved successfully!');
  }

  async function handleWorkoutAdded() {
    alert('Workout saved successfully!');
  }

  function goToDashboard() {
    goto('/');
  }
</script>

<svelte:head>
  <title>Admin - Add Entry</title>
</svelte:head>

<div class="admin-page">
  <header>
    <h1>Admin - Add New Entry</h1>
    <button on:click={goToDashboard} class="dashboard-btn">
      ← Back to Dashboard
    </button>
  </header>

  <div class="tabs">
    <button 
      class="tab-btn {activeTab === 'measurements' ? 'active' : ''}"
      on:click={() => activeTab = 'measurements'}
    >
      Body Measurement
    </button>
    <button 
      class="tab-btn {activeTab === 'workouts' ? 'active' : ''}"
      on:click={() => activeTab = 'workouts'}
    >
      Workout
    </button>
  </div>

  <div class="tab-content">
    {#if activeTab === 'measurements'}
      <BodyMeasurementForm on:measurementAdded={handleMeasurementAdded} />
    {:else}
      <WorkoutForm on:workoutAdded={handleWorkoutAdded} />
    {/if}
  </div>
</div>

<style>
  .admin-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: #f8f9fa;
    min-height: 100vh;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  h1 {
    color: #333;
    margin: 0;
    font-size: 1.5rem;
  }

  .dashboard-btn {
    background: #6c757d;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
    transition: background-color 0.2s;
  }

  .dashboard-btn:hover {
    background: #5a6268;
  }

  .tabs {
    display: flex;
    background: white;
    border-radius: 12px;
    padding: 0.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .tab-btn {
    flex: 1;
    padding: 0.75rem 1.5rem;
    border: none;
    background: transparent;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    color: #666;
  }

  .tab-btn.active {
    background: #007acc;
    color: white;
  }

  .tab-btn:hover:not(.active) {
    background: #f8f9fa;
  }

  .tab-content {
    animation: fadeIn 0.3s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .admin-page {
      padding: 1rem;
    }
    
    header {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
    
    .tabs {
      flex-direction: column;
    }
  }
</style>