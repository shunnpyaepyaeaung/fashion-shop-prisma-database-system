const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addCart = async (userId, productId, quantity) => {
  const cart = await prisma.cart.create({
    data: {
      userTable: {
        connect: {
          id: userId,
        },
      },
      productTable: {
        connect: {
          id: productId,
        },
      },
      quantity,
    },
  });
  return cart;
};

const viewCart = async () => {
  return await prisma.cart.findMany();
};

const cartByUserId = async (userid) => {
  const cart = await prisma.user.findMany({
    where: {
      id: userid,
    },
    select: {
      Cart: {
        select: {
          userId: true,
          productId: true,
          quantity: true,
        },
      },
    },
  });
  return cart;
};

const removeCart = async (userid, productid) => {
  const cart = await prisma.cart.deleteMany({
    where: {
      AND: [
        {
          userId: userid,
        },
        {
          productId: productid,
        },
      ],
    },
  });
  return cart;
};
// removeCart(1, 18).then(console.log);
// cartByUserId(1).then((res) => console.dir(res, { depth: null }));

// addCart(1, 21, 2).then(console.log);
// addCart(1, 18, 1).then(console.log);

viewCart().then(console.log);

module.exports = { addCart, removeCart, cartByUserId };
