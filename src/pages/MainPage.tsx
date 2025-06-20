import React from "react";
import { useNavigate } from "react-router-dom";

export const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Desafios</h1>
      <button
        style={{ margin: "0 10px" }}
        onClick={() => navigate("/removeDups")}
      >
        Remover Duplicados
      </button>
      <button
        style={{ margin: "0 10px" }}
        onClick={() => navigate("/countFreqWords")}
      >
        Contar Frequência de Palavras
      </button>
      <button
        style={{ margin: "0 10px" }}
        onClick={() => navigate("/treatDates")}
      >
        Tratar Datas
      </button>
      <button
        style={{ margin: "0 10px" }}
        onClick={() =>
          window.open("https://simple-page-html-flex.vercel.app/", "_blank")
        }
      >
        Página Flex
      </button>

      <button
        style={{ margin: "0 10px" }}
        onClick={() =>
          window.open("https://legal-project.vercel.app/", "_blank")
        }
      >
        Jurídico Sun4
      </button>
    </div>
  );
};
