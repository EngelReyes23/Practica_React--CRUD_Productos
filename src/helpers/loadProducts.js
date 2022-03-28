export const loadProducts = async () => {
  // Ruta de la colección
  const collectionPath = "productos/";

  const products = await db.collection(collectionPath).get();

  return products.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
