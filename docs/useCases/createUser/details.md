| Use case name            | Create new user                                                            |
| ------------------------ | -------------------------------------------------------------------------- |
| Related Requirements     | [SR-CREATE-USER]                                                           |
| Goal In Context          | create a new user in the system                                            |
| Preconditions            | the database must be up and running                                        |
| Successful End Condition | a new user is created and a cookie with token and user id is linked to him |
| Failed End Condition     | the user is not created and a error message must be displayed              |
| Primary Actors           | User                                                                       |
| Secondary Actors         | Database                                                                   |
| Trigger                  | The user enter his username in the home page                               |

| Main flow  | Step | Action                                                                                            |
| ---------- | ---- | ------------------------------------------------------------------------------------------------- |
|            | 1    | The user enter his username                                                                       |
|            | 2    | The system check and validate the username                                                        |
|            | 3    | The system verify wether the username is already in use                                           |
|            | 4    | The system create the user on database                                                            |
|            | 5    | The system creates a new server-side session and bind a cookie with token and user id to the user |
|            | 6    | The user is redirected to the code page                                                           |
| Extensions | Step | Branching action                                                                                  |
|            | 2.1  | The username is not provided or has invalid characters or is greater than 25 characters           |
|            | 2.2  | The system don't validate the username and return a error message                                 |
|            | 3.1  | The username is already in use then the system return a error message                             |
