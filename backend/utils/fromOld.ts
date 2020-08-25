import { promises as fs } from 'fs';
import { join } from 'path';

import { PrismaClient } from '@prisma/client';

(async () => {
  const raw = await fs.readFile(join(__dirname, '../old.txt'), 'utf8');
  const rows = raw.split('\n').slice(0, -1);

  const db = new PrismaClient();
  await db.$connect();

  const d = (s: string) => new Date(s);

  for (const row of rows) {
    const [id, title, createdAt, updatedAt, description, checked, checkedAt] = row.split('	');
    await db.todo.create({
      data: {
        title,
        description,
        checked: checked === 'TRUE',
        checkedAt: d(checkedAt),
        createdAt: d(createdAt),
        updatedAt: d(updatedAt),
      },
    });
  }

  await db.$disconnect();
})();
