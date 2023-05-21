import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";

const History = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/find-all-commands").then((response) => {
      setResults(response.data);
    });
  }, []);

  console.log(results);
  return (
    <Layout>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Title</th>
            <th>output</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {results?.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.output}</td>
                <td>{item.date}</td>
              </tr>
            );
          }) ||
            "Ici se trouvera votre historique une fois que vous aurez lance une commande"}
        </tbody>
      </table>
    </Layout>
  );
};

export default History;
