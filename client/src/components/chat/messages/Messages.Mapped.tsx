import React from 'react'
import { MessageCard } from '../messageCard/MessageCard'
import { ImageMessage } from '../messageCard/Message.Image'
import { TextMessage } from '../messageCard/Message.Text'
import { VideoMessage } from '../messageCard/Message.Video'
import { AudioMessage } from '../messageCard/Message.Audio'
import { useAppSelector } from '../../../store'
import { Message } from '../../../lib/interfaces'
import { MESSAGE_TYPE } from '../../../lib/enums'
import { FileMessage } from '../messageCard/Message.File'

type MessagesProps = {
  messages: Array<Message>
}
function MappedMessages(props: MessagesProps) {
  const username = useAppSelector(state => state.user.username)

  return (
    <>
      {props.messages.map(message => {
        const myMessage = message.username === username ? true : false
        switch (message.messageType) {
          case MESSAGE_TYPE.TEXT:
            return (
              <MessageCard
                key={message.messageId}
                myMessage={myMessage}
                username={message.username}
                creationTime={message.createdAt}
              >
                <TextMessage message={message.message} />
              </MessageCard>
            )

          case MESSAGE_TYPE.IMAGE:
            return (
              <MessageCard
                username={message.username}
                creationTime={message.createdAt}
                key={message.messageId}
                myMessage={myMessage}
              >
                <ImageMessage
                  imageURL={message.file.url}
                  message={message.message}
                />
              </MessageCard>
            )

          case MESSAGE_TYPE.VIDEO:
            return (
              <MessageCard
                username={message.username}
                creationTime={message.createdAt}
                key={message.messageId}
                myMessage={myMessage}
              >
                <VideoMessage
                  message={message.message}
                  videoURL={message.file.url}
                />
              </MessageCard>
            )

          case MESSAGE_TYPE.AUDIO:
            return (
              <MessageCard
                username={message.username}
                creationTime={message.createdAt}
                key={message.messageId}
                myMessage={myMessage}
              >
                <AudioMessage src={message.file.url} type="audio/mp4" />
              </MessageCard>
            )

          case MESSAGE_TYPE.FILE:
            return (
              <MessageCard
                username={message.username}
                creationTime={message.createdAt}
                key={message.messageId}
                myMessage={myMessage}
              >
                <FileMessage
                  fileName={message.file.name}
                  fileSize={message.file.size}
                  fileType={message.file.type}
                  fileUrl={message.file.url}
                  message={message.message}
                ></FileMessage>
              </MessageCard>
            )
          default:
            break
        }
      })}
    </>
  )
}

export default MappedMessages
