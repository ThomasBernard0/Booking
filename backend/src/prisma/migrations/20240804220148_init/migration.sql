-- CreateEnum
CREATE TYPE "BookingRequestStatus" AS ENUM ('PENDING', 'DONE', 'CANCELED');

-- CreateTable
CREATE TABLE "BookingRequest" (
    "id" SERIAL NOT NULL,
    "payment_id" TEXT NOT NULL,
    "priceInCent" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "status" "BookingRequestStatus" NOT NULL,

    CONSTRAINT "BookingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingRequestQueue" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "bookingRequestId" INTEGER NOT NULL,

    CONSTRAINT "BookingRequestQueue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "bookingRequestId" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookingRequest_payment_id_key" ON "BookingRequest"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "BookingRequestQueue_bookingRequestId_key" ON "BookingRequestQueue"("bookingRequestId");

-- AddForeignKey
ALTER TABLE "BookingRequestQueue" ADD CONSTRAINT "BookingRequestQueue_bookingRequestId_fkey" FOREIGN KEY ("bookingRequestId") REFERENCES "BookingRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bookingRequestId_fkey" FOREIGN KEY ("bookingRequestId") REFERENCES "BookingRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
