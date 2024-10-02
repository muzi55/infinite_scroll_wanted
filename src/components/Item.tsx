import type { MockData } from "../type";
import styles from "./Item.module.css";

interface ItemProps extends MockData {
  index: number;
}

export default function Item({ index, productName, price }: ItemProps) {
  return (
    <li className={styles.item}>
      <p>{index}</p>
      <p>{productName}</p>
      <p>{price}</p>
    </li>
  );
}
