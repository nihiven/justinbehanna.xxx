import Database from 'better-sqlite3';

const db = new Database("fitness.db", { verbose: null });
db.exec(`
  CREATE TABLE IF NOT EXISTS body_measurements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    weight REAL,
    body_fat_percentage REAL,
    muscle_mass REAL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    workout_duration INTEGER,
    calories_burned INTEGER,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    weight REAL,
    body_fat_percentage REAL,
    muscle_mass REAL,
    workout_duration INTEGER,
    calories_burned INTEGER,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_body_measurements_date ON body_measurements(date);
  CREATE INDEX IF NOT EXISTS idx_workouts_date ON workouts(date);
  CREATE INDEX IF NOT EXISTS idx_entries_date ON entries(date);
`);
const statements = {
  // Body measurements statements
  insertBodyMeasurement: db.prepare(`
    INSERT INTO body_measurements (date, weight, body_fat_percentage, muscle_mass, notes)
    VALUES (@date, @weight, @body_fat_percentage, @muscle_mass, @notes)
  `),
  getBodyMeasurements: db.prepare("SELECT * FROM body_measurements ORDER BY date DESC LIMIT ?"),
  getBodyMeasurementsByDateRange: db.prepare(`
    SELECT * FROM body_measurements 
    WHERE date BETWEEN @start_date AND @end_date 
    ORDER BY date ASC
  `),
  getLatestBodyMeasurement: db.prepare("SELECT * FROM body_measurements ORDER BY date DESC LIMIT 1"),
  // Workout statements
  insertWorkout: db.prepare(`
    INSERT INTO workouts (date, workout_duration, calories_burned, notes)
    VALUES (@date, @workout_duration, @calories_burned, @notes)
  `),
  getWorkouts: db.prepare("SELECT * FROM workouts ORDER BY date DESC LIMIT ?"),
  getWorkoutsByDateRange: db.prepare(`
    SELECT * FROM workouts 
    WHERE date BETWEEN @start_date AND @end_date 
    ORDER BY date ASC
  `),
  // Legacy entry statements (kept for backward compatibility)
  insertEntry: db.prepare(`
    INSERT INTO entries (date, weight, body_fat_percentage, muscle_mass, workout_duration, calories_burned, notes)
    VALUES (@date, @weight, @body_fat_percentage, @muscle_mass, @workout_duration, @calories_burned, @notes)
  `),
  getEntries: db.prepare("SELECT * FROM entries ORDER BY date DESC LIMIT ?"),
  getEntriesByDateRange: db.prepare(`
    SELECT * FROM entries 
    WHERE date BETWEEN @start_date AND @end_date 
    ORDER BY date ASC
  `),
  updateEntry: db.prepare(`
    UPDATE entries 
    SET weight = @weight, body_fat_percentage = @body_fat_percentage, 
        muscle_mass = @muscle_mass, workout_duration = @workout_duration,
        calories_burned = @calories_burned, notes = @notes
    WHERE id = @id
  `),
  deleteEntry: db.prepare("DELETE FROM entries WHERE id = ?")
};

export { statements as s };
//# sourceMappingURL=db-DfJ-an5k.js.map
