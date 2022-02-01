# Validate room code

| Use case name            | Validate room code                      |
| ------------------------ | --------------------------------------- |
| Related Requirements     | [SR-CREATE-ROOM, SR-JOIN-ROOM]          |
| Goal In Context          | validate the room code                  |
| Preconditions            | an user should be already created       |
| Successful End Condition | the room code is valid                  |
| Failed End Condition     | the room code is invalid                |
| Primary Actors           | User                                    |
| Secondary Actors         | none                                    |
| Trigger                  | The user tries to create or join a room |

| Main flow  | Step | Action                  |
| ---------- | ---- | ----------------------- |
|            | 1    | validate room code      |
| Extensions | Step | Branching action        |
|            | 1.1  | the code is invalid     |
|            | 1.2  | return an error message |
