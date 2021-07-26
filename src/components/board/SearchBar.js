import React from "react";
import "../../assets/searchbar.css";

const SearchBar = ({ results, keyword, updateField }) => {
	console.log(results);

  //input창에 사용자가 클릭한 항목의 text를 넣어주고 preview 항목을 지우는 함수
  var updateText = text => {
    updateField("keyword", text);
    updateField("results", []);
  };

  var cancelSearch = () => {
    updateField("keyword", "");
  };

  var renderResults = results.map(({ name }, index) => {
    return (
      <SearchPreview
        key={index}
        updateText={updateText}
        index={index}
        name={name}
      />
    );
  });

  return (
		<div className="auto">
			<input
        className="search-bar"
        placeholder="Search"
        value={keyword}
        onChange={e => updateField("keyword", e.target.value)}
      />
      <button
        onClick={() => cancelSearch()}
        className={`cancel-btn ${keyword.length > 0 ? "active" : "inactive"}`}
      >
        x
      </button>

      {results.length > 0 ? (
        <div className="search-results">{renderResults}</div>
      ) : null}
    </div>
  );
};

const SearchPreview = ({ name, index, updateText }) => {
  return (
    <div
      onClick={() => updateText(name)}
      className={`search-preview ${index === 0 ? "start" : ""}`}
    >
      <div className="first">
        <p className="name">{name}</p>
      </div>
    </div>
  );
};

export default SearchBar;