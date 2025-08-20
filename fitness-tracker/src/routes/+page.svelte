<script>
  import { onMount } from 'svelte';
  import Chart from '$lib/Chart.svelte';

  let bodyMeasurements = [];
  let workouts = [];
  let activeTab = 'measurements';

  async function loadBodyMeasurements() {
    try {
      const response = await fetch('/api/body-measurements?limit=30');
      bodyMeasurements = await response.json();
    } catch (error) {
      console.error('Failed to load body measurements:', error);
    }
  }

  async function loadWorkouts() {
    try {
      const response = await fetch('/api/workouts?limit=30');
      workouts = await response.json();
    } catch (error) {
      console.error('Failed to load workouts:', error);
    }
  }

  onMount(() => {
    loadBodyMeasurements();
    loadWorkouts();
  });

  $: latestMeasurement = bodyMeasurements[0];
  $: weightData = bodyMeasurements
    .filter((e) => e.weight)
    .map((e) => ({ x: e.date, y: e.weight }))
    .reverse();
  $: bodyFatData = bodyMeasurements
    .filter((e) => e.body_fat_percentage)
    .map((e) => ({ x: e.date, y: e.body_fat_percentage }))
    .reverse();
</script>

<div class="dashboard">
  <header>
    <h1>Fitness!</h1>
  </header>

  <div class="tabs">
    <button
      class="tab-btn {activeTab === 'measurements' ? 'active' : ''}"
      on:click={() => (activeTab = 'measurements')}
    >
      Body Measurements
    </button>
    <button class="tab-btn {activeTab === 'workouts' ? 'active' : ''}" on:click={() => (activeTab = 'workouts')}>
      Workouts
    </button>
  </div>

  {#if activeTab === 'measurements'}
    <div class="tab-content">
      {#if latestMeasurement}
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Latest Weight</h3>
            <p class="stat-value">{latestMeasurement.weight || 'N/A'}</p>
            <small>{latestMeasurement.date}</small>
          </div>
          <div class="stat-card">
            <h3>Body Fat %</h3>
            <p class="stat-value">{latestMeasurement.body_fat_percentage || 'N/A'}</p>
            <small>{latestMeasurement.date}</small>
          </div>
          <div class="stat-card">
            <h3>Muscle Mass</h3>
            <p class="stat-value">{latestMeasurement.muscle_mass || 'N/A'}</p>
            <small>{latestMeasurement.date}</small>
          </div>
        </div>
      {/if}

      <div class="charts-grid">
        {#if weightData.length > 0}
          <div class="chart-container">
            <h3>Weight Progress</h3>
            <Chart data={weightData} label="Weight (lbs)" color="rgb(75, 192, 192)" />
          </div>
        {/if}

        {#if bodyFatData.length > 0}
          <div class="chart-container">
            <h3>Body Fat Progress</h3>
            <Chart data={bodyFatData} label="Body Fat %" color="rgb(255, 99, 132)" />
          </div>
        {/if}
      </div>

      {#if bodyMeasurements.length === 0}
        <div class="empty-state">
          <p>No body measurements yet.</p>
        </div>
      {/if}
    </div>
  {:else}
    <div class="tab-content">
      {#if workouts.length > 0}
        <div class="workouts-section">
          <h3>Recent Workouts</h3>
          <div class="workouts-list">
            {#each workouts.slice(0, 10) as workout}
              <div class="workout-item">
                <div class="workout-date">{workout.date}</div>
                <div class="workout-details">
                  {#if workout.workout_duration}Duration: {workout.workout_duration}min{/if}
                  {#if workout.calories_burned}
                    • Calories: {workout.calories_burned}{/if}
                  {#if workout.notes}
                    • {workout.notes}{/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {:else}
        <div class="empty-state">
          <p>No workouts yet.</p>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
  }

  .tabs {
    display: flex;
    background: white;
    border-radius: 12px;
    padding: 0.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h1 {
    color: #333;
    margin: 0;
  }

  .add-btn {
    background: #007acc;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
  }

  .add-btn:hover {
    background: #005999;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .stat-card h3 {
    margin: 0 0 0.5rem 0;
    color: #666;
    font-size: 0.9rem;
    text-transform: uppercase;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    color: #333;
  }

  .charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .chart-container {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .chart-container h3 {
    margin: 0 0 1rem 0;
    color: #333;
  }

  .workouts-section {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .workouts-section h3 {
    margin: 0 0 1rem 0;
    color: #333;
  }

  .workouts-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .workout-item {
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .workout-date {
    font-weight: 600;
    color: #333;
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
  }

  .workout-details {
    color: #666;
    font-size: 0.85rem;
    line-height: 1.4;
  }

  .empty-state {
    text-align: center;
    padding: 3rem;
    color: #666;
  }

  .empty-state p {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    .dashboard {
      padding: 1rem;
    }

    .charts-grid {
      grid-template-columns: 1fr;
    }

    .chart-container {
      min-width: 0;
    }
  }
</style>
