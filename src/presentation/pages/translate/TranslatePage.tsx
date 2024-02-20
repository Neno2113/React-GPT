import { useState } from "react"
import { GptMessage, MyMessage, TypingLoading, TextMessageBoxSelect } from "../../components";
import { translateUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

export const TranslatePage = () => {


  const [ isLoading, setIsloading ] = useState(false);
  const [ messages, setMessages ] = useState<Message[]>([])


  const handlePost = async( text: string, selectedOption: string ) => {

    setIsloading(true);


    const newMessage = ` Traduce: "${ text }" al idioma ${ selectedOption }`;
    setMessages( (prev) => [ ...prev, { text: newMessage, isGpt: false}]);

    //TODO: use-case
    const { ok, message } = await translateUseCase({ prompt: text, lang: selectedOption});
    if(!ok ) return alert('Ocurrio un error traduciendo el texto.') 

    setIsloading(false);

    setMessages( (prev) => [ ...prev, { text: message, isGpt: true}]);

    //TODO: anadir el mensaje de isGpt en true
  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          {/* Bienvenida */}
          <GptMessage text="Que quieres que traduzca hoy?" />

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

        <TextMessageBoxSelect
          onSendMessage={ handlePost }
          options={ languages }
          placeholder="Escribe aqui lo que deseas"
        />

    </div>
  )
}
