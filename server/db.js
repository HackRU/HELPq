const mongodb = require("mongo");

const withDB = (db) => (req, res, next) => {
    next(req, res, db);
};
