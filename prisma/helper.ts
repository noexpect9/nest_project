import { PrismaClient } from '@prisma/client';

export default async function create(
  count = 10,
  callback: (a) => Promise<void>,
) {
  const prisma = new PrismaClient();
  for (let i = 1; i <= count; i++) {
    await callback(prisma);
  }
}
