const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = async (username, email, password) => {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
  return user;
};

const getAllUser = async () => {
  return await prisma.user.findMany();
};

getAllUser().then(console.log);

// createUser("Shunn", "shunn@gmail.com", "shunn123").then(console.log);
// createUser("Kas", "kas@gmail.com", "kas123").then(console.log);
