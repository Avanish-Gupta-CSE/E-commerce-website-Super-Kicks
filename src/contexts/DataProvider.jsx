import { useNavigate } from "react-router";

const { createContext, useContext, useEffect, useReducer } = require("react");

const DataContext = createContext();

const reducerFunction = (state, action) => {
    switch (action.type) {
        case "setProducts": {
            return { ...state, products: action.payload };
        }
        case "setCategories": {
            return { ...state, categories: action.payload };
        }
        case "searchHandler": {
            return { ...state, search: action.payload };
        }
        case "singleCategoryFilterHandler": {
            return {
                ...state,
                categoryFilter: action.payload,
                search: "",
                priceFilter: "",
                ratingFilter: "",
                sortPriceFilter: "",
            };
        }
        case "setCategoryHandler": {
            return { ...state, categoryFilter: action.payload };
        }
        case "priceFilterHandler": {
            return { ...state, priceFilter: action.payload };
        }
        case "ratingFilterHandler": {
            return { ...state, ratingFilter: action.payload };
        }
        case "sortPriceHandler": {
            return { ...state, sortPriceFilter: action.payload };
        }
        case "getAllDataHandler": {
            return {
                ...state,
                categoryFilter: [],
                search: "",
                priceFilter: "",
                ratingFilter: "",
                sortPriceFilter: "",
            };
        }
        case "setProductsLoading": {
            return { ...state, productsLoading: action.payload };
        }
        case "setCategoriesLoading": {
            return { ...state, categoriesLoading: action.payload };
        }
        default:
            return state;
    }
};

export const DataProvider = ({ children }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducerFunction, {
        products: [],
        categories: [],
        search: "",
        categoryFilter: [],
        priceFilter: "",
        ratingFilter: "",
        sortPriceFilter: "",
        productsLoading: true,
        categoriesLoading: true,
    });
    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            if (res.status === 200) {
                const { products } = await res.json();
                dispatch({ type: "setProducts", payload: products });
            }
        } catch (e) {
            console.log(e);
        } finally {
            dispatch({ type: "setProductsLoading", payload: false });
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/categories");
            if (res.status === 200) {
                const { categories } = await res.json();
                dispatch({ type: "setCategories", payload: categories });
            }
        } catch (e) {
            console.log(e);
        } finally {
            dispatch({ type: "setCategoriesLoading", payload: false });
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const searchHandler = (e) => {
        navigate("/products");
        dispatch({ type: "searchHandler", payload: e.target.value });
    };

    const singleCategoryFilterHandler = (categoryName) => {
        navigate("/products");
        dispatch({ type: "singleCategoryFilterHandler", payload: [categoryName] });
    };
    const getAllDataHandler = () => {
        dispatch({ type: "getAllDataHandler" });
    };
    const priceFilterHandler = (e) => {
        dispatch({ type: "priceFilterHandler", payload: e.target.value });
    };

    const ratingFilterHandler = (e) => {
        dispatch({ type: "ratingFilterHandler", payload: e.target.value });
    };
    const setCategoryHandler = (e) => {
        if (state.categoryFilter.includes(e.target.value)) {
            const newData = state.categoryFilter.filter(category => !(category === e.target.value));
            dispatch({type:"setCategoryHandler", payload:newData});
        } else {
            const newData = [...state.categoryFilter];
            newData.push(e.target.value);
            dispatch({type:"setCategoryHandler", payload:newData});
        }
    };
        const sortPriceHandler = (e) => {
        dispatch({ type: "sortPriceHandler", payload: e.target.value });
    };
    const getFilteredData = () => {
        let filteredData = [...state.products];
        if (state.search !== "") {
            filteredData = filteredData.filter(({ productName }) =>
                productName.toLowerCase().includes(state.search.toLowerCase())
            );
        }
        if (state.categoryFilter.length > 0) {
            filteredData = filteredData.filter(({ categoryName }) => {
                return state.categoryFilter.includes(categoryName);
            });
        }
        if (state.priceFilter !== "") {
            filteredData = filteredData.filter(({ discountedPrice }) => {
                return discountedPrice <= state.priceFilter;
            });
        }
        if (state.ratingFilter !== "") {
            filteredData = filteredData.filter(({ rating }) => {
                return rating >= state.ratingFilter;
            });
        }
        if (state.sortPriceFilter !== "") {
            if (state.sortPriceFilter === "asc") {
                filteredData.sort(
                    (a, b) => a.discountedPrice - b.discountedPrice
                );
            }
            if (state.sortPriceFilter === "desc") {
                filteredData.sort(
                    (a, b) => b.discountedPrice - a.discountedPrice
                );
            }
        }
        return filteredData;
    };

    return (
        <DataContext.Provider
            value={{
                products: state.products,
                filteredProducts: getFilteredData(),
                trendingProducts: state.products.filter(
                    ({ trending }) => trending
                ),
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
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => useContext(DataContext);
