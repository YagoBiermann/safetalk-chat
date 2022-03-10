# Create new room

| Use case name            | Create new room                                           |
| ------------------------ | --------------------------------------------------------- |
| Related Requirements     | [SR-CREATE-ROOM]                                          |
| Goal In Context          | create a new chat room                                    |
| Preconditions            | an user should be already created                         |
| Successful End Condition | a new room is created and linked to the user              |
| Failed End Condition     | the room is not created and an error message is displayed |
| Primary Actors           | User                                                      |
| Secondary Actors         | Database                                                  |
| Trigger                  | The user hit the create room button                       |

| Main flow  | Step | Action                                            |
| ---------- | ---- | ------------------------------------------------- |
|            | 1    | The user clicks on the create room button         |
|            | 2    | include::Authorize request                        |
|            | 3    | include::validate room code                       |
|            | 4    | The system check if the code is already in use    |
|            | 5    | The system create a new room on database          |
|            | 6    | The system update the user info with the room id  |
|            | 6    | The system update the token with a new secret key |
|            | 7    | The system redirect the user to the chat room     |
| Extensions | Step | Branching action                                  |
|            | 4.1  | the code is already in use                        |
|            | 4.2  | generate a new room code                          |
