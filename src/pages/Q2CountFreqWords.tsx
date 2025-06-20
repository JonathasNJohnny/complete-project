import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function q2ContarFrequenciaPalavra(text: string): Record<string, number> {
  const words = text.toLowerCase().match(/\b\w+\b/g);
  if (!words) return {};

  const counts: Record<string, number> = {};
  words.forEach((word) => {
    counts[word] = (counts[word] || 0) + 1;
  });

  const sortedKeys = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

  const countsOrdered: Record<string, number> = {};
  for (const key of sortedKeys) {
    countsOrdered[key] = counts[key];
  }

  return countsOrdered;
}

export const Q2CountFreqWords: React.FC = () => {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("Hello world hello");
  const [freqWords, setFreqWords] = useState<Record<string, number>>(
    q2ContarFrequenciaPalavra(inputText)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputText(val);
    setFreqWords(q2ContarFrequenciaPalavra(val));
  };

  return (
    <div style={{ maxWidth: "28rem", margin: "0 auto", padding: "1rem" }}>
      <h2
        style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}
      >
        Contar Frequência de Palavras
      </h2>

      <label
        htmlFor="textInput"
        style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}
      >
        Digite um texto:
      </label>
      <input
        id="numsInput"
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Ex: 1, 2, 2, 3, 4, 4, 5"
        style={{
          width: "100%",
          border: "1px solid #d1d5db",
          borderRadius: "0.25rem",
          padding: "0.5rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      <div style={{ marginBottom: "1.5rem" }}>
        <strong>Frequência de palavras ordenadas:</strong>
        <ul>
          {Object.entries(freqWords).map(([word, count]) => (
            <li key={word}>
              <code>{word}</code>: {count}
            </li>
          ))}
          {Object.keys(freqWords).length === 0 && (
            <li style={{ fontStyle: "italic", color: "#6b7280" }}>
              Nenhuma palavra encontrada.
            </li>
          )}
        </ul>
      </div>

      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
};
