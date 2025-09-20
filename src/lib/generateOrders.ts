import { Order } from "./order";

export const generateOrders = (): Order[] => {
  const baseOrders: Order[] = [
    {
      id: "#CM9801",
      user: { name: "Natali Craig", avatar: "/1.png" },
      project: "Landing Page",
      address: "Meadow Lane Oakland",
      date: "Just now",
      status: "In Progress",
    },
    {
      id: "#CM9802",
      user: { name: "Kate Morrison", avatar: "/2.png" },
      project: "CRM Admin pages",
      address: "Larry San Francisco",
      date: "A minute ago",
      status: "Complete",
    },
    {
      id: "#CM9803",
      user: { name: "Drew Cano", avatar: "/3.png" },
      project: "Client Project",
      address: "Bagwell Avenue Ocala",
      date: "1 hour ago",
      status: "Pending",
    },
    {
      id: "#CM9804",
      user: { name: "Orlando Diggs", avatar: "/4.png" },
      project: "Admin Dashboard",
      address: "Washburn Baton Rouge",
      date: "Yesterday",
      status: "Approved",
    },
    {
      id: "#CM9805",
      user: { name: "Andi Lane", avatar: "/5.png" },
      project: "App Landing Page",
      address: "Nest Lane Olivette",
      date: "Feb 2, 2023",
      status: "Rejected",
    },
  ];

  const additionalNames = [
    "John Doe",
    "Jane Smith",
    "Chris Adams",
    "Emma Brown",
    "Michael Lee",
    "Sarah Wilson",
    "David Johnson",
    "Lisa Anderson",
    "Robert Taylor",
    "Maria Garcia",
    "James Martinez",
    "Patricia Rodriguez",
    "William Davis",
    "Jennifer Lopez",
    "Richard Brown",
    "Mary Miller",
    "Thomas Wilson",
    "Barbara Moore",
    "Daniel Taylor",
    "Elizabeth Anderson",
  ];

  const projects = [
    "Portfolio Website",
    "E-commerce Store",
    "Mobile App",
    "Dashboard Revamp",
    "SaaS Platform",
    "Blog Platform",
    "Social Media App",
    "Analytics Dashboard",
    "Payment Gateway",
    "API Integration",
    "Marketing Website",
    "Content Management",
    "Customer Portal",
    "Booking System",
    "Learning Platform",
  ];

  const addresses = [
    "Maple Street Denver",
    "Pine Road Seattle",
    "Lakeview Chicago",
    "Cedar Lane Austin",
    "Broadway New York",
    "Sunset Blvd Los Angeles",
    "Main Street Boston",
    "Park Avenue Miami",
    "River Road Portland",
    "Oak Street Phoenix",
    "Valley View Dallas",
    "Mountain Road Vegas",
    "Beach Drive San Diego",
    "Forest Lane Atlanta",
    "Hill Street Detroit",
  ];

  const statuses = [
    "Complete",
    "In Progress",
    "Pending",
    "Approved",
    "Rejected",
  ];
  const dates = [
    "Just now",
    "2 minutes ago",
    "5 minutes ago",
    "10 minutes ago",
    "30 minutes ago",
    "1 hour ago",
    "2 hours ago",
    "Yesterday",
    "2 days ago",
    "Feb 1, 2023",
    "Feb 3, 2023",
    "Feb 5, 2023",
    "Feb 8, 2023",
    "Feb 10, 2023",
    "Feb 12, 2023",
    "Feb 14, 2023",
    "Feb 16, 2023",
    "Feb 18, 2023",
    "Feb 20, 2023",
    "Feb 22, 2023",
  ];

  const allOrders = [...baseOrders];

  // Generate 45 more orders to make total 50
  for (let i = 6; i <= 50; i++) {
    const orderId = `#CM${9800 + i}`;
    const randomNameIndex = Math.floor(Math.random() * additionalNames.length);
    const randomProjectIndex = Math.floor(Math.random() * projects.length);
    const randomAddressIndex = Math.floor(Math.random() * addresses.length);
    const randomStatusIndex = Math.floor(Math.random() * statuses.length);
    const randomDateIndex = Math.floor(Math.random() * dates.length);

    allOrders.push({
      id: orderId,
      user: {
        name: additionalNames[randomNameIndex],
        avatar: `/${(i % 10) + 1}.png`,
      },
      project: projects[randomProjectIndex],
      address: addresses[randomAddressIndex],
      date: dates[randomDateIndex],
      status: statuses[randomStatusIndex],
    });
  }

  return allOrders;
};
