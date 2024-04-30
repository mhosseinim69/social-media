-- DropIndex
DROP INDEX "comments_user_key";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "user" SET DATA TYPE TEXT;
