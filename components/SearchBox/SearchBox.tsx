import css from "./SearchBox.module.css";
import clsx from "clsx";

interface SearchBoxProps {
  setQuery: (query: string) => void;
  query: string;
}

function SearchBox({ query, setQuery }: SearchBoxProps) {
  const handleInputValue = (value: string) => {
    setQuery(value.trim());
  };

  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        value={query}
        onChange={(event) => handleInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          setQuery("");
        }}
        type="button"
        className={clsx(css.btnClear, query && css.btnClearVisible)}
      >
        CANCEL
      </button>
    </div>
  );
}

export default SearchBox;
