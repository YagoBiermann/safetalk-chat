## System requirements

##### [SR-CREATE-USER]

- the user shall enter his username to access the app
- the username should not be in use
- the username can't contain special characters and can't be too long
- if the username is already in use a error message should be displayed
- if everything occurs as foreseen the user is created on database and a cookie with jwt token and an user id is bind to him, after all the user is redirect to the code page
- if the user already has a binded cookie, but has created a new user then a new cookie must be created and the old one destroyed.

##### [SR-REDIRECT-USER]

- If the user was already on a room but came back to home page then a link must be displayed with a message to redirect the user to previous room

##### [SR-GENERATE-CODE]

- on the code page a code is generated
- the code must be secure enough to not be easily guessable
- the code should be easy to copy and share

##### [SR-CREATE-ROOM]

- the user can create a room with the generated code
- if some room is using the same code then a new code should be generated
- if everything went fine the user should be redirect to the chat

##### [SR-JOIN-ROOM]

- the user can join a room with a valid code that was sent to him
- if the code is not valid or the room not exists a error message should be displayed
- the join room input must avoid brute force attacks
- if everything went fine the user should be redirect to the chat

##### [SR-CHAT-SIDEBAR]

- the chat must display a sidebar with the users in the room

##### [SR-TEXT-MESSAGE]

- the user shall be able to send text messages
- the text message should not be more than 400 characters
- links in the text must be displayed with emphasis

##### [SR-VOICE-MESSAGE]

- the user shall be able to send voice messages
- the voice message should not be more than 1 minute
- the voice message shall contain a custom media player to controll the volume, current time, play/pause, etc...

##### [SR-VIDEO-MESSAGE]

- the user shall be able to send video messages
- the video message must contain a custom media player to controll it
- the video size can't be more than 500Mb
- if failed then a error and a retry button must be displayed

##### [SR-FILE-MESSAGE]

- the user shall be able to send files
- the file size can't be more than 1Gb
- if failed then a error and a retry button must be displayed

##### [SR-SEND-WITH-DRAG-AND-DROP]

- the user shall be able to send video, file and photos with drag n' drop over the chat or with a button displayed on the chat

##### [SR-PREVIEW-CONTENT]

- the user shall be able to preview a video, file or photo after select it
- the user shall be able to associate a message with the preview
- the file preview must contain basic informations about the file, like size, file name, file extension, etc...

##### [SR-UNAUTHORIZED-ACCESS]

- the user shall not be able to bypass the system flow
- if the user tries to manually access an unauthorized page then the system must redirect the user to the home page
- the only protected route that the user should be able to access manually is the chat room that he/she was in

## System non-functional requirements

##### [SNFR-TEMP-INFO]

- all the user information must be save on the database for a short time, not more than 3 days

##### [SNFR-SANITIZE-INPUT]

- the system must sanitize and validate every input

##### [SNFR-CLEAN-ARCH]

- the system must have a clean and scalable architecture

##### [SNFR-INVALID-ROUTE]

- any non-valid route on backend shall redirect the user to the home page

##### [SNFR-PROTECTED-ROUTES]

- all routes except the one to create the user shall be protected with a jwt token
- the token shall be saved with http-only cookies

##### [SNFR-USER-SESSION]

- each user shall have a session with a token and user id to retrive the user information from database
- the session should not lasts more than 3 days

##### [SNFR-TEMP-FILES]

- each room shall have a temporary folder to save the files
- the folder shall be removed when the room is removed
- the user should not be able to access files from others rooms and vice-versa
