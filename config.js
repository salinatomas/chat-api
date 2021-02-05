const config = {
  dbUrl:
    process.env.DB_URL ||
    "mongodb://db_user_platzigram:xZ25tHQ1TOkxe4DQ@cluster0-shard-00-00.ggo0x.mongodb.net:27017,cluster0-shard-00-01.ggo0x.mongodb.net:27017,cluster0-shard-00-02.ggo0x.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-8rpod0-shard-0&authSource=admin&retryWrites=true&w=majority",
  port: process.env.PORT || 3000,
  host: process.env.HOST || "http://localhost",
  publicRoute: process.env.PUBLIC_ROUTE || "/app",
  filesRoute: process.env.FILES_ROUTE || "/files",
};

module.exports = config;
