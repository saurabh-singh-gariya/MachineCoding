export const fetchProducts = async (limit, skip) => {
  const URL = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
  const response = await fetch(URL);
  return await response.json();
};
