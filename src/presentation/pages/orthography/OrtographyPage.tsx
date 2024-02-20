import { useState } from "react"
import { GptMessage, MyMessage, TypingLoading, TextMessageBox, GptMessageOrthography } from "../../components"
import { orthographyUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  }
}


export const OrthographyPage = () => {


  const [ isLoading, setIsloading ] = useState(false);
  const [ messages, setMessages ] = useState<Message[]>([])


  const handlePost = async( text: string ) => {

    setIsloading(true);
    setMessages( (prev) => [ ...prev, { text: text, isGpt: false}]);

    //TODO: use-case
    const { ok, errors, message, userScore } = await orthographyUseCase( text );
    if( !ok ) { 
      setMessages( (prev) => [ ...prev, { text: 'No se pudo realizar la correccion.', isGpt: true}]);
    } else {
      setMessages( (prev) => [ ...prev, 
        { 
          text: message, 
          isGpt: true,
          info: {
          errors,
          message,
          userScore
        }
      }]);
    }
    

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
                <GptMessageOrthography 
                  key={index} 
                  useScore={ message.info!.userScore} 
                  errors={ message.info!.errors}
                  message={ message.info!.message}  
                />
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
