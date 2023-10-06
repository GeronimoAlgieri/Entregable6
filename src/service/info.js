export const generateUserErrorInfo = (prod) => {
  return `One or more properties were incomplete or not valid. List of required properties:
  * title: needs to be a string, received ${prod.title}
  * description: needs to be a string, received ${prod.description}
  * code: needs to be a string, received ${prod.code}
  * price: needs to be a number, received ${prod.price}
  * stock: needs to be a number, received ${prod.stock}
  * thumbnail: needs to be a string url, received ${prod.thumbnail}`;
};
