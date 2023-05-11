import { useState } from 'react';

const Search = (props: any) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e: any) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("");
  }

  const callSearchFunction = (e: any) => {
    e.prefventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
        />
        <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  )
}

export default Search;
