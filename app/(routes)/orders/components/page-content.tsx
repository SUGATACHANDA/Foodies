"use client";

import { Orders } from "@/types-db";
import OrderItem from "./order-item";

interface PageContentProps {
  orders: Orders[];
}

const revalidate = 0;

const PageContent = ({ orders }: PageContentProps) => {
  if (orders.length === 0) {
    return (
      <div className="w-full font-semibold text-xl border rounded-lg border-gray-100 p-4 flex flex-col items-center justify-start gap-4 mt-4">
        No Orders Found
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg p-4 flex flex-col items-center justify-start gap-4 mt-4">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default PageContent;
