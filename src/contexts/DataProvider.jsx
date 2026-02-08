import { useNavigate } from "react-router-dom";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import { useAuth } from "./AuthProvider";
import * as productsApi from "../lib/api/products";
import * as categoriesApi from "../lib/api/categories";

const DataContext = createContext();

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "setProducts":
      return { ...state, products: action.payload };
    case "setCategories":
      return { ...state, categories: action.payload };
    case "searchHandler":
      return { ...state, search: action.payload };
    case "singleCategoryFilterHandler":
      return {
        ...state,
        categoryFilter: action.payload,
        search: "",
        priceFilter: "",
        ratingFilter: "",
        sortPriceFilter: "",
      };
    case "setCategoryHandler":
      return { ...state, categoryFilter: action.payload };
    case "priceFilterHandler":
      return { ...state, priceFilter: action.payload };
    case "ratingFilterHandler":
      return { ...state, ratingFilter: action.payload };
    case "sortPriceHandler":
      return { ...state, sortPriceFilter: action.payload };
    case "getAllDataHandler":
      return {
        ...state,
        categoryFilter: [],
        search: "",
        priceFilter: "",
        ratingFilter: "",
        sortPriceFilter: "",
      };
    case "setProductsLoading":
      return { ...state, productsLoading: action.payload };
    case "setCategoriesLoading":
      return { ...state, categoriesLoading: action.payload };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  products: [],
  categories: [],
  search: "",
  categoryFilter: [],
  priceFilter: "",
  ratingFilter: "",
  sortPriceFilter: "",
  productsLoading: true,
  categoriesLoading: true,
};

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();
  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE);

  const fetchProducts = useCallback(async () => {
    try {
      const products = await productsApi.getProducts();
      dispatch({ type: "setProducts", payload: products });
    } catch (error) {
      console.error("[Products] Failed to fetch:", error.message);
    } finally {
      dispatch({ type: "setProductsLoading", payload: false });
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const categories = await categoriesApi.getCategories();
      dispatch({ type: "setCategories", payload: categories });
    } catch (error) {
      console.error("[Categories] Failed to fetch:", error.message);
    } finally {
      dispatch({ type: "setCategoriesLoading", payload: false });
    }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      fetchProducts();
      fetchCategories();
    }
  }, [authLoading, fetchProducts, fetchCategories]);

  const searchHandler = useCallback(
    (e) => {
      navigate("/products");
      dispatch({ type: "searchHandler", payload: e.target.value });
    },
    [navigate]
  );

  const singleCategoryFilterHandler = useCallback(
    (categoryName) => {
      navigate("/products");
      dispatch({
        type: "singleCategoryFilterHandler",
        payload: [categoryName],
      });
    },
    [navigate]
  );

  const getAllDataHandler = useCallback(() => {
    dispatch({ type: "getAllDataHandler" });
  }, []);

  const priceFilterHandler = useCallback((e) => {
    dispatch({ type: "priceFilterHandler", payload: e.target.value });
  }, []);

  const ratingFilterHandler = useCallback((e) => {
    dispatch({ type: "ratingFilterHandler", payload: e.target.value });
  }, []);

  const setCategoryHandler = useCallback(
    (e) => {
      if (state.categoryFilter.includes(e.target.value)) {
        const newData = state.categoryFilter.filter(
          (category) => category !== e.target.value
        );
        dispatch({ type: "setCategoryHandler", payload: newData });
      } else {
        dispatch({
          type: "setCategoryHandler",
          payload: [...state.categoryFilter, e.target.value],
        });
      }
    },
    [state.categoryFilter]
  );

  const sortPriceHandler = useCallback((e) => {
    dispatch({ type: "sortPriceHandler", payload: e.target.value });
  }, []);

  const filteredProducts = useMemo(() => {
    let data = [...state.products];

    if (state.search) {
      data = data.filter(({ productName }) =>
        productName.toLowerCase().includes(state.search.toLowerCase())
      );
    }

    if (state.categoryFilter.length > 0) {
      data = data.filter(({ categoryName }) =>
        state.categoryFilter.includes(categoryName)
      );
    }

    if (state.priceFilter) {
      data = data.filter(
        ({ discountedPrice }) =>
          Number(discountedPrice) <= Number(state.priceFilter)
      );
    }

    if (state.ratingFilter) {
      data = data.filter(({ rating }) => rating >= Number(state.ratingFilter));
    }

    if (state.sortPriceFilter === "asc") {
      data.sort(
        (a, b) => Number(a.discountedPrice) - Number(b.discountedPrice)
      );
    } else if (state.sortPriceFilter === "desc") {
      data.sort(
        (a, b) => Number(b.discountedPrice) - Number(a.discountedPrice)
      );
    }

    return data;
  }, [
    state.products,
    state.search,
    state.categoryFilter,
    state.priceFilter,
    state.ratingFilter,
    state.sortPriceFilter,
  ]);

  const trendingProducts = useMemo(
    () => state.products.filter(({ trending }) => trending),
    [state.products]
  );

  const value = useMemo(
    () => ({
      products: state.products,
      filteredProducts,
      trendingProducts,
      categories: state.categories,
      searchHandler,
      singleCategoryFilterHandler,
      getAllDataHandler,
      priceFilterHandler,
      priceRange: state.priceFilter,
      ratingFilterHandler,
      ratingRange: state.ratingFilter,
      setCategoryHandler,
      categoryFilter: state.categoryFilter,
      sortPriceHandler,
      sortPriceFilter: state.sortPriceFilter,
      productsLoading: state.productsLoading,
      categoriesLoading: state.categoriesLoading,
    }),
    [
      state.products,
      filteredProducts,
      trendingProducts,
      state.categories,
      searchHandler,
      singleCategoryFilterHandler,
      getAllDataHandler,
      priceFilterHandler,
      state.priceFilter,
      ratingFilterHandler,
      state.ratingFilter,
      setCategoryHandler,
      state.categoryFilter,
      sortPriceHandler,
      state.sortPriceFilter,
      state.productsLoading,
      state.categoriesLoading,
    ]
  );

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
