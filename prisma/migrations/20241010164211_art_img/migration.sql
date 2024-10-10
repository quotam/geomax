/*
  Warnings:

  - You are about to drop the column `articleType` on the `ArticleCategory` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `ArticleCategory` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `ArticleCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ArticleCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ArticleType" ADD VALUE 'FAQ';

-- DropForeignKey
ALTER TABLE "ArticleCategory" DROP CONSTRAINT "ArticleCategory_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleCategory" DROP CONSTRAINT "ArticleCategory_categoryId_fkey";

-- DropIndex
DROP INDEX "ArticleCategory_articleId_categoryId_articleType_key";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "articleCategoryId" TEXT,
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "ArticleCategory" DROP COLUMN "articleType",
DROP COLUMN "categoryId",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" "ArticleType" NOT NULL,
ALTER COLUMN "articleId" DROP NOT NULL;

-- DropTable
DROP TABLE "Category";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_articleCategoryId_fkey" FOREIGN KEY ("articleCategoryId") REFERENCES "ArticleCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
