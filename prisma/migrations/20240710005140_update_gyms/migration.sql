/*
  Warnings:

  - You are about to drop the `(gyms)` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "(gyms)";

-- CreateTable
CREATE TABLE "gyms" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "gyms_pkey" PRIMARY KEY ("id")
);
