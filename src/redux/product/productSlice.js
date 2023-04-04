import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "./productService";
import { toast } from "react-toastify";

// createasyncthunk its help to make http from redux

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// create new product

export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await createNewProduct(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get all products

export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete product

export const deleteAproduct = createAsyncThunk(
  "products/delete",
  async (productId, thunkAPI) => {
    try {
      return await deleteProduct(productId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get product

export const getSingleProduct = createAsyncThunk(
  "products/getProduct",
  async (productId, thunkAPI) => {
    try {
      return await getProduct(productId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// update product

export const updateAproduct = createAsyncThunk(
  "products/updateProduct",
  async ({productId,formData}, thunkAPI) => {
    try {
      return await updateProduct(productId,formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);








const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      // console.log("store value");
      const products = action.payload;
      const array = [];
      products.map((item) => {
        // calculate the total value of single product like if we have a mobile that mobile quantity and price multipled
        const { price, quantity } = item;
        const productValue = price * quantity;
        // so if we have 3 products the result will be 200,400,500 like so we push into one arary
        return array.push(productValue);
      });
      // then the all array value are callculated by below method
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUT_OF_STACK(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const { quantity } = item;

        // console.log(quantity);
        return array.push(quantity);
      });
      // console.log(array);
// in quantity is 0 that product will be out of stock so add 1
      let count = 0;
      array.forEach((number) => {
        if (number === 0 || number === "0") {
          count += 1;
        }
        // console.log(count);
      });
      state.outOfStock = count;
    },
    CALC_CATEGORY(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const { category } = item;

        return array.push(category);
      });
      // extract the unique and showed if same name consist in 3 category it will convert to one!!!
      const uniqueCategory = [...new Set(array)];
      // console.log(uniqueCategory);
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products.push(action.payload);
        toast.success("product addded successfully!!");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error(action.payload);
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products = action.payload;
        toast.info("Check Your products!!");
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteAproduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        toast.success("product deleted!!");
      })
      .addCase(deleteAproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.product = action.payload;
        toast.info("Check product details!!");
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateAproduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        // state.product = action.payload;
        toast.success("product details updated!!");
      })
      .addCase(updateAproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
  }
});

export const { CALC_STORE_VALUE, CALC_OUT_OF_STACK, CALC_CATEGORY } =
  productSlice.actions;

export default productSlice.reducer;
