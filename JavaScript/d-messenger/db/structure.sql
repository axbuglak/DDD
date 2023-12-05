CREATE TABLE "Role" (
  "roleId" bigint generated always as identity,
  "name" varchar NOT NULL,
  "chunk" integer NOT NULL
);

ALTER TABLE "Role" ADD CONSTRAINT "pkRole" PRIMARY KEY ("roleId");
CREATE UNIQUE INDEX "akRoleName" ON "Role" ("name");

CREATE TABLE "Account" (
  "accountId" bigint generated always as identity,
  "login" varchar(64) NOT NULL,
  "password" varchar NOT NULL
);

ALTER TABLE "Account" ADD CONSTRAINT "pkAccount" PRIMARY KEY ("accountId");
CREATE UNIQUE INDEX "akAccountLogin" ON "Account" ("login");

CREATE TABLE "AccountRole" (
  "accountId" bigint NOT NULL,
  "roleId" bigint NOT NULL
);

ALTER TABLE "AccountRole" ADD CONSTRAINT "pkAccountRole" PRIMARY KEY ("accountId", "roleId");
ALTER TABLE "AccountRole" ADD CONSTRAINT "fkAccountRoleAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;
ALTER TABLE "AccountRole" ADD CONSTRAINT "fkAccountRoleRole" FOREIGN KEY ("roleId") REFERENCES "Role" ("roleId") ON DELETE CASCADE;

CREATE TABLE "Area" (
  "areaId" bigint generated always as identity,
  "name" varchar NOT NULL,
  "ownerId" bigint NOT NULL
);

ALTER TABLE "Area" ADD CONSTRAINT "pkArea" PRIMARY KEY ("areaId");
CREATE UNIQUE INDEX "akAreaName" ON "Area" ("name");
ALTER TABLE "Area" ADD CONSTRAINT "fkAreaOwner" FOREIGN KEY ("ownerId") REFERENCES "Account" ("accountId");

CREATE TABLE "AreaAccount" (
  "areaId" bigint NOT NULL,
  "accountId" bigint NOT NULL
);

ALTER TABLE "AreaAccount" ADD CONSTRAINT "pkAreaAccount" PRIMARY KEY ("areaId", "accountId");
ALTER TABLE "AreaAccount" ADD CONSTRAINT "fkAreaAccountArea" FOREIGN KEY ("areaId") REFERENCES "Area" ("areaId") ON DELETE CASCADE;
ALTER TABLE "AreaAccount" ADD CONSTRAINT "fkAreaAccountAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;

CREATE TABLE "Color" (
  "colorId" bigint generated always as identity,
  "name" varchar NOT NULL
);

ALTER TABLE "Color" ADD CONSTRAINT "pkColor" PRIMARY KEY ("colorId");

CREATE TABLE "Discount" (
  "discountId" bigint generated always as identity,
  "discount" integer NOT NULL
);

ALTER TABLE "Discount" ADD CONSTRAINT "pkDiscount" PRIMARY KEY ("discountId");

CREATE TABLE "Material" (
  "materialId" bigint generated always as identity,
  "name" varchar NOT NULL,
  "price" integer NOT NULL
);

ALTER TABLE "Material" ADD CONSTRAINT "pkMaterial" PRIMARY KEY ("materialId");

CREATE TABLE "Message" (
  "messageId" bigint generated always as identity,
  "areaId" bigint NOT NULL,
  "fromId" bigint NOT NULL,
  "text" varchar NOT NULL
);

ALTER TABLE "Message" ADD CONSTRAINT "pkMessage" PRIMARY KEY ("messageId");
ALTER TABLE "Message" ADD CONSTRAINT "fkMessageArea" FOREIGN KEY ("areaId") REFERENCES "Area" ("areaId");
ALTER TABLE "Message" ADD CONSTRAINT "fkMessageFrom" FOREIGN KEY ("fromId") REFERENCES "Account" ("accountId");

CREATE TABLE "Variant" (
  "variantId" bigint generated always as identity,
  "colorId" bigint NOT NULL,
  "price" integer NOT NULL
);

ALTER TABLE "Variant" ADD CONSTRAINT "pkVariant" PRIMARY KEY ("variantId");
ALTER TABLE "Variant" ADD CONSTRAINT "fkVariantColor" FOREIGN KEY ("colorId") REFERENCES "Color" ("colorId");

CREATE TABLE "VariantMaterial" (
  "variantId" bigint NOT NULL,
  "materialId" bigint NOT NULL
);

ALTER TABLE "VariantMaterial" ADD CONSTRAINT "pkVariantMaterial" PRIMARY KEY ("variantId", "materialId");
ALTER TABLE "VariantMaterial" ADD CONSTRAINT "fkVariantMaterialVariant" FOREIGN KEY ("variantId") REFERENCES "Variant" ("variantId") ON DELETE CASCADE;
ALTER TABLE "VariantMaterial" ADD CONSTRAINT "fkVariantMaterialMaterial" FOREIGN KEY ("materialId") REFERENCES "Material" ("materialId") ON DELETE CASCADE;

CREATE TABLE "Product" (
  "productId" bigint generated always as identity,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "manufacturId" bigint NOT NULL
);

ALTER TABLE "Product" ADD CONSTRAINT "pkProduct" PRIMARY KEY ("productId");
ALTER TABLE "Product" ADD CONSTRAINT "fkProductManufactur" FOREIGN KEY ("manufacturId") REFERENCES "Account" ("accountId");

CREATE TABLE "ProductVariant" (
  "productId" bigint NOT NULL,
  "variantId" bigint NOT NULL
);

ALTER TABLE "ProductVariant" ADD CONSTRAINT "pkProductVariant" PRIMARY KEY ("productId", "variantId");
ALTER TABLE "ProductVariant" ADD CONSTRAINT "fkProductVariantProduct" FOREIGN KEY ("productId") REFERENCES "Product" ("productId") ON DELETE CASCADE;
ALTER TABLE "ProductVariant" ADD CONSTRAINT "fkProductVariantVariant" FOREIGN KEY ("variantId") REFERENCES "Variant" ("variantId") ON DELETE CASCADE;

CREATE TABLE "Session" (
  "sessionId" bigint generated always as identity,
  "accountId" bigint NOT NULL,
  "token" varchar NOT NULL,
  "ip" inet NOT NULL,
  "data" jsonb NOT NULL
);

ALTER TABLE "Session" ADD CONSTRAINT "pkSession" PRIMARY KEY ("sessionId");
ALTER TABLE "Session" ADD CONSTRAINT "fkSessionAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId");
CREATE UNIQUE INDEX "akSessionToken" ON "Session" ("token");
