# kisimyapp
cURLing the way in with Kisi + Node.JS

This is an example project on how to use the [Kisi](https://getkisi.com) API and their Node.JS client.

## Usage

### Install dependencies

```
npm install
```

### Generate API key
```
md5 -s 'any string'
```

### Configuration
- Copy or rename config.example.json to config.json
- Add your newly created API key
- Add your placeId and lockId*

Soon I'll add a way of figuring out these if you don't know how

### Run the server
```
node index.js
```

### cURL it!
```curl localhost/?apikey=da2218c6420e51edfc199ce49d586927```
