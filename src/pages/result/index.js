import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";

const Result = () => {
  const [results, setResults] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/find-last-command").then((response) => {
      setResults(response.data);
    });
  }, []);
  return (
    <Layout>
      <h1>{results?.output || "-"}</h1>
    </Layout>
  );
};

export default Result;
