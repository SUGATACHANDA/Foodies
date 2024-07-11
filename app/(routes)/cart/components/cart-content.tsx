"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { ArrowUpRightFromSquare, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CartItem from "./cart-item";
import Box from "@/components/box";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import toast from "react-hot-toast";

interface CartContentProps {
  userId: string | null;
}

const CartContent = ({ userId }: CartContentProps) => {
  const cart = useCart();
  const searchParams = useSearchParams();
  const [disabled, setDisabled] = useState(false);
  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.price * item.qty);
  }, 0);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment Completed Successfully");
      cart.removeAll()
    }

    if (searchParams.get("canceld")) {
      alert("Something Went Wrong. Try Again Later");
    }
  }, [searchParams, cart.removeAll]);

  const onCheckout = async () => {
    if (cart.items.length < 0) {
      toast.error("Cart is empty");
    } else {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          products: cart.items,
          userId,
        }
      );
      window.location = response.data.url;
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-between gap-4">
        <h2 className="text-3xl font-semibold text-neutral-700">Cart Items</h2>
        {cart.items.length > 0 && (
          <Button
            title="Clear the Whole Cart"
            variant={"destructive"}
            onClick={cart.removeAll}
          >
            <Trash2 className="w4 h-4 pr-2" />
            Clear All
          </Button>
        )}
      </div>
      <div className="w-full lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
        <div className="col-span-8">
          {cart.items.length === 0 && (
            <div className="w-full items-center flex justify-center">
              <p className="text-3xl text-neutral-600 font-semibold">
                No Items in the Cart
              </p>
            </div>
          )}
          <div className="w-full space-y-4">
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="col-span-4">
          <Box className="flex-col items-start justify-start gap-2 shadow-lg rounded-lg p-3 space-y-2 bg-slate-50">
            <h2 className="text-lg text-neutral-700 font-semibold">
              Order Summary
            </h2>
            <Separator />
            <Box className="flex-col space-y-2">
              <div className="flex items-center justify-between w-full px-4 whitespace-nowrap text-muted-foreground">
                <p className="text-black font-bold text-base">Total</p>
                <p className="font-semibold text-2xl text-black">
                  ₹ {totalPrice}
                </p>
              </div>
            </Box>
          </Box>
          <Box className="flex-col items-start justify-start gap-2 shadow-lg rounded-lg p-3 space-y-2 bg-slate-50">
            {/* <h2 className="text-lg text-neutral-700 font-semibold">Payment</h2> */}
            {cart.items.length > 0 && (
              <>
                <Separator />
                <Button className="w-full" onClick={onCheckout}>
                  Pay Now
                  <ArrowUpRightFromSquare className="w-4 h-4 ml-2" />{" "}
                </Button>
              </>
            )}
          </Box>
        </div>
      </div>
    </>
  );
};

export default CartContent;
