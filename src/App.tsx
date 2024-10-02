import { useEffect, useState } from "react";
import "./App.css";
import type { MockData, IGetProducts } from "./type";
import axios from "axios";

function App() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [data, setData] = useState<MockData[]>([]);

  const getData = async () => {
    const { data }: IGetProducts = await axios.get("/data.json");
    setData((prev) => [...prev, ...data.products]);
    return data;
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <h1>무한 스크롤 구현</h1>

      <ul className="container"></ul>
    </>
  );
}

export default App;
