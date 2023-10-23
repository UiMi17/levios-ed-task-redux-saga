import {useCallback, useEffect, useState} from "react";
import {useDebounce} from "../hooks/useDebounce";
import {useTranslation} from "react-i18next";
import ProductsList from "../components/ProductsList/ProductsList";
import Filter from "../components/Filter/Filter";
import ErrorBoundary from "../highOrderedComponents/ErrorBoundary";
import {useDispatch, useSelector} from "react-redux";
import {selectProducts} from "../redux/selectors";

const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector(selectProducts) || [];
    const [filter, setFilter] = useState("");
    const debouncedFilter = useDebounce(filter, 700);
    const [selectedCategory, setSelectedCategory] = useState("none");
    const {t} = useTranslation();
    const categories = [
        ...new Set(products.map(({bsr_category}) => bsr_category)),
    ];

    useEffect(() => {
        dispatch({type: "WATCH_PRODUCTS_FETCH"});
    }, [dispatch]);


    const handleFilterInputChange = useCallback((value) => {
        setFilter(value);
    }, []);

    const handleFilterCategoryChange = (value) => {
        setSelectedCategory(value);
    };

    const filteredProducts = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(debouncedFilter.toLowerCase()) &&
            (selectedCategory === "none" || product.bsr_category === selectedCategory)
        );
    });

    return (
        <>
            <Filter
                handleFilterInputChange={handleFilterInputChange}
                categories={categories}
                handleFilterCategoryChange={handleFilterCategoryChange}
            />
            <ErrorBoundary
                fallback={<h1 style={{textAlign: "center"}}>{t("boundaryError")}</h1>}
            >
                <ProductsList products={filteredProducts}/>
            </ErrorBoundary>
        </>
    );
};

export default Products;
