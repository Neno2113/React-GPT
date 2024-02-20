import { useState } from "react"
import { GptMessage, MyMessage, TypingLoading, TextMessageBox } from "../components";

interface Message {
  text: string;
  isGpt: boolean;
}


export const ChatTemplate = () => {


  const [ isLoading, setIsloading ] = useState(false);
  const [ messages, setMessages ] = useState<Message[]>([])


  const handlePost = async( text: string ) => {

    setIsloading(true);
    setMessages( (prev) => [ ...prev, { text: text, isGpt: false}]);

    //TODO: use-case

    setIsloading(false);

    //TODO: anadir el mensaje de isGpt en true
  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text="Hola, puedes escribir tu texto en español, y te ayudo con las correcciones." />

          {
            messages.map( (message, index) => (
              message.isGpt
               ? (
                <GptMessage key={index} text="Esto es de OpenAI" />
               )
               : (
                <MyMessage key={index} text={ message.text } />

               )  
            ))
          }
          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoading className="fade-in" />

              </div>
            )
          }

        </div>
      </div>

        <TextMessageBox
          onSendMessage={ handlePost }
          placeholder="Escribe aqui lo que deseas"
          disableCorrections
        />

    </div>
  )
}
