import { j as json } from './index-CccDCyu_.js';
import { s as statements } from './db-DfJ-an5k.js';
import 'better-sqlite3';

async function GET({ url }) {
  const limit = url.searchParams.get("limit") || "50";
  const startDate = url.searchParams.get("start_date");
  const endDate = url.searchParams.get("end_date");
  try {
    let bodyMeasurements;
    if (startDate && endDate) {
      bodyMeasurements = statements.getBodyMeasurementsByDateRange.all({ start_date: startDate, end_date: endDate });
    } else {
      bodyMeasurements = statements.getBodyMeasurements.all(parseInt(limit));
    }
    return json(bodyMeasurements);
  } catch (error) {
    console.error("Error fetching body measurements:", error);
    return json({ error: "Failed to fetch body measurements" }, { status: 500 });
  }
}
async function POST({ request }) {
  try {
    const data = await request.json();
    const result = statements.insertBodyMeasurement.run({
      date: data.date,
      weight: data.weight || null,
      body_fat_percentage: data.body_fat_percentage || null,
      muscle_mass: data.muscle_mass || null,
      notes: data.notes || null
    });
    return json({ id: result.lastInsertRowid, success: true });
  } catch (error) {
    console.error("Error creating body measurement:", error);
    return json({ error: "Failed to create body measurement" }, { status: 500 });
  }
}

export { GET, POST };
//# sourceMappingURL=_server-D1oKJ9D0.js.map
