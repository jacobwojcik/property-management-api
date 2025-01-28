-- CreateEnum
CREATE TYPE "State" AS ENUM ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC', 'PR');

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "state" "State" NOT NULL,
    "zipCode" CHAR(5) NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherData" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "weatherCode" INTEGER NOT NULL,
    "weatherDescriptions" TEXT[],
    "windSpeed" DOUBLE PRECISION NOT NULL,
    "windDegree" INTEGER NOT NULL,
    "windDir" TEXT NOT NULL,
    "pressure" INTEGER NOT NULL,
    "precip" DOUBLE PRECISION NOT NULL,
    "humidity" INTEGER NOT NULL,
    "cloudCover" INTEGER NOT NULL,
    "feelsLike" DOUBLE PRECISION NOT NULL,
    "uvIndex" INTEGER NOT NULL,
    "visibility" INTEGER NOT NULL,
    "isDay" TEXT NOT NULL,
    "observationTime" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeatherData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Property_city_idx" ON "Property"("city");

-- CreateIndex
CREATE INDEX "Property_state_idx" ON "Property"("state");

-- CreateIndex
CREATE INDEX "Property_zipCode_idx" ON "Property"("zipCode");

-- CreateIndex
CREATE UNIQUE INDEX "WeatherData_propertyId_key" ON "WeatherData"("propertyId");

-- CreateIndex
CREATE INDEX "WeatherData_propertyId_idx" ON "WeatherData"("propertyId");

-- AddForeignKey
ALTER TABLE "WeatherData" ADD CONSTRAINT "WeatherData_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
