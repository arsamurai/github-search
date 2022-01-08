import React from "react";

interface SearchFormProps {
    setSearchValue(value: string): void
    searchText: string
}

const SearchForm: React.FC<SearchFormProps> = ({ setSearchValue, searchText }) => {
    
    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

  return (
    <form className="search-form">
      <input
        type="text"
        className="users__searcher"
        placeholder={`Search for ${searchText}`}
        onChange={handleChangeValue}
      />
    </form>
  );
}

export default SearchForm;