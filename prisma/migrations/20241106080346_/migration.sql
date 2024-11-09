/*
  Warnings:

  - A unique constraint covering the columns `[name,id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Timetable" DROP CONSTRAINT "Timetable_ownerId_fkey";

-- AlterTable
ALTER TABLE "Timetable" ADD COLUMN     "ownerName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_name_id_key" ON "User"("name", "id");

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_ownerId_ownerName_fkey" FOREIGN KEY ("ownerId", "ownerName") REFERENCES "User"("id", "name") ON DELETE SET NULL ON UPDATE CASCADE;
