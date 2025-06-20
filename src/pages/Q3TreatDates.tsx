import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function padStart2(str: string | number): string {
  const s = String(str);
  return s.length >= 2 ? s : "0" + s;
}

function q3TratarDatas(data: string | Date | null): string | null {
  const monthMap: Record<string, string> = {
    janeiro: "01",
    jan: "01",
    fevereiro: "02",
    fev: "02",
    março: "03",
    mar: "03",
    abril: "04",
    abr: "04",
    maio: "05",
    junho: "06",
    jun: "06",
    julho: "07",
    jul: "07",
    agosto: "08",
    ago: "08",
    setembro: "09",
    set: "09",
    outubro: "10",
    out: "10",
    novembro: "11",
    nov: "11",
    dezembro: "12",
    dez: "12",
  };
  if (!data) return null;

  const formatDate = (dateObj: Date) => {
    const year = dateObj.getFullYear();
    const month = padStart2(dateObj.getMonth() + 1);
    const day = padStart2(dateObj.getDate());
    return `${year}-${month}-${day}`;
  };

  if (data instanceof Date && !isNaN(data.getTime())) {
    return formatDate(data);
  }

  if (typeof data === "string") {
    const normalized = data.replace(/-/g, "/");
    const partes = normalized.split("/");

    if (partes.length === 3) {
      const [day, month, year] = partes;
      if (
        year.length === 4 &&
        !isNaN(Number(day)) &&
        !isNaN(Number(month)) &&
        !isNaN(Number(year))
      ) {
        return `${year}-${padStart2(month)}-${padStart2(day)}`;
      }
    }

    const regex = /(\d{1,2})\s+(?:de\s+)?([a-zçãéê]+)\s+(?:de\s+)?(\d{4})/i;
    const dataFiltrada = data.toLowerCase();
    const match = dataFiltrada.match(regex);

    if (match) {
      const day = padStart2(match[1]);
      const monthNome = match[2].trim().toLowerCase();
      const year = match[3];

      const month = monthMap[monthNome];
      if (month) {
        return `${year}-${month}-${day}`;
      }
    }
  }

  return null;
}

export const Q3TreatDates: React.FC = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(
    "30/11/2022, 01 dez 2022, 25/12/2022, 31 de dezembro de 2022"
  );

  const [originalDates, setOriginalDates] = useState<string[]>(
    inputValue.split(",").map((d) => d.trim())
  );
  const [treatedDates, setTreatedDates] = useState<(string | null)[]>(
    originalDates.map((d) => q3TratarDatas(d))
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    const arr = val
      .split(",")
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    setOriginalDates(arr);
    setTreatedDates(arr.map((d) => q3TratarDatas(d)));
  };

  return (
    <div>
      <h2>Tratar Datas</h2>

      <label htmlFor="datesInput">Digite datas separadas por vírgula:</label>
      <input
        id="datesInput"
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded p-2 mb-6"
        placeholder="Ex: 30/11/2022, 01 dez 2022, 25/12/2022"
      />

      <div className="mb-4">
        <strong>Datas originais:</strong>
        <ul>
          {originalDates.map((date, i) => (
            <li key={i}>{date}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <strong>Datas tratadas (YYYY-MM-DD):</strong>
        <ul>
          {treatedDates.map((date, i) => (
            <li key={i}>{date ?? <em>Data inválida</em>}</li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
};
