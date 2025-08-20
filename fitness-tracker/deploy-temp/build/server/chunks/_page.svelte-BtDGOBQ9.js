import { t as push, x as head, G as attr_class, v as pop, y as attr, z as escape_html, N as stringify } from './index2-Cd257xcu.js';
import './utils-Bg2Rux6K.js';
import './state.svelte-AZs1bkJx.js';
import './utils2-Bl_acQ9N.js';

function BodyMeasurementForm($$payload, $$props) {
  push();
  let formData = {
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    weight: "",
    body_fat_percentage: "",
    muscle_mass: "",
    notes: ""
  };
  let isSubmitting = false;
  $$payload.out.push(`<form class="measurement-form svelte-okg03m"><h2 class="svelte-okg03m">Add Body Measurement</h2> <div class="form-grid svelte-okg03m"><div class="form-group svelte-okg03m"><label for="date" class="svelte-okg03m">Date</label> <input type="date" id="date"${attr("value", formData.date)} required class="svelte-okg03m"/></div> <div class="form-group svelte-okg03m"><label for="weight" class="svelte-okg03m">Weight (lbs)</label> <input type="number" id="weight" step="0.1" placeholder="e.g. 150.5"${attr("value", formData.weight)} class="svelte-okg03m"/></div> <div class="form-group svelte-okg03m"><label for="body_fat" class="svelte-okg03m">Body Fat %</label> <input type="number" id="body_fat" step="0.1" placeholder="e.g. 15.2"${attr("value", formData.body_fat_percentage)} class="svelte-okg03m"/></div> <div class="form-group svelte-okg03m"><label for="muscle_mass" class="svelte-okg03m">Muscle Mass (lbs)</label> <input type="number" id="muscle_mass" step="0.1" placeholder="e.g. 125.0"${attr("value", formData.muscle_mass)} class="svelte-okg03m"/></div></div> <div class="form-group full-width svelte-okg03m"><label for="notes" class="svelte-okg03m">Notes</label> <textarea id="notes" placeholder="Any notes about your measurements, diet, or how you're feeling..." rows="3" class="svelte-okg03m">`);
  const $$body = escape_html(formData.notes);
  if ($$body) {
    $$payload.out.push(`${$$body}`);
  }
  $$payload.out.push(`</textarea></div> <div class="form-actions svelte-okg03m"><button type="submit"${attr("disabled", isSubmitting, true)} class="submit-btn svelte-okg03m">${escape_html("Save Measurement")}</button></div></form>`);
  pop();
}
function _page($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Admin - Add Entry</title>`;
  });
  $$payload.out.push(`<div class="admin-page svelte-v9ju7m"><header class="svelte-v9ju7m"><h1 class="svelte-v9ju7m">Admin - Add New Entry</h1> <button class="dashboard-btn svelte-v9ju7m">← Back to Dashboard</button></header> <div class="tabs svelte-v9ju7m"><button${attr_class(`tab-btn ${stringify("active")}`, "svelte-v9ju7m")}>Body Measurement</button> <button${attr_class(`tab-btn ${stringify("")}`, "svelte-v9ju7m")}>Workout</button></div> <div class="tab-content svelte-v9ju7m">`);
  {
    $$payload.out.push("<!--[-->");
    BodyMeasurementForm($$payload);
  }
  $$payload.out.push(`<!--]--></div></div>`);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BtDGOBQ9.js.map
