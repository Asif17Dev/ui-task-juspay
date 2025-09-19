import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const products = [
  {
    name: "ASOS Ridley High Waist",
    price: "$79.49",
    quantity: 82,
    amount: "$6,518.18",
  },
  {
    name: "Marco Lightweight Shirt",
    price: "$128.50",
    quantity: 37,
    amount: "$4,754.50",
  },
  {
    name: "Half Sleeve Shirt",
    price: "$39.99",
    quantity: 64,
    amount: "$2,559.36",
  },
  {
    name: "Lightweight Jacket",
    price: "$20.00",
    quantity: 184,
    amount: "$3,680.00",
  },
  {
    name: "Marco Shoes",
    price: "$79.49",
    quantity: 64,
    amount: "$1,965.81",
  },
];

export function ProductsTable() {
  return (
    <Card className="border-none bg-[#F7F9FB] dark:bg-[#FFFFFF0D]">
      <CardHeader>
        <CardTitle className="text-lg">Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b">
            <div>Name</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Amount</div>
          </div>
          {products.map((product, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 text-sm py-2">
              <div className="font-medium">{product.name}</div>
              <div>{product.price}</div>
              <div>{product.quantity}</div>
              <div className="font-medium">{product.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
