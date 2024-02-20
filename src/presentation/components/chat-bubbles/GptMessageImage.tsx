import { FC } from "react";


interface Props {
    text?: string;
    imageUrl: string
    alt: string
    onImageSelected?: ( imageUrl: string ) => void; 
}

export const GptMessageImage:FC<Props> = ({  imageUrl, alt, onImageSelected }) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
        <div className="flex flex-grow items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 flex-shrink-0">
                G
            </div>
            <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 px-4 shadow rounded-xl">
                {/* <span>{text}</span> */}
                <img 
                    className="rounded w-96 h-86 object-cover"
                    src={imageUrl} 
                    alt={alt} 
                    onClick={ () => onImageSelected && onImageSelected( imageUrl )}
                />
            </div>
        </div>
    </div>
  )
}