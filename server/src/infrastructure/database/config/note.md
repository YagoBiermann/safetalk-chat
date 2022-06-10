1°: create a file named as keyfile.pem with the following command:

`openssl rand -base64 768 > keyfile.pem`

2°: give read permissions to the file:

`chmod 400 keyfile.pem`

----

#### important step
3°: run the following command on safetalk_db container
this command is required in order to avoid a bug that makes the database doesn't recognize the security keys.

`docker exec safetalk_db sudo chown mongodb:mongodb data/keyfile.pem`

or enter in the safetalk_db and run directly in the cli

`sudo chown mongodb:mongodb data/keyfile.pem`

*if none of the commands above isn't executed the mongodb will fail with a message saying that was unable to acquire security keys*