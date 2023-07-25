import React from "react";
import fs from "fs";
import path from "path";

const getData = () => {
  const filePath = path.join(process.cwd(), "data", "data.json");
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  return data;
};

export async function getStaticProps(ctx) {
  // NextJs best practice: get id from params on server to get the advantage of pre-rendering
  // the id is extracted before the page renders, content is then ready for rendering
  const { params } = ctx;
  const productId = params.id;

  const data = await getData();

  return {
    props: {
      product: data.products.find((p) => p.id == productId),
    },
  };
}

// Next js doesn't know which ids to pre-render, it needs getStaticPaths function to run after getStaticProps
// we provide the function the ids with the fallback which allows to pre-render only some ids/params when set to true
// in this case is set to false because we need to pre-load all the ids
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products
    .map((p) => p.id)
    .map((id) => ({ params: { id: id } }));

  return {
    paths: ids,
    fallback: false,
  };
}

const ProductDetailPage = ({ product }) => {
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-wrapper">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetailPage;
