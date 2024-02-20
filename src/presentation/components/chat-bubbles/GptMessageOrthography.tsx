import { FC } from "react";


interface Props {
    useScore: number;
    errors: string[];
    message: string;
}

export const GptMessageOrthography:FC<Props> = ({ useScore, errors, message }) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
        <div className="flex flex-grow items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 flex-shrink-0">
                G
            </div>
            <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 px-4 shadow rounded-xl">

                <h3 className="text-3xl">Puntaje: {useScore}%</h3>
                <p>{ message }</p>

                {
                    errors.length === 0
                    ? <p>No se encontraron errores, perfecto!</p>
                    :   (
                            <>
                                <h3 className="text-2xl">Errores encontrados</h3>
                                <ul>
                                    {
                                        errors.map( (error, i) => (
                                            <li key={ i }>
                                                { error }
                                            </li>
                                        ))
                                    }
                                </ul>
                            </>
                        )
                }
            </div>
        </div>
    </div>
  )
}
