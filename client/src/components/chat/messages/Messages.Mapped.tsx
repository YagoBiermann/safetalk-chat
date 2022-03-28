import React, { useEffect } from 'react'
import { MessageCard } from '../messageCard/MessageCard'
import { ImageMessage } from '../messageCard/Message.Image'
import { TextMessage } from '../messageCard/Message.Text'
import { VideoMessage } from '../messageCard/Message.Video'
import { AudioMessage } from '../messageCard/Message.Audio'
import { useAppSelector } from '../../../store'
import { Message } from '../../../lib/interfaces'
import { MESSAGE_TYPE } from '../../../lib/enums'

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
                  imageURL={message.fileUrl}
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
                  videoURL={message.fileUrl}
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
                <AudioMessage src={message.fileUrl} type="audio/mp4" />
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
