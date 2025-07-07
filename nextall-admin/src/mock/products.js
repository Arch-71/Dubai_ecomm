export const products = [
  {
    id: '1',
    name: 'Nike Air Max',
    price: 99.99,
    status: 'active',
    category: 'Shoes',
    stock: 50,
    images: ['https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'],
    description: 'Comfortable running shoes',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Leather Jacket',
    price: 199.99,
    status: 'active',
    category: 'Clothing',
    stock: 30,
    images: ['https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'],
    description: 'Classic leather jacket',
    createdAt: new Date().toISOString(),
  },
  // Add more mock products as needed
]; 