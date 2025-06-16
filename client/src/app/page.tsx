"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import { greet } from "wasm";

export default function Home() {
  useEffect(() => {
    greet();
  }, []);

  return (
    <div className={styles.page}>
      <h1>Hello world</h1>
    </div>
  );
}
