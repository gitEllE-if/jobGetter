const DB_URL = process.env.DATABASE_URL || "postgres://durqzrnganiads:893d5b4e555cdabc1d0176f02267f8a29f859743d5ef393bbdfcd91ddce5f414@ec2-52-19-170-215.eu-west-1.compute.amazonaws.com:5432/d3kv1h93badmsf";

const DB_CONFIG = {
    uri: DB_URL,
    tableVacancies: "vacancies",
    tableUsers: "users"
}

module.exports = DB_CONFIG;
