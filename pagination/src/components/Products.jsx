import { useEffect, useState } from "react";
import { fetchProducts } from "../Utils/productsUtils";
import ProductItem from "./ProductItem";
import Pagination from "./Pagination";

function Products() {
  //6 items per page
  //40 items
  const ITEMS_PER_PAGE = 10;
  const [pageNumber, setPageNumber] = useState(1);
  const [products, setProducts] = useState();
  //   const [displayProducts, setDisplayProducts] = useState();
  const [totalCount, setTotalCount] = useState();
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const products = await fetchProducts();
  //         console.log(products.products);
  //         setProducts(products.products);
  //       } catch {
  //         console.error();
  //       }
  //     };
  //     fetchData();
  //   }, []);

  useEffect(() => {
    // let start = ITEMS_PER_PAGE * (pageNumber - 1);
    // let end = start + ITEMS_PER_PAGE;
    // let slicedList = products?.slice(start, end);
    // setDisplayProducts(slicedList);
    let skip = ITEMS_PER_PAGE * pageNumber - ITEMS_PER_PAGE;
    const fetchData = async () => {
      try {
        const products = await fetchProducts(ITEMS_PER_PAGE, skip);
        setProducts(products.products);
        setTotalCount(products.total);
      } catch {
        console.error();
      }
    };
    fetchData();
  }, [pageNumber]);

  return (
    <div>
      {products && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            {products?.map((product) => (
              <ProductItem key={product.id} {...product} />
            ))}
          </div>
          <Pagination
            totalCount={totalCount}
            setPageNumber={(pageNumber) => setPageNumber(pageNumber)}
            size={ITEMS_PER_PAGE}
          />
        </>
      )}
    </div>
  );
}

export default Products;
