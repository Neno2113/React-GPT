import { TranslateResponse } from "../../interfaces";


interface Options {
    prompt: string;
    lang: string;
}


export const translateUseCase = async({ prompt, lang }: Options) => {
try {
        const resp = await fetch(`${ import.meta.env.VITE_GPT_API }/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, lang })
        })
        
        if( !resp.ok ) throw new Error('No se pudo realizar la correccion');

        const data = await resp.json() as TranslateResponse;

        // console.log(data);
        


        return {
            ok: true,
            ...data
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo traducir'
        }
    }
}