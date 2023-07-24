import React from "react";
import fs from "fs";
import path from "path";
import ProductDetailPage from "./[id]";
import Link from "next/link";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "data.json");
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    // ISR: incremental static generation (optional)
    revalidate: 10,
  };
}

const HomePage = (props) => {
  const { products } = props;

  return (
    <div className="HP-container">
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
