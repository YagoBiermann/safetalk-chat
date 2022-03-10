const config = {
  _id: 'dbrs',
  version: 1,
  members: [
    {
      _id: 1,
      host: 'safetalk_db:27017',
      priority: 3
    },
    {
      _id: 2,
      host: 'safetalk_db_replica_1:27018',
      priority: 2
    },
    {
      _id: 3,
      host: 'safetalk_db_replica_2:27019',
      priority: 1
    }
  ]
}
rs.initiate(config, { force: true })
rs.status()
