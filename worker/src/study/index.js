/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {

		const { pathname } = new URL(request.url);

		if (pathname === "/api/beverages") {
			// If you did not use `DB` as your binding name, change it here
			const { results } = await env.DB.prepare(
				"SELECT * FROM Customers WHERE CompanyName = ?",
			)
				.bind("Bs Beverages")
				.all();
			return Response.json(results);
		}
		if (pathname === "/api/kv") {
			// If you did not use `DB` as your binding name, change it here

			const value = await env.wplkvtest.get("1");

			if (value === null) {
				await env.wplkvtest.put("1","local1")
				return new Response("Value not found1", { status: 404 });
			}
			return new Response(value);
		}
		if (pathname === "/api/insertdb") {
			// If you did not use `DB` as your binding name, change it here
			const value = await env.DB.ENV.get("1");
			const jsonData = JSON.stringify({
				setting1: 'value1',
				setting2: 'value2',
				nestedSetting: {
					subSetting1: 'subValue1',
					subSetting2: 'subValue2'
				}
			});
			const result = await env.DB.prepare(
				"INSERT INTO settings (key, value) VALUES (?,?)"
			)
				.bind('json_setting_key', jsonData)
				.run();
			console.log('Insert result:', result);
			return result;
		}
		if (pathname === "/api/selectdb") {
			// If you did not use `DB` as your binding name, change it here
			const value = await env.DB.ENV.get("1");
			const jsonData = JSON.stringify({
				setting1: 'value1',
				setting2: 'value2',
				nestedSetting: {
					subSetting1: 'subValue1',
					subSetting2: 'subValue2'
				}
			});
			const result = await env.DB.prepare(
				"INSERT INTO settings (key, value) VALUES (?,?)"
			)
				.bind('json_setting_key', jsonData)
				.run();
			console.log('Insert result:', result);
			return result;
		}

		return new Response(
			"no api",
		);


		// return new Response('Hello Worker!1111');
	},
};
