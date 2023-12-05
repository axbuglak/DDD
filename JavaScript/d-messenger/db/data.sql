INSERT INTO "account" ("login", "password") VALUES
  ('admin', '123==:123=='),
  ('marcus', 'dpHw0OUNBz76nuqrXZbeYQ==:wpvUVgi8Yp9rJ0yZyBWecaWP2EL/ahpxZY74KOVfhAYbAZSq6mWqjsQwtCvIPcSKZqUVpVb13JcSciB2fA+6Tg=='),
  ('user', 'r8zb8AdrlPSh5wNy6hqOxg==:HyO5rvOFLtwzU+OZ9qFi3ADXlVccDJWGSfUS8mVq43spJ6sxyliUdW3i53hOPdkFAtDn3EAQMttOlIoJap1lTQ=='),
  ('iskandar', 'aqX1O4bKXiwC/Jh2EKNIYw==:bpE4TARNg09vb2Libn1c00YRxcvoklB9zVSbD733LwQQFUuAm7WHP85PbZXwEbbeOVPIFHgflR4cvEmvYkr76g==');

-- Examples login/password
-- admin/123456
-- marcus/marcus
-- user/nopassword
-- iskandar/zulqarnayn

INSERT INTO "Product" ("name", "description") VALUES 
  ('Chair', 'Very comfortable chair');

INSERT INTO "Color" ("name") VALUES
  ('red'),
  ('black');

INSERT INTO "Material" ("name", "price") VALUES
  ('wood', 123),
  ('leather', 129);

INSERT INTO "Variant" ("colorId", "price") VALUES 
  (1, 129);

INSERT INTO "VariantMaterial" ("variantId", "materialId") VALUES
  (1, 2),
  (1, 1);

INSERT INTO "ProductVariant" ("productId", "variantId") VALUES
  (1, 1);

INSERT INTO "Area" ("name", "ownerId") VALUES
  ('Metarhia', 2),
  ('Metaeducation', 2);

INSERT INTO "AreaAccount" ("areaId", "accountId") VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (2, 1),
  (2, 2),
  (2, 3),
  (2, 4);
