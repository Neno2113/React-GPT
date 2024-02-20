import { useState } from "react"
import { GptMessage, MyMessage, TypingLoading, TextMessageBoxFile } from "../../components";
import { audioToTextUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}


export const AudioToTextPage = () => {


  const [ isLoading, setIsloading ] = useState(false);
  const [ messages, setMessages ] = useState<Message[]>([])


  const handlePost = async( text: string, audioFile: File ) => {

    setIsloading(true);
    setMessages( (prev) => [ ...prev, { text: text, isGpt: false}]);
    console.log({ text, audioFile});
    

    //TODO: use-case
    const data = await audioToTextUseCase(audioFile, text );
    setIsloading(false);

    if( !data) return;

    console.log(data);

    const gptMessage = `
## El Texto es: 
    __Duracion__${ Math.round( data.duration )}
### El texto es: 
    ${ data.text }
    `;


    setMessages( (prev) => [
      ...prev,
      { text: gptMessage, isGpt: true }
    ])
    for (const segment of data.segments) {
      const segmentMessage = `
__De ${ Math.round(segment.start)  } a ${ Math.round(segment.end)} segundos:__
        ${ segment.text}

      `;

      setMessages( (prev) => [
        ...prev, 
        { text: segmentMessage, isGpt: true }
      ])
    }
    
  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text="Hola, que audio quieres generar hoy" />

          {
            messages.map( (message, index) => (
              message.isGpt
               ? (
                <GptMessage key={index} text={ message.text } />
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

        <TextMessageBoxFile
          onSendMessage={ handlePost }
          placeholder="Escribe aqui lo que deseas"
          disableCorrections
          accept="audio/*"
        />

    </div>
  )
}
