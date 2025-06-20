import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function q1RemoverDuplicados(nums: number[]) {
  // const newUniqueArray = new Set(nums);
  const newUniqueArray: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (newUniqueArray.indexOf(nums[i]) === -1) {
      newUniqueArray.push(nums[i]);
    }
  }
  return newUniqueArray;
}

export const Q1RemoveDups: React.FC = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("1, 2, 2, 3, 4, 4, 5");
  const [originalArray, setOriginalArray] = useState<number[]>([
    1, 2, 2, 3, 4, 4, 5,
  ]);
  const [uniqueArray, setUniqueArray] = useState<number[]>(
    q1RemoverDuplicados(originalArray)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    const nums = val
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "")
      .map(Number)
      .filter((n) => !isNaN(n));

    setOriginalArray(nums);
    setUniqueArray(q1RemoverDuplicados(nums));
  };

  return (
    <div style={{ maxWidth: "28rem", margin: "0 auto", padding: "1rem" }}>
      <h2
        style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}
      >
        Remover Duplicados
      </h2>

      <div style={{ marginBottom: "1rem" }}>
        <strong>Array original:</strong> [{originalArray.join(", ")}]
      </div>
      <div style={{ marginBottom: "1.5rem" }}>
        <strong>Array sem duplicados:</strong> [{uniqueArray.join(", ")}]
      </div>

      <label
        htmlFor="numsInput"
        style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}
      >
        Digite números separados por vírgula:
      </label>
      <input
        id="numsInput"
        type="text"
        value={inputValue}
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

      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
};
