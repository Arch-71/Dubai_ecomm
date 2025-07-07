// Mock data for frontend development
const mockData = {
  products: [
    {
      id: 1,
      name: 'Sample Product 1',
      price: 99.99,
      stock: 100,
      category: 'Electronics',
      status: 'active'
    },
    {
      id: 2,
      name: 'Sample Product 2',
      price: 149.99,
      stock: 50,
      category: 'Fashion',
      status: 'active'
    }
  ],
  orders: [
    {
      id: 1,
      orderNumber: 'ORD-001',
      customer: 'John Doe',
      total: 99.99,
      status: 'pending',
      date: '2024-02-07'
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customer: 'Jane Smith',
      total: 149.99,
      status: 'completed',
      date: '2024-02-06'
    }
  ],
  users: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'customer'
    }
  ],
  dashboard: {
    totalSales: 10250.00,
    totalOrders: 125,
    totalProducts: 45,
    totalCustomers: 89,
    recentOrders: [
      {
        id: 1,
        orderNumber: 'ORD-001',
        customer: 'John Doe',
        total: 99.99,
        status: 'pending'
      }
    ],
    salesChart: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      data: [1200, 1900, 2100, 2500, 2300]
    }
  }
};

// Mock API functions
export const mockApi = {
  // Auth
  login: async (credentials) => {
    if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
      return {
        user: {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        },
        token: 'mock-jwt-token'
      };
    }
    throw new Error('Invalid credentials');
  },

  // Products
  getProducts: async () => mockData.products,
  getProduct: async (id) => mockData.products.find(p => p.id === id),
  createProduct: async (data) => ({ ...data, id: Date.now() }),
  updateProduct: async (id, data) => ({ ...data, id }),
  deleteProduct: async (id) => ({ success: true }),

  // Orders
  getOrders: async () => mockData.orders,
  getOrder: async (id) => mockData.orders.find(o => o.id === id),
  updateOrder: async (id, data) => ({ ...data, id }),

  // Users
  getUsers: async () => mockData.users,
  getUser: async (id) => mockData.users.find(u => u.id === id),

  // Dashboard
  getDashboardStats: async () => mockData.dashboard,

  get: async (endpoint) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    switch (endpoint) {
      case '/dashboard':
        return {
          totalSales: 150000,
          totalOrders: 250,
          totalProducts: 1200,
          totalCustomers: 850,
          recentOrders: [
            {
              id: 1,
              orderNumber: 'ORD001',
              customer: 'John Doe',
              total: 299.99,
              status: 'completed'
            },
            {
              id: 2,
              orderNumber: 'ORD002',
              customer: 'Jane Smith',
              total: 199.99,
              status: 'pending'
            },
            {
              id: 3,
              orderNumber: 'ORD003',
              customer: 'Mike Johnson',
              total: 499.99,
              status: 'completed'
            }
          ]
        };
      default:
        throw new Error('Endpoint not found');
    }
  }
};

export default mockApi; 