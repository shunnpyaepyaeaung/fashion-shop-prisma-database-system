const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createProduct = async (productname, price, detail, image, categoryId) => {
  const product = await prisma.product.create({
    data: {
      productname,
      price,
      detail,
      image,
      categoryTable: {
        connect: {
          id: categoryId,
        },
      },
    },
  });
  return product;
};

const allProducts = async () => {
  const product = await prisma.product.findMany({
    select: {
      id: true,
      productname: true,
      price: true,
      detail: true,
      image: true,
      categoryTable: {
        select: {
          categoryname: true,
        },
      },
    },
  });
  return product;
};

const deleteProductById = async (productId) => {
  const product = await prisma.product.delete({
    where: {
      id: productId,
    },
  });
  return productId;
};

const updateProductById = async (
  id,
  productname,
  price,
  detail,
  image,
  categoryId
) => {
  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      productname,
      price,
      detail,
      image,
      categoryId,
    },
  });
  return product;
};

const viewProductByName = async (productname) => {
  const product = await prisma.product.findMany({
    where: {
      productname: {
        contains: productname,
      },
    },
  });
  return product;
};

const viewProductByPageNumberandPriceRange = async (pageNumber, min, max) => {
  let skip = (pageNumber - 1) * 8;
  let andCondition = [];

  if (min !== 0 || max !== 0) {
    andCondition = [
      {
        price: {
          lte: max,
        },
      },
      {
        price: {
          gte: min,
        },
      },
    ];
  }
  const page = await prisma.product.findMany({
    skip,
    take: 8,
    where: {
      AND: andCondition,
    },
  });
  return page;
};

const viewProductByCategoryWithPageNumberandPriceRange = async (
  categoryId,
  pageNumber,
  min,
  max
) => {
  let andCondition = [];

  if (min !== 0 || max !== 0) {
    andCondition = [
      {
        price: {
          lte: max,
        },
      },
      {
        price: {
          gte: min,
        },
      },
    ];
  }

  let skip = (pageNumber - 1) * 8;
  const product = await prisma.product.findMany({
    skip,
    take: 8,
    where: {
      categoryTable: {
        id: categoryId,
      },
      AND: andCondition,
    },
  });
  return product;
};

viewProductByCategoryWithPageNumberandPriceRange(1, 1, 0, 0).then(console.log);
// viewProductByPageNumberandPriceRange(1, 0, 100).then(console.log);
// viewProductByName("Jacket").then(console.log);

// allProducts().then(console.log);

// deleteProductById(5).then(console.log);

// for (var pro of cat) {
//   createProduct(
//     pro.productname,
//     pro.price,
//     pro.detail,
//     pro.image,
//     pro.categoryId
//   ).then(console.log);
// }
