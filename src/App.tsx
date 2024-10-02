import { useEffect, useRef, useState } from "react";
import "./App.css";
import type { MockData, IGetProducts } from "./type";
import axios from "axios";
import Item from "./components/Item";

function App() {
  const ref = useRef<HTMLLIElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [data, setData] = useState<MockData[]>([]);

  const getData = async () => {
    const { data }: IGetProducts = await axios.get("/data.json");
    console.log(currentPage * 10, (currentPage + 1) * 10);
    const sliceData = data.products.slice(currentPage * 10, (currentPage + 1) * 10);
    setData((prev) => [...prev, ...sliceData]);
    return data;
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            setCurrentPage((prev) => prev + 1);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  return (
    <>
      <h1>무한 스크롤 구현</h1>

      <ul className="container">
        {data.map((el, idx) => {
          return <Item key={el.productId} index={idx} {...el} />;
        })}

        <li ref={ref}>Loading ...</li>
      </ul>
    </>
  );
}

export default App;
