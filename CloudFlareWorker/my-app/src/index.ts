import { Response } from '@cloudflare/workers-types/experimental';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		console.log(request.body);
		console.log(request.headers);
		console.log(request.method);

		if (request.method === 'GET') {
			return Response.json({
				Message: 'Get Request Send',
			});
		} else {
			return Response.json({
				Message: 'Not a Get Request Send ',
			});
		}

		return new Response('Hello World!');
	},
};
