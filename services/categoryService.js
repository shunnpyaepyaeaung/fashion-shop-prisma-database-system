const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createCategory = async (categoryname) => {
  const category = await prisma.category.create({
    data: {
      categoryname,
    },
  });
  return category;
};

const allCategory = async () => {
  const category = await prisma.category.findMany();
  return category;
};

const getCategoryByProductName = async (category) => {
  const product = await prisma.category.findMany({
    where: {
      categoryname: category,
    },
    select: {
      Product: {
        select: {
          productname: true,
        },
      },
    },
  });
  return product;
};

const removeCategory = async (id) => {
  const category = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  return category;
};

const updateCategory = async (id, categoryname) => {
  const category = await prisma.category.update({
    where: {
      id: id,
    },
    data: {
      categoryname,
    },
  });
  return category;
};

// updateCategory(3, "Shoes").then(console.log);

// removeCategory(6).then(console.log);

allCategory().then(console.log);
