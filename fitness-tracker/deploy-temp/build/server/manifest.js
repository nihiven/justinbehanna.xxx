const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.CLLurLvI.js",app:"_app/immutable/entry/app.DMZAurNG.js",imports:["_app/immutable/entry/start.CLLurLvI.js","_app/immutable/chunks/9pyw65pj.js","_app/immutable/chunks/Wt3tS8zE.js","_app/immutable/chunks/DmoEL9Oe.js","_app/immutable/entry/app.DMZAurNG.js","_app/immutable/chunks/DmoEL9Oe.js","_app/immutable/chunks/Wt3tS8zE.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/B2n_k7q2.js","_app/immutable/chunks/BrOV06zn.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BEuwpwl2.js')),
			__memo(() => import('./chunks/1-BCCa2dcn.js')),
			__memo(() => import('./chunks/2-COUKDQ1Q.js')),
			__memo(() => import('./chunks/3-BLKSOvdG.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/admin/add",
				pattern: /^\/admin\/add\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/body-measurements",
				pattern: /^\/api\/body-measurements\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-D1oKJ9D0.js'))
			},
			{
				id: "/api/entries",
				pattern: /^\/api\/entries\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DSIawkSk.js'))
			},
			{
				id: "/api/entries/[id]",
				pattern: /^\/api\/entries\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DeIsbAw2.js'))
			},
			{
				id: "/api/workouts",
				pattern: /^\/api\/workouts\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Bx6pruRz.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
