import { useState } from "react"
import { GptMessage, MyMessage, TypingLoading, TextMessageBox } from "../../components";
import { prosConsDiscusserUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  message?: string; 
}


export const ProsConsPage = () => {


  const [ isLoading, setIsloading ] = useState(false);
  const [ messages, setMessages ] = useState<Message[]>([])


  const handlePost = async( text: string ) => {

    setIsloading(true);
    setMessages( (prev) => [ ...prev, { text: text, isGpt: false}]);

    //TODO: use-case
    const { ok, content } = await prosConsDiscusserUseCase( text);

    if( !ok ) return;
    setMessages( (prev) => [ ...prev, { text: content, isGpt: true}]);


    

    setIsloading(false);

    //TODO: anadir el mensaje de isGpt en true
  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text="Puedes escribir lo que sea que quieres que compare y te de mis apuntes." />

          {
            messages.map( (message, index) => (
              message.isGpt
               ? (
                <GptMessage key={index} text={ message.text! } />
               )
               : (
                <MyMessage key={index} text={ message.text! } />

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
