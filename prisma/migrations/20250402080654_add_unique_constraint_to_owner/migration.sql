/*
  Warnings:

  - A unique constraint covering the columns `[owner]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contact_owner_key" ON "Contact"("owner");
