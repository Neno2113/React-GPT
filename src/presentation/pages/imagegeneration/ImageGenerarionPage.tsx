

import { useState } from "react"
import { GptMessage, MyMessage, TypingLoading, TextMessageBox, GptMessageImage } from "../../components";
import { ImageGeneratioUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string
  }
}


export const ImageGenerationPage = () => {


  const [ isLoading, setIsloading ] = useState(false);
  const [ messages, setMessages ] = useState<Message[]>([])


  const handlePost = async( text: string ) => {

    setIsloading(true);
    setMessages( (prev) => [ ...prev, { text: text, isGpt: false}]);

    const imageInfo = await ImageGeneratioUseCase(text);
    setIsloading(false);
    if( !imageInfo ) {
      setMessages(( prev) => [ ...prev,  { text: 'No se pudo generar la imagen', isGpt: true}])
    }

    setMessages( (prev) => [ ...prev, 
      { text: text, 
        isGpt: true,
        info: {
          imageUrl: imageInfo!.url,
          alt: imageInfo!.url ?? 'wtf'
        }
      
      }])
  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text="Que imagen deseas generar hoy?" />

          {
            messages.map( (message, index) => (
              message.isGpt
               ? (
                <GptMessageImage 
                  key={index} 
                  text={ message.text } 
                  imageUrl={ message.info!.imageUrl}
                  alt={ message.info!.alt}
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
