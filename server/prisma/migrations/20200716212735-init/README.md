# Migration `20200716212735-init`

This migration has been generated by Fran Zekan at 7/16/2020, 9:27:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Todo" ALTER COLUMN "id" DROP DEFAULT;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200716212735-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,18 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Todo {
+  id          Int       @default(autoincrement()) @id
+  title       String?
+  description String?
+  checked     Boolean   @default(false)
+  checkedAt   DateTime?
+  createdAt   DateTime  @default(now())
+  updatedAt   DateTime  @updatedAt
+}
```

