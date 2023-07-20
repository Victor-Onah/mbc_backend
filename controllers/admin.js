const Product = require('../models/product');
const { writeFile, readFileSync } = require('fs');
const { resolve } = require('path');

const uploadProduct = async (req, res, next) => {
	await import('formidable')
		.then((module) => {
			let form = new module.IncomingForm({
				keepExtensions: true,
			});
			form.parse(req, async (error, fields, files) => {
				let { image } = files;
				let filename = image[0].newFilename;
				console.log(image.filepath);
				let raw = readFileSync(image[0].filepath);
				let newFilePath = resolve(__dirname, '../view/uploads', filename);
				writeFile(newFilePath, raw, async (error) => {
					if (error) {
						return res.json({
							success: false,
							message:
								'Failed to complete request because, there was an error in file upload.',
						});
					}
					let { name, price, description } = fields;
					await Product.create({
						name: name[0],
						price: price[0],
						image: newFilePath,
						description: description[0],
					})
						.then((doc) => res.json({ success: true, data: { ...doc._doc } }))
						.catch((error) => {
							res.json({
								success: false,
								message: 'An unexpected error occurred',
							});
							next(error);
						});
				});
			});
		})
		.catch((error) => {
			res.json({
				success: false,
				message: 'An unexpected error occurred',
			});
			next(error);
		});
};

module.exports = { uploadProduct };
