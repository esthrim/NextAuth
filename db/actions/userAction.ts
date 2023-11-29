import prisma from "../utils/prisma";

export async function getUser(email: string, password: string) {
  const findUser = await prisma.user.findUnique({
    where: {
      email,
      password,
    },
  });

  return findUser;
}

export async function getUserByEmail(email: string) {
  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return findUser;
}

export async function addUser(name: string, email: string, image: string) {
    
  const addUser = await prisma.user.create({
    data: {
      email,
      name,
      image,
      roleId: 1,
    },
  });

  return addUser;
}
