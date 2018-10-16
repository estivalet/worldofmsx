# worldofmsx
- open a command line in the bin folder
- start it! mongod.exe --dbpath data

References used to program this tool:

* https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
* https://mongoosejs.com/docs/populate.html
* https://www.toptal.com/nodejs/secure-rest-api-in-nodejs



Import data:

mongoimport --jsonArray --db msxdb --collection countries --file countries.json


