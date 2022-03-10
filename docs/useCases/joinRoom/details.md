# Join room

| Use case name            | Join room                                                      |
| ------------------------ | -------------------------------------------------------------- |
| Related Requirements     | [SR-JOIN-ROOM]                                                 |
| Goal In Context          | join a chat room                                               |
| Preconditions            | an user should be already created                              |
| Successful End Condition | the user join the room                                         |
| Failed End Condition     | the user don't join the room and an error message is displayed |
| Primary Actors           | User                                                           |
| Secondary Actors         | Database                                                       |
| Trigger                  | The user submit a code                                         |

| Main flow  | Step | Action                                              |
| ---------- | ---- | --------------------------------------------------- |
|            | 1    | The user submit a code                              |
|            | 2    | include::Authorize request                          |
|            | 3    | include::Validate room code                         |
|            | 4    | The system check if the room exists on the database |
|            | 5    | The system update the user info with the room id    |
|            | 6    | The system redirect the user to the chat room       |
| Extensions | Step | Branching action                                    |
|            | 4.1  | the room doesn't exists on the database             |
|            | 4.2  | return an error message                             |
