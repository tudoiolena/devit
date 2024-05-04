import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const countAllProducts = async () => {
  const productsCount = await prisma.product.count();
  return productsCount;
};

export const countAllProductsOnStock = async (uuid: string) => {
  const productsCount = await prisma.stock.findUnique({
    where: { uuid },
    select: { products: { select: { sku: true } } },
  });
  return productsCount?.products.length;
};

export const countProduct = async (sku: string) => {
  const productCount = await prisma.product.count({ where: { sku } });
  return productCount;
};

export const countProductOnStock = async (uuid: string, sku: string) => {
  const productCount = await prisma.stock.findUnique({
    where: { uuid },
    select: { products: { where: { sku } } },
  });
  return productCount?.products.length;
};

export const countProductByCategory = async (slug: string) => {
  const productCount = await prisma.productCategory.count({
    where: { categoryId: slug },
  });
  return productCount;
};

export const countProductOnStockByCategory = async (
  uuid: string,
  slug: string
) => {
  const productCount = await prisma.stock.findUnique({
    where: { uuid },
    select: {
      products: {
        where: {
          categories: { some: { category: { slug } } },
        },
      },
    },
  });
  return productCount?.products.length;
};

async function main() {
  const categories = await prisma.category.createMany({
    data: [
      { slug: "elect", title: "Electronics" },
      { slug: "cloth", title: "Clothing" },
      { slug: "furnit", title: "Furniture" },
    ],
  });

  console.log("Created categories:", categories);

  const products = await prisma.product.createMany({
    data: [
      {
        sku: "SKU001",
        title: "Laptop",
      },
      {
        sku: "SKU002",
        title: "T-shirt",
      },
      {
        sku: "SKU003",
        title: "Chair",
      },
      {
        sku: "SKU004",
        title: "Sport Watches",
      },
    ],
  });

  console.log("Created products: ", products);

  const stocks = await prisma.stock.createMany({
    data: [
      {
        uuid: "stock-1",
        title: "Warehouse A",
      },
      {
        uuid: "stock-2",
        title: "Warehouse B",
      },
    ],
  });
  console.log("Created stocks", stocks);

  const createdProductCategory = await prisma.productCategory.createMany({
    data: [
      {
        productId: "SKU001",
        categoryId: "elect",
      },
      {
        productId: "SKU002",
        categoryId: "cloth",
      },

      { productId: "SKU003", categoryId: "cloth" },
      { productId: "SKU003", categoryId: "elect" },
      {
        productId: "SKU004",
        categoryId: "furnit",
      },
    ],
  });

  console.log("Created product-category association:", createdProductCategory);

  const updatedStock1 = await prisma.stock.update({
    where: { uuid: "stock-1" },
    data: {
      products: {
        connect: [{ sku: "SKU001" }, { sku: "SKU003" }, { sku: "SKU004" }],
      },
    },
  });

  const updatedStock2 = await prisma.stock.update({
    where: { uuid: "stock-2" },
    data: {
      products: {
        connect: [{ sku: "SKU002" }],
      },
    },
  });

  console.log("Updated Stock 1:", updatedStock1);
  console.log("Updated Stock 2:", updatedStock2);

  console.log("🎉 *** Mock data inserted successfully. *** 🎉 ");

  const totalProducts = await countAllProducts();
  console.log("Total products:", totalProducts);

  const totalCategoriesStock1 = await countAllProductsOnStock("stock-1");
  console.log(`Total products on stock "Warehouse A"`, totalCategoriesStock1);

  const totalCategoriesStock2 = await countAllProductsOnStock("stock-2");
  console.log(`Total products on stock "Warehouse B"`, totalCategoriesStock2);

  const productAmount = await countProduct("SKU001");
  console.log(`Amount of product "Laptop": `, productAmount);

  const produnctAmountOnStock = await countProductOnStock("stock-1", "SKU001");
  console.log(
    `Amount of product "Laptop" on stock "WarehouseA": `,
    produnctAmountOnStock
  );

  const productsInCategoryCloth = await countProductByCategory("cloth");
  console.log(`Products in category "Clothes"`, productsInCategoryCloth);

  const productsInCategoryElectr = await countProductByCategory("elect");
  console.log(`Products in category "Electronics"`, productsInCategoryElectr);

  const productsInCategoryFurnit = await countProductByCategory("furnit");
  console.log(`Products in category "Furniture"`, productsInCategoryFurnit);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
