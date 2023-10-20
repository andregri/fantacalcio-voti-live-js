/**
 * Welcome to Cloudflare Workers!
 *
 * This is a template for a Scheduled Worker: a Worker that can run on a
 * configurable interval:
 * https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	// The scheduled handler is invoked at the interval set in our wrangler.toml's
	// [[triggers]] configuration.
	async scheduled(event, env, ctx) {
		// Get data from api
		const api = require('api');
		const match = 9;
		const signedUri = await api.getSignedUri(match);
		if (!signedUri.response.ok) {
			console.log("couldn't get signed uri");
			return;
		}
		const protoMsg = await api.getProtobufMessage(signedUri.response.text())
		if (!protoMsg.ok) {
			console.log("couldn't get proto message");
			return;
		}
		const msg = api.decodeProtobufMessage(msg, './proto.json')

		// You could store this result in KV, write to a D1 Database, or publish to a Queue.
		// In this template, we'll just log the result:
		console.log(`trigger fired at ${event.cron}: ${wasSuccessful}`);
	},
};
