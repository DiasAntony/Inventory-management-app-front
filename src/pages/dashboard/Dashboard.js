import React, { useEffect } from "react";
import useRedirect from "../../hooks/useRedirect";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import ProductList from "../../components/product/productList/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/product/productSlice";

const Dashboard = () => {
  useRedirect("/login");

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ProductSummary products={products} />
      <ProductList  products={products} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
