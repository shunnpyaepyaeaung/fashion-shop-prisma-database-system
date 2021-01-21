const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { cartByUserId, removeCart } = require("./cartService");

const makeOrderByUser = async (id) => {
  var results = await cartByUserId(id);
  for (var result of results) {
    for (var cart of result.Cart) {
      const order = await prisma.order.create({
        data: {
          userTable: {
            connect: {
              id: cart.userId,
            },
          },
          productTable: {
            connect: {
              id: cart.productId,
            },
          },
          quantity: cart.quantity,
        },
      });
      removeCart(cart.userId, cart.productId);
      return order;
    }
  }
};

const orderlist = async (userid) => {
  const order = await prisma.order.findMany({
    where: {
      userTable: {
        id: userid,
      },
    },
    select: {
      quantity: true,
      productTable: {
        select: {
          productname: true,
          price: true,
        },
      },
    },
  });
  return order;
};

orderlist(1).then(console.log);

// makeOrderByUser(1).then(console.log);
