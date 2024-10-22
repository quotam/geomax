/*
  Warnings:

  - You are about to drop the `Qa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QaCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Qa" DROP CONSTRAINT "Qa_categoryID_fkey";

-- DropTable
DROP TABLE "Qa";

-- DropTable
DROP TABLE "QaCategory";
