import { x as head, y as attr } from './index2-Cd257xcu.js';

const favicon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%3e%3ctitle%3efitness-dumbbell%3c/title%3e%3c!--%20Dumbbell%20weights%20--%3e%3crect%20x='2'%20y='10'%20width='6'%20height='12'%20rx='2'%20fill='%23444'%20stroke='%23333'%20stroke-width='0.5'/%3e%3crect%20x='24'%20y='10'%20width='6'%20height='12'%20rx='2'%20fill='%23444'%20stroke='%23333'%20stroke-width='0.5'/%3e%3c!--%20Dumbbell%20bar%20--%3e%3crect%20x='8'%20y='14'%20width='16'%20height='4'%20rx='1'%20fill='%23666'%20stroke='%23555'%20stroke-width='0.5'/%3e%3c!--%20Handle%20grip%20lines%20--%3e%3cline%20x1='10'%20y1='15'%20x2='10'%20y2='17'%20stroke='%23777'%20stroke-width='0.5'/%3e%3cline%20x1='12'%20y1='15'%20x2='12'%20y2='17'%20stroke='%23777'%20stroke-width='0.5'/%3e%3cline%20x1='20'%20y1='15'%20x2='20'%20y2='17'%20stroke='%23777'%20stroke-width='0.5'/%3e%3cline%20x1='22'%20y1='15'%20x2='22'%20y2='17'%20stroke='%23777'%20stroke-width='0.5'/%3e%3c!--%20Sweat%20drops%20--%3e%3cellipse%20cx='7'%20cy='8'%20rx='1.5'%20ry='2'%20fill='%234A90E2'%20opacity='0.7'/%3e%3cellipse%20cx='11'%20cy='6'%20rx='1'%20ry='1.5'%20fill='%234A90E2'%20opacity='0.6'/%3e%3cellipse%20cx='21'%20cy='7'%20rx='1.2'%20ry='1.8'%20fill='%234A90E2'%20opacity='0.7'/%3e%3cellipse%20cx='25'%20cy='5'%20rx='0.8'%20ry='1.2'%20fill='%234A90E2'%20opacity='0.6'/%3e%3cellipse%20cx='16'%20cy='4'%20rx='1'%20ry='1.5'%20fill='%234A90E2'%20opacity='0.6'/%3e%3c!--%20Small%20sweat%20drops%20--%3e%3ccircle%20cx='9'%20cy='26'%20r='0.8'%20fill='%234A90E2'%20opacity='0.5'/%3e%3ccircle%20cx='23'%20cy='25'%20r='0.6'%20fill='%234A90E2'%20opacity='0.5'/%3e%3ccircle%20cx='14'%20cy='27'%20r='0.7'%20fill='%234A90E2'%20opacity='0.5'/%3e%3c/svg%3e";
function _layout($$payload, $$props) {
  let { children } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Fitness Tracker</title>`;
    $$payload2.out.push(`<link rel="icon"${attr("href", favicon)}/>`);
  });
  children?.($$payload);
  $$payload.out.push(`<!---->`);
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-C5U4QKXL.js.map
