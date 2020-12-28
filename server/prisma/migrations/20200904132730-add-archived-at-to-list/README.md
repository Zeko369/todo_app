# Migration `20200904132730-add-archived-at-to-list`

This migration has been generated by Fran Zekan at 9/4/2020, 3:27:30 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."List" ADD COLUMN "archivedAt" timestamp(3)   
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200901120616-add-color-to-tags..20200904132730-add-archived-at-to-list
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Todo {
   id          Int       @default(autoincrement()) @id
@@ -22,13 +22,14 @@
   updatedAt   DateTime  @updatedAt
 }
 model List {
-  id        Int      @default(autoincrement()) @id
-  title     String?
-  todos     Todo[]
-  createdAt DateTime @default(now())
-  updatedAt DateTime @updatedAt
+  id         Int       @default(autoincrement()) @id
+  title      String?
+  todos      Todo[]
+  archivedAt DateTime?
+  createdAt  DateTime  @default(now())
+  updatedAt  DateTime  @updatedAt
 }
 model Tag {
   id        Int      @default(autoincrement()) @id
```

