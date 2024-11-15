/*
  Warnings:

  - You are about to drop the column `email` on the `Doctor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Doctor_email_key";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "email",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_username_key" ON "Doctor"("username");
