"use client";
import React from "react";
import Loading from "@/components/loading";
import MySession from "@/models/session";
import CartItem from "@/models/cart-item";
import Link from "next/link";
import Image from "next/image";
import instance from "@/lib/axios-config";
import { useSession } from "next-auth/react";
import { Loader2, MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CartPage = (): JSX.Element => {
  // Variable states
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  // Loading states
  const [pageLoading, setPageLoading] = React.useState<boolean>(true);

  // Session
  const { data: session } = useSession();
  const mySession = session ? (session as MySession) : null;

  React.useEffect(() => {
    if (session) {
      getCart();
    }
  }, [session]);

  const getCart = async () => {
    setPageLoading(true);
    try {
      const { data } = await instance.get("/cart", {
        headers: {
          token: mySession!.jwt,
        },
      });
      setCartItems(data);
    } catch (error: any) {
    } finally {
      setPageLoading(false);
    }
  };

  if (pageLoading) return <Loading />;

  return (
    <>
      <div className="flex flex-col gap-10 max-w-screen-xl mx-auto my-20 w-11/12">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-bold text-4xl w-full">Your cart</h1>
          <Link
            className="whitespace-nowrap underline underline-offset-4"
            href={"/collections/topics"}
          >
            Continue shopping
          </Link>
        </div>
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="text-left pb-5 font-normal">Product</th>
              <th className="text-left font-normal">
                <div className="max-w-[200px]">Quantity</div>
              </th>
              <th className="text-right font-normal">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <ProductItem
                key={item._id}
                cartItem={item}
                mySession={mySession}
                setCartItems={setCartItems}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

/* ######################################## CART ITEM ######################################## */

interface ProductItemProps {
  cartItem: CartItem;
  mySession: MySession | null;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const ProductItem: React.FC<ProductItemProps> = ({
  cartItem,
  mySession,
  setCartItems,
}): JSX.Element => {
  // Loading states
  const [deleteCartItemLoading, setDeleteCartItemLoading] =
    React.useState<boolean>(false);

  // Custom hooks
  const { toast } = useToast();

  const deleteCartItem = async (id: string): Promise<void> => {
    setDeleteCartItemLoading(true);
    try {
      await instance.delete(`/cart/${id}`, {
        headers: {
          token: mySession!.jwt,
        },
      });
      setCartItems((prev) => prev.filter((item) => item._id !== id));

      toast({
        description: "Item removed from cart",
        className: "bg-green-500 text-white",
      });
    } catch (error: any) {
      console.error(error);
    } finally {
      setDeleteCartItemLoading(false);
    }
  };

  return (
    <tr>
      <td className="text-left py-5">
        <Image
          src={`/images/${cartItem.image}.png`}
          alt={cartItem.name}
          width={130}
          height={130}
        />
      </td>
      <td>
        {deleteCartItemLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <div className="text-center flex items-center max-w-[200px] gap-3">
            <div className="flex items-center justify-between border w-full py-3 px-5">
              <MinusIcon className="w-5 h-5 cursor-pointer" />
              <p>{cartItem.quantity}</p>
              <PlusIcon className="w-5 h-5 cursor-pointer" />
            </div>
            <TrashIcon
              className="w-5 h-5 cursor-pointer"
              onClick={() => deleteCartItem(cartItem._id)}
            />
          </div>
        )}
      </td>
      <td className="text-right">
        <div className="flex justify-end">${cartItem.price}.00 USD</div>
      </td>
    </tr>
  );
};

export default CartPage;