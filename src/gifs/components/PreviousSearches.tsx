interface Props {
    label: string;
    previusSearchesResult: string[];
    onLabelClick: (term: string) => void;
}

export default function PreviousSearches({ label, previusSearchesResult, onLabelClick }: Props) {
    return (
        <div className="previous-searches">
            <h2>{label}</h2>
            <ul className="previous-searches-list">
                {
                    previusSearchesResult.map((item) => (
                        <li onClick={() => onLabelClick(item)} key={item}>{item}</li>
                    ))
                }
            </ul>
        </div>
    )
}
