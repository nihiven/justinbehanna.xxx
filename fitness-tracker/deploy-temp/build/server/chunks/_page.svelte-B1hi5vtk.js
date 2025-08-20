import { t as push, G as attr_class, z as escape_html, v as pop, J as bind_props, K as current_component, N as stringify } from './index2-Cd257xcu.js';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { j as fallback } from './utils2-Bl_acQ9N.js';

function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
function Chart_1($$payload, $$props) {
  push();
  let data = fallback($$props["data"], () => [], true);
  let label = fallback($$props["label"], "Value");
  let color = fallback($$props["color"], "rgb(75, 192, 192)");
  Chart.register(...registerables);
  onDestroy(() => {
  });
  $$payload.out.push(`<div class="chart-wrapper svelte-1krdyz5"><canvas></canvas></div>`);
  bind_props($$props, { data, label, color });
  pop();
}
function _page($$payload, $$props) {
  push();
  let latestMeasurement, weightData, bodyFatData;
  let bodyMeasurements = [];
  latestMeasurement = bodyMeasurements[0];
  weightData = bodyMeasurements.filter((e) => e.weight).map((e) => ({ x: e.date, y: e.weight })).reverse();
  bodyFatData = bodyMeasurements.filter((e) => e.body_fat_percentage).map((e) => ({ x: e.date, y: e.body_fat_percentage })).reverse();
  $$payload.out.push(`<div class="dashboard svelte-wglqrx"><header class="svelte-wglqrx"><h1 class="svelte-wglqrx">Fitness Tracker</h1></header> <div class="tabs svelte-wglqrx"><button${attr_class(`tab-btn ${stringify("active")}`, "svelte-wglqrx")}>Body Measurements</button> <button${attr_class(`tab-btn ${stringify("")}`, "svelte-wglqrx")}>Workouts</button></div> `);
  {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="tab-content svelte-wglqrx">`);
    if (latestMeasurement) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<div class="stats-grid svelte-wglqrx"><div class="stat-card svelte-wglqrx"><h3 class="svelte-wglqrx">Latest Weight</h3> <p class="stat-value svelte-wglqrx">${escape_html(latestMeasurement.weight || "N/A")}</p> <small>${escape_html(latestMeasurement.date)}</small></div> <div class="stat-card svelte-wglqrx"><h3 class="svelte-wglqrx">Body Fat %</h3> <p class="stat-value svelte-wglqrx">${escape_html(latestMeasurement.body_fat_percentage || "N/A")}</p> <small>${escape_html(latestMeasurement.date)}</small></div> <div class="stat-card svelte-wglqrx"><h3 class="svelte-wglqrx">Muscle Mass</h3> <p class="stat-value svelte-wglqrx">${escape_html(latestMeasurement.muscle_mass || "N/A")}</p> <small>${escape_html(latestMeasurement.date)}</small></div></div>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--> <div class="charts-grid svelte-wglqrx">`);
    if (weightData.length > 0) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<div class="chart-container svelte-wglqrx"><h3 class="svelte-wglqrx">Weight Progress</h3> `);
      Chart_1($$payload, {
        data: weightData,
        label: "Weight (lbs)",
        color: "rgb(75, 192, 192)"
      });
      $$payload.out.push(`<!----></div>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--> `);
    if (bodyFatData.length > 0) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<div class="chart-container svelte-wglqrx"><h3 class="svelte-wglqrx">Body Fat Progress</h3> `);
      Chart_1($$payload, {
        data: bodyFatData,
        label: "Body Fat %",
        color: "rgb(255, 99, 132)"
      });
      $$payload.out.push(`<!----></div>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div> `);
    if (bodyMeasurements.length === 0) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<div class="empty-state svelte-wglqrx"><p class="svelte-wglqrx">No body measurements yet.</p></div>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div>`);
  }
  $$payload.out.push(`<!--]--></div>`);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B1hi5vtk.js.map
