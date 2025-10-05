const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '/dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{
				test: /\.(jpg|png|svg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: './',
							useRelativePath: true,
						},
					},
				],
			},
		],
	},
	plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
}
