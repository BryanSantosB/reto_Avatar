/*
  Warnings:

  - Added the required column `imagen` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "imagen" TEXT NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL;
