(function() {
  var mongoose = require('mongoose');
  var dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/tablesTonight';
  var dbConnection = null;

  initializeDbConnection();
  module.exports.db = dbConnection;

  function initializeDbConnection() {
    mongoose.connect(dbUrl);
    dbConnection = mongoose.connection;
    dbConnection.on('error', console.error.bind(console, 'connection error:'));
    dbConnection.once('open', function() {
      console.log("database connected!");
    });
  }

})();
