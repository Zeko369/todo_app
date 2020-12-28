# Migration `20200716212919-add-requirements`

This migration has been generated by Fran Zekan at 7/16/2020, 9:29:19 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."List" (
"id" SERIAL,
"title" text   ,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."_Requirements" (
"A" integer  NOT NULL ,
"B" integer  NOT NULL )

ALTER TABLE "public"."Todo" ADD COLUMN "listId" integer   ,
ALTER COLUMN "id" DROP DEFAULT;

CREATE UNIQUE INDEX "_Requirements_AB_unique" ON "public"."_Requirements"("A","B")

CREATE  INDEX "_Requirements_B_index" ON "public"."_Requirements"("B")

ALTER TABLE "public"."_Requirements" ADD FOREIGN KEY ("A")REFERENCES "public"."Todo"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_Requirements" ADD FOREIGN KEY ("B")REFERENCES "public"."Todo"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Todo" ADD FOREIGN KEY ("listId")REFERENCES "public"."List"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200716212827-add-lists..20200716212919-add-requirements
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
@@ -15,8 +15,10 @@
   checkedAt   DateTime?
   createdAt   DateTime  @default(now())
   list        List?     @relation(fields: [listId], references: [id])
   listId      Int?
+  requires    Todo[]    @relation("Requirements", references: [id])
+  requiredBy  Todo[]    @relation("Requirements", references: [id])
   updatedAt   DateTime  @updatedAt
 }
 model List {
```

