import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.actions";

// const gifsCache: Record<string, Gif[]> = {};


export default function useGifs() {

    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const [gifsReponse, setGifsReponse] = useState<Gif[]>([]);

    const gifsCache = useRef<Record<string, Gif[]>>({});



    async function handleSearch(query: string) {
        const cleanQuery = query.toLocaleLowerCase().trim();

        if (cleanQuery === '') return;

        if (previousTerms.includes(cleanQuery)) return;

        setPreviousTerms([cleanQuery, ...previousTerms.slice(0, 6)]);

        const gifs = await getGifsByQuery(query);
        // console.log({ gifs });
        setGifsReponse(gifs);
        //Set Cache
        gifsCache.current[cleanQuery] = gifs;

    }

    async function handleTermClicked(term: string) {

        if (gifsCache.current[term]) {
            setGifsReponse(gifsCache.current[term]);
            return;
        }

        const gifs = await getGifsByQuery(term);
        setGifsReponse(gifs);
    }

    return {
        //Poperties/Values
        previousTerms,
        gifsReponse,

        //Methods
        handleSearch,
        handleTermClicked
    };
}
