import { useEffect, useRef, useState } from "react";
import "./App.css";
import type { MockData, IGetProducts } from "./type";
import axios from "axios";
import Item from "./components/Item";
import Spinner from "./components/Spinner";

function App() {
  const ref = useRef<HTMLLIElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [data, setData] = useState<MockData[]>([]);
  const [visibleLoading, setVisibleLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = async () => {
    setIsLoading(true);
    const { data }: IGetProducts = await axios.get("/data.json");
    const sliceData = data.products.slice(currentPage * 10, (currentPage + 1) * 10);
    if (sliceData.length === 0) {
      setVisibleLoading(false);
      setIsLoading(false);
      return;
    }
    setData((prev) => [...prev, ...sliceData]);
    setIsLoading(false);
    return data;
  };

  useEffect(() => {
    getData();
    setVisibleLoading(true);
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
        threshold: 0.5,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [visibleLoading]);

  console.log(currentPage);
  return (
    <>
      {isLoading && (
        <div className="loading">
          <Spinner />
        </div>
      )}
      <h1>무한 스크롤 구현</h1>

      <ul className="container">
        {data.map((el, idx) => {
          return <Item key={el.productId} index={idx} {...el} />;
        })}

        {visibleLoading && <li ref={ref}>Loading ...</li>}
      </ul>
    </>
  );
}

export default App;
