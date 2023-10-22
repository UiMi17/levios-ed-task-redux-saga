import { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Product = () => {
  const paramAsin = useParams("asin");
  const location = useLocation();
  const products = useProducts();
  const { t } = useTranslation();
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const findCurrentProduct = () => {
      const result = products.filter(({ asin }) => asin === paramAsin.asin);
      setCurrentProduct(...result);
    };

    findCurrentProduct();
  }, [products, paramAsin]);

  return (
    currentProduct && (
      <div className="min-h-screen bg-slate-100">
        <Link
          className="flex items-center justify-center w-32 h-10 bg-slate-300  text-black rounded-sm hover:bg-slate-400 transition-colors ease-in delay-150"
          to={location.state.from.pathname + location.state.from.search}
        >
          &#60;&#60; {t("goBackProductBtn")}
        </Link>
        <div className="flex flex-col items-center gap-12 mt-4">
          <h1 className="text-4xl font-bold text-center text-slate-900">
            {currentProduct.name}
          </h1>
          <h2 className="text-2xl font-medium text-center text-slate-700">
            {t("productsElementCategory")}: {currentProduct.bsr_category}
          </h2>
          <a
            href={currentProduct.link}
            target="_blank"
            rel="noreferrer noopener"
            className="relative w-96 group"
          >
            <img
              src={currentProduct.img}
              alt={currentProduct.name}
              className="w-fit h-auto object-cover mx-auto shadow-md rounded-md group-hover:scale-110 transition-transform ease-in-out delay-200"
            />
            <div className="absolute flex justify-center items-center inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-all ease-linear delay-400 scale-110 rounded-md">
              <p className="text-gray-300">{t("onProductImgHoverText")}</p>
            </div>
          </a>

          <p className="text-4xl font-semibold text-center text-slate-800">
            {t("productsElementPrice")}: <span className="underline">{currentProduct.price}</span>!
          </p>
        </div>
      </div>
    )
  );
};

export default Product;
