// Data fetching (server-side): uses shared instance to avoid connection pooling
import { prisma } from '@/lib/prismaclient';

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
