import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';
import { hash } from 'argon2';
import create from '../helper';

export default async(count: number) => {
  await create(count, async (prisma: PrismaClient) => {
    await prisma.user.create({
      data: {
        email: Random.email(),
        password: await hash(Random.sentence()),
      },
    });
  });
};
