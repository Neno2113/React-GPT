import { useState } from "react"
import { GptMessage, MyMessage, TypingLoading, TextMessageBoxSelect, GptMessageAudio } from "../../components";
import { textToAudioUseCase } from "../../../core/use-cases";

const disclaimer = `##Que quieres o que audio queres generar?
* Todo el audio generado es por AI

`;

const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
]

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: 'text'
}


interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type: 'audio'
}

type Message = TextMessage | AudioMessage;


export const TextToAudioPage = () => {


  const [ isLoading, setIsloading ] = useState(false);
  const [ messages, setMessages ] = useState<Message[]>([])


  const handlePost = async( text: string, selectedVoice: string ) => {

    setIsloading(true);
    setMessages( (prev) => [ ...prev, { text: text, isGpt: false, type: 'text'}]);

    //TODO: use-case
    const { ok, message, audioUrl } = await textToAudioUseCase( text, selectedVoice )


    if( !ok ) return;

    setIsloading(false);

    //TODO: anadir el mensaje de isGpt en true
    setMessages( (prev) => [ 
      ...prev, 
      { text: `${ selectedVoice } - ${ message }`, 
        isGpt: true, 
        type: 'audio', 
        audio: audioUrl!
      }
    ]);

  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text={ disclaimer } />

          {
            messages.map( (message, index) => (
              message.isGpt
               ? (

                message.type === 'audio' ? (
                  <GptMessageAudio 
                    key={index} 
                    text={ message.text } 
                    audio={ message.audio }
                  />

                ) : (
                  <MyMessage key={index} text={ message.text } />

                )

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

        <TextMessageBoxSelect
          options={ voices }
          onSendMessage={ handlePost }
          placeholder="Escribe aqui lo que deseas"
        />

    </div>
  )
}
