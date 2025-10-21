import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const rawData = fs.readFileSync("prisma/post.json", "utf-8");
  const posts = JSON.parse(rawData);

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }

  console.log("✅ Posts seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });