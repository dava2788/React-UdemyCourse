import { useEffect, useState } from 'react';
interface Props {
    label: string;
    placeHolder: string;
    onQuery: (query: string) => void;
}

export default function SearchBar({ label, placeHolder, onQuery }: Props) {
    const [query, setQuery] = useState('');

    useEffect(() => {

        const timeOutId = setTimeout(
            () => {
                onQuery(query);
            }, 700
        );

        return () => {
            clearTimeout(timeOutId);
        }
    }, [query, onQuery])


    function handleSearch() {
        onQuery(query);
        //setQuery('');
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') handleSearch();
    }

    return (

        <div className="search-container">
            <input type="text" placeholder={placeHolder} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => handleKeyDown(event)} />
            <button onClick={() => handleSearch()}>{label}</button>

        </div>
    )
}
