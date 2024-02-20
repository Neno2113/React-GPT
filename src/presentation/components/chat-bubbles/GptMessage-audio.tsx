import { FC } from "react";
import Markdown from "react-markdown";


interface Props {
    text: string;
    audio: string
}

export const GptMessageAudio:FC<Props> = ({ text, audio }) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
        <div className="flex flex-grow items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 flex-shrink-0">
                G
            </div>
            <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 px-4 shadow rounded-xl">
                <Markdown>{ text }</Markdown>
                <audio
                    controls
                    src={ audio }
                    className="w-full"
                    autoPlay
                />

            </div>
        </div>
    </div>
  )
}
