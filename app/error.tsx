"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>Algo deu errado 😢</h1>
      <p>Desculpe, ocorreu um erro. Tente novamente mais tarde...</p>

      <button
        onClick={() => reset()}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "4px",
          border: "1px solid #222",
          background: "#fff",
        }}
      >
        Recarregar
      </button>
    </div>
  );
}
