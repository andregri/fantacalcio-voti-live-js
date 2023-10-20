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
		const api = require('./api');

		const match = 9;
		const {signedUri, headerServerDate} = await api.getSignedUri(match);
		if (!signedUri) {
			console.log("couldn't get signedUri");
			return;
		}

		const protoMsg = await api.getProtobufMessage(signedUri)
		if (!protoMsg.ok) {
			console.log("couldn't get proto message");
			return;
		}
		const newData = api.decodeProtobufMessage(msg, './proto.json')

		// TODO
		const serverDate = new Date(headerServerDate);
		const serverDateLastUpdate = new Date();
		const serverDeltaTime = serverDateLastUpdate.getTime() - serverDate.getTime();
		console.log(serverDeltaTime)

		const dataLib = require('./data')
		//const dataArray = null // TODO: get data array from storage
		//dataLib.appendLiveData(dataArray, newData, serverDeltaTime)
		// TODO: push dataArray to storage
	},
};
