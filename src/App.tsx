import React, { useState } from "react";
import "./App.css";
import { useGetSynonyms } from "./hooks/useGetSynonyms";

// type Synonym = {
//   word: string;
//   score: number;
// };

// const API_URL = import.meta.env.VITE_API_URL ?? `https://api.datamuse.com`;

function App() {
  const [word, setWord] = useState("");
  const { isLoading, synonyms, getSynonyms } = useGetSynonyms();

  // const fetchSynonyms = (word: string) => {
  //   fetch(`${API_URL}/words?rel_syn=${word}`)
  //     .then((res) => res.json())
  //     .then(setSynonyms);
  // };
  const handleFetchSynonyms = (e: React.FormEvent) => {
    e.preventDefault();
    getSynonyms(word);
  };

  const handleSynonymClicked = (newWord: string) => {
    setWord(newWord);
    getSynonyms(newWord);
  };

  return (
    <div className="App">
      <form method="POST" action="/url" onSubmit={handleFetchSynonyms}>
        <label htmlFor="word-input">Your Word</label>
        <input
          type="text"
          id="word-input"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button>submit</button>
      </form>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {synonyms.map((synonym: any, idx: number) => {
            return (
              <li key={idx} onClick={() => handleSynonymClicked(synonym.word)}>
                {synonym.word}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
