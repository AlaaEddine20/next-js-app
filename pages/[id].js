import React from "react";
import fs from "fs";
import path from "path";

export async function getStaticProps(ctx) {
  // NextJs best practice: get id from params on server to get the advantage of pre-rendering
  // the id is extracted before the page renders, content is then ready for rendering
  const { params } = ctx;

  const productId = params.id;

  const filePath = path.join(process.cwd(), "data", "data.json");
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      product: data.products.find((p) => p.id == productId),
    },
  };
}

const ProductDetailPage = ({ product }) => {
  console.log(product);

  return (
    <div className="product-wrapper">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetailPage;
