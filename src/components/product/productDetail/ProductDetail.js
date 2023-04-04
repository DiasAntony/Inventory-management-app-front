import React from "react";
import "./ProductDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirect from "../../../hooks/useRedirect";
import { getSingleProduct } from "../../../redux/product/productSlice";
import { useEffect } from "react";
import { SpinnerImg } from "../../loader/Loader";
import Card from "../../card/Card";
import DOMPurify from "dompurify";

const ProductDetail = () => {

  useRedirect("/login");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   we set the exact product in redux product state so we select that
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();

  const { productId } = useParams();

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSingleProduct(productId));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-detail">
    <h3 className="--mt">Product Detail</h3>
    <Card cardClass="card">
      {isLoading && <SpinnerImg />}
      {product && (
        <div className="detail">
          <Card cardClass="group">
            {/* image doesn't exist dont though an error if its has just show that */}
            {product?.image ? (
              <img
                src={product.image.filePath}
                alt={product.image.fileName}
              />
            ) : (
              <p>No image set for this product</p>
            )}
          </Card>
          <h4>Product Availability: {stockStatus(product.quantity)}</h4>
          <hr />
          <h4>
            <span className="badge">Name: </span> &nbsp; {product.name}
          </h4>
          <p>
            <b>&rarr; SKU : </b> {product.sku}
          </p>
          <p>
            <b>&rarr; Category : </b> {product.category}
          </p>
          <p>
            <b>&rarr; Price : </b> {"₹"}
            {product.price}
          </p>
          <p>
            <b>&rarr; Quantity in stock : </b> {product.quantity}
          </p>
          <p>
            <b>&rarr; Total Value in stock : </b> {"₹"}
            {product.price * product.quantity}
          </p>
          <hr />
          <div
            dangerouslySetInnerHTML={{
                // when create the product we set the rich description text area so when we get that product we dont want that exact description like if it bold or italic dont need in this page
              __html: DOMPurify.sanitize(product.description),
            }}
          ></div>
          <hr />
          <code className="--color-dark">
            Created on: {product.createdAt.toLocaleString("en-US")}
          </code>
          <br />
          <code className="--color-dark">
            Last Updated: {product.updatedAt.toLocaleString("en-US")}
          </code>
        </div>
      )}
    </Card>
  </div>
  )
};

export default ProductDetail;
