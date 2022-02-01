# Authorize request on protected route

| Use case name            | authorize request on protected route                      |
| ------------------------ | --------------------------------------------------------- |
| Related Requirements     | [SR-CREATE-ROOM, SR-JOIN-ROOM, SR-UNAUTHORIZED-ACCESS]    |
| Goal In Context          | validate user identity and info                           |
| Preconditions            | an user should be already created                         |
| Successful End Condition | the user identity is verified                             |
| Failed End Condition     | the system fails to validate the user identity            |
| Primary Actors           | User                                                      |
| Secondary Actors         | Database                                                  |
| Trigger                  | The client makes a request on one of the protected routes |

| Main flow  | Step  | Action                                              |
| ---------- | ----- | --------------------------------------------------- |
|            | 1     | The client makes a request on some protected route  |
|            | 2     | The system check if a token is present              |
|            | 3     | The system check if the user exists on the database |
|            | 4     | The system validate the token                       |
|            | 5     | The system allow the user to access the route       |
| Extensions | Step  | Branching action                                    |
|            | 2.1   | the token is not present                            |
|            | 2.2   | return an error message                             |
|            | 3.1   | the user doesn't exists on the database             |
|            | 3.2   | return an error message                             |
|            | 4.1   | the user is in some room                            |
|            | 4.1.2 | validate token with the room secret key             |
|            | 4.2   | the user is not in some room                        |
|            | 4.2.2 | validate with default secret key                    |
|            | 4.3   | the token is invalid                                |
|            | 4.3   | return error message                                |
