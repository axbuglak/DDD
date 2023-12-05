({
  async read(id) {
    console.log(id);
    const products = await db('Product').read(id);
    // for (const product of products) {
    //   const variations = await db('ProductVariant').read(product.id);
    //   for (const variant of variations) {
    //     variant.materials = [];
    //     variant.colorId = await db('Color').read(variant.colorId, 'name');
    //     const materialsIds = await db('VariantMaterial').read(
    //       variant.variantId,
    //       'materialId',
    //     );
    //     for (const materialId of materialsIds) {
    //       const materialName = await db('Material').read(
    //         materialId,
    //         'name, price',
    //       );
    //       variant.materials.push(materialName);
    //     }
    //   }
    //   product.variations = variations;
    // }
    return products;
  },
});
