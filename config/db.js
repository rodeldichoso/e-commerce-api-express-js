const knex = require('knex');
const config = require('../knexfile'); // points to the exported environments

const db = knex(config[process.env.NODE_ENV || 'development']);

module.exports = db;