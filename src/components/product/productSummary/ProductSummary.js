import React from "react";
import "./ProducSummary.css";
import { HiCurrencyRupee } from "react-icons/hi";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import Infobox from "../../infobox/Infobox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CALC_CATEGORY, CALC_OUT_OF_STACK, CALC_STORE_VALUE } from "../../../redux/product/productSlice";

// icon
const earningIcon = <HiCurrencyRupee size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector((state) => state.product.totalStoreValue);
  const outOfStock = useSelector((state) => state.product.outOfStock);
  const category = useSelector((state) => state.product.category);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUT_OF_STACK(products))
    dispatch(CALC_CATEGORY(products))
  }, [dispatch, products]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <Infobox
          icon={productIcon}
          title={"Total Products"}
          count={products.length}
          bgColor="card1"
        />
        <Infobox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`₹${formatNumbers(totalStoreValue.toFixed(2))}  `}
          bgColor="card2"
        />
        <Infobox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock}
          bgColor="card3"
        />
        <Infobox
          icon={categoryIcon}
          title={"All Categories"}
          count={category.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default ProductSummary;
