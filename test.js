const fetch = require('node-fetch');
const FormData = require('form-data');
(async function () {
	let response = await fetch('http://localhost:8000/api/login', {
		method: 'POST',
		body: JSON.stringify({
			name: 'onah victor',
			email: 'onahvictor,com',
			password: 'abcd123',
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	let data = await response.json();
	console.log(data);
})();
