import { useState } from "react";
import GifList from "./gifs/components/GifList";
import PreviousSearches from "./gifs/components/PreviousSearches";
// import { mockGifs } from "./mock-data/gifs.mock";
import CustomHeader from "./shared/components/CustomHeader";
import SearchBar from "./shared/components/SearchBar";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.actions";
import type { Gif } from "./gifs/interfaces/gif.interface";


export default function GifsApp() {
    const [previousTerms, setPreviousTerms] = useState<string[]>(['vegeta', 'saitama', 'genos', 'goku']);

    const [gifsReponse, setGifsReponse] = useState<Gif[]>([]);


    async function handleSearch(query: string) {
        const cleanQuery = query.toLocaleLowerCase().trim();

        if (cleanQuery === '') return;

        if (previousTerms.includes(cleanQuery)) return;

        setPreviousTerms([query, ...previousTerms.slice(0, 6)]);

        const gifs = await getGifsByQuery(query);
        console.log({ gifs });
        setGifsReponse(gifs);
    }

    function handleTermClicked(term: string) {
        console.log({ term });
    }


    return (
        <>
            {/* Header */}
            <CustomHeader title={"Buscador de Gifs"} description="Descubre y Comparte el Gif Perfecto" />

            {/* Search */}
            <SearchBar label={"Buscar"} placeHolder={"Buscar Gif"} onQuery={(query: string) => handleSearch(query)} />

            {/* Busquedas Previas */}
            < PreviousSearches label={"Busquedas Previas"} previusSearchesResult={previousTerms} onLabelClick={(term: string) => handleTermClicked(term)} />

            {/* Gifs */}
            <GifList gifs={gifsReponse} />
        </>
    )
}
