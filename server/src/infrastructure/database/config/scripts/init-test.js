const config = {
    _id: 'dbrs',
    version: 1,
    members: [
      {
        _id: 1,
        host: 'safetalk_db_test:27030',
        priority: 3
      },
      {
        _id: 2,
        host: 'safetalk_db_test_replica_1:27031',
        priority: 2
      },
      {
        _id: 3,
        host: 'safetalk_db_test_replica_2:27032',
        priority: 1
      }
    ]
  }
  rs.initiate(config, { force: true })
  rs.status()
  