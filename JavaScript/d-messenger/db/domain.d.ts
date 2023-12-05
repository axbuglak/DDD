interface Role {
  name: string;
  chunk: number;
  roleId?: string;
}

interface Account {
  login: string;
  password: string;
  rolesId: string[];
  accountId?: string;
}

interface Area {
  name: string;
  ownerId: string;
  membersId: string[];
  areaId?: string;
}

interface Color {
  name: string;
  colorId?: string;
}

interface Discount {
  discount: number;
  discountId?: string;
}

interface Material {
  name: string;
  price: number;
  materialId?: string;
}

interface Message {
  areaId: string;
  fromId: string;
  text: string;
  messageId?: string;
}

interface Variant {
  colorId: string;
  price: number;
  materialsId: string[];
  variantId?: string;
}

interface Product {
  name: string;
  description: string;
  manufacturId: string;
  variationsId: string[];
  productId?: string;
}

interface Session {
  accountId: string;
  token: string;
  ip: string;
  data: string;
  sessionId?: string;
}
