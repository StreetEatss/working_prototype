-- CreateEnum
CREATE TYPE "OwnerRole" AS ENUM ('OWNER', 'MANAGER');

-- CreateEnum
CREATE TYPE "TruckStatus" AS ENUM ('OPEN', 'CLOSED', 'MOVED', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "StatusSource" AS ENUM ('CROWD', 'OWNER', 'ADMIN', 'AUTOMATION');

-- CreateTable
CREATE TABLE "FoodTruck" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cuisineType" TEXT,
    "imageUrl" TEXT,
    "venmoHandle" TEXT,
    "defaultLocation" TEXT,
    "defaultLatitude" DOUBLE PRECISION,
    "defaultLongitude" DOUBLE PRECISION,
    "typicalSchedule" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodTruck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnerTruckAccess" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "truckId" TEXT NOT NULL,
    "role" "OwnerRole" NOT NULL DEFAULT 'OWNER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OwnerTruckAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "priceCents" INTEGER,
    "imageUrl" TEXT,
    "truckId" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuReview" (
    "id" TEXT NOT NULL,
    "menuItemId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "tasteRating" INTEGER,
    "valueRating" INTEGER,
    "comment" TEXT,
    "photoUrl" TEXT,
    "reporterName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "locationSource" TEXT,

    CONSTRAINT "MenuReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusUpdate" (
    "id" TEXT NOT NULL,
    "truckId" TEXT NOT NULL,
    "status" "TruckStatus" NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "note" TEXT,
    "reporterName" TEXT,
    "reliability" DOUBLE PRECISION,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" "StatusSource" NOT NULL DEFAULT 'CROWD',

    CONSTRAINT "StatusUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OwnerTruckAccess_ownerId_truckId_key" ON "OwnerTruckAccess"("ownerId", "truckId");

-- AddForeignKey
ALTER TABLE "OwnerTruckAccess" ADD CONSTRAINT "OwnerTruckAccess_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnerTruckAccess" ADD CONSTRAINT "OwnerTruckAccess_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "FoodTruck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "FoodTruck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuReview" ADD CONSTRAINT "MenuReview_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusUpdate" ADD CONSTRAINT "StatusUpdate_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "FoodTruck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

