# Migration `20200916221207-add-comments`

This migration has been generated by Fran Zekan at 9/17/2020, 12:12:07 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Comment" (
"id" SERIAL,
"title" text   NOT NULL ,
"content" text   ,
"userId" integer   NOT NULL ,
"todoId" integer   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("todoId")REFERENCES "public"."Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200916162817-add-user..20200916221207-add-comments
--- datamodel.dml
+++ datamodel.dml
@@ -3,26 +3,39 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 enum Role {
   USER
   ADMIN
 }
 model User {
-  id        Int      @default(autoincrement()) @id
-  username  String   @unique
-  email     String   @unique
+  id        Int       @default(autoincrement()) @id
+  username  String    @unique
+  email     String    @unique
   password  String
   todos     Todo[]
   tasks     Task[]
   lists     List[]
   tags      Tag[]
-  role      Role     @default(USER)
+  comments  Comment[]
+  role      Role      @default(USER)
+  createdAt DateTime  @default(now())
+  updatedAt DateTime  @updatedAt
+}
+
+model Comment {
+  id        Int      @default(autoincrement()) @id
+  title     String
+  content   String?
+  user      User     @relation(fields: [userId], references: [id])
+  userId    Int
+  todo      Todo     @relation(fields: [todoId], references: [id])
+  todoId    Int
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
 }
@@ -35,8 +48,9 @@
   checkedAt   DateTime?
   tasks       Task[]
   list        List?     @relation(fields: [listId], references: [id])
   listId      Int?
+  comments    Comment[]
   requires    Todo[]    @relation("Requirements", references: [id])
   requiredBy  Todo[]    @relation("Requirements", references: [id])
   tags        Tag[]     @relation("Tags", references: [id])
   user        User?     @relation(fields: [userId], references: [id])
```


