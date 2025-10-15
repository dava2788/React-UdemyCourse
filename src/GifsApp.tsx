import GifList from "./gifs/components/GifList";
import PreviousSearches from "./gifs/components/PreviousSearches";
import CustomHeader from "./shared/components/CustomHeader";
import SearchBar from "./shared/components/SearchBar";
import useGifs from "./gifs/hooks/useGifs";


export default function GifsApp() {
    const { gifsReponse, previousTerms, handleSearch, handleTermClicked } = useGifs()


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
