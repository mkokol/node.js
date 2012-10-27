module.exports = {
    env: "dev"
    , "db": {
        dev: {
            "host": "localhost"
            , "name": "companies_contacts"
        }
        , test: {
            "host": "localhost"
            , "name": "test_companies_contacts"
        }
    }
    , "paging": {
        "count" : 15
    }
}
