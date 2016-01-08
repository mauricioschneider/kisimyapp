"use strict"

let http = require('http'),
		url = require('url'),
		server = http.Server()

let KisiClient = require('kisi-client')

let config = require('./config')

server.on('request', (req, res) => {
	let parsedUrl = url.parse(req.url, true)

	if (!authorized(parsedUrl.query)) {
		return handleError(res, new Error('You shall not pass!... Like, literally'), 401)
	}

	let kisi = new KisiClient()

	kisi.authenticate(config.email, config.password).then((response)=>{
		console.log("I'm your fa...ahem, doorman")
		let unlockUrl = '/places/' + config.placeId + '/locks/' + config.lockId + '/access.json'
		kisi.post(unlockUrl).then((response) => {
			res.statusCode = 200
			res.end('"I\'ll allow it" (Senor Chang, Community Season 1, Episode 12)')
		}).error((boom) => {
			return handleError(res, boom.res.error)
		})
	}).error((boom) => {
		return handleError(res, boom.res.error, boom.res.error.status)
	})
})

function handleError(res, err, code) {
		res.statusCode = code
		res.end(err.toString())
}

function authorized(query) {
	if (!query.apikey || config.allowedApiKeys.indexOf(query.apikey) === -1)
		return false
	return true
}

server.listen(8080)
