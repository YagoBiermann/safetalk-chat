create a file named as keyfile.pem with the following command:

`openssl rand -base64 768 > keyfile.pem`

give read permissions to the file:

`chmod 400 keyfile.pem`

----

#### important step
enter on safetalk_db container and change the file owner:

`sudo chown mongodb:mongodb data/keyfile.pem`

*if the command above isn't executed the mongodb will fail with a message saying that was unable to acquire security keys*