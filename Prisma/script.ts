import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const email = "nayanpatidar28@gmail.com";
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email, // Use the email to find the unique user
    },
  });

  if (existingUser) {
    console.log("User with this email already exists : ", existingUser);
    return;
  }

  const newUser = await prisma.user.create({
    data: {
      name: "Nayan",
      email: email,
    },
    select: {
      name: true,
      email: true,
    },
  });

  console.log("Created user:", newUser);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
