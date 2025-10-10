import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: "aamagantal@gmail.com" },
    update: {},
    create: {
      name: "Azis Agantal",
      email: "aamagantal@gmail.com",
      isAdmin: true, 
    },
  })
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
  }).finally(() => {
        prisma.$disconnect()
    })
