import style from "./style.module.css";
import { Button, Navbar } from "..";
import { useCartStore } from "../../states";
import { useState } from "react";

export default function ({ children }: any) {
  const [showModal, setshowModal] = useState(false);

  const { addToCart, cartItems, increment, decrement, removeItem, clearCart } =
    useCartStore() as any;
  return (
    <>
      {showModal ? (
        <div
          onClick={() => {
            setshowModal(false);
          }}
          className="fixed top-0 w-screen h-screen bg-slate-500 z-50 flex justify-center items-center"
        >
          <div className="bg-white w-6/12 h-1/3 flex flex-col items-end justify-center rounded p-10">
            <p
              onClick={() => {
                setshowModal(false);
              }}
            >
              Close
            </p>
            <div className="flex justify-center items-center w-full h-full">
              <p className="text-xl font-bold">Thank you for purchasing</p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className={style.sidenav}>
        <div className={style.header}></div>
        {cartItems.map((e: any) => (
          <div key={e.id} className="bg-slate-200 flex flex-col gap-5">
            <Button
              onClick={() => {
                removeItem(e);
              }}
            >
              Remove Item
            </Button>
            <div className="flex items-center justify-between p-2">
              <img src={e.imageUrl} alt={e.imageUrl} height={50} width={50} />

              <div>
                <p>{e.productName}</p>
                <p className="font-bold text-red-600">
                  ₱ {new Intl.NumberFormat().format(e.unitPrice * e.quantity)}
                </p>
              </div>
              <div className="flex gap-2 font-xl">
                <p
                  onClick={() => {
                    increment(e);
                  }}
                >
                  +
                </p>
                <p>{e.quantity}</p>

                <p
                  onClick={() => {
                    decrement(e);
                  }}
                >
                  -
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between w-full">
          <p>TOTAL ITEMS:</p>
          <p className="font-bold text-red-600">
            {cartItems.reduce((acc: any, curr: any) => {
              return acc + curr.quantity;
            }, 0)}
          </p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p> TOTAL PRICE:</p>
          <p className="font-bold text-red-600">
            ₱
            {cartItems.reduce((acc: any, curr: any) => {
              return acc + curr.unitPrice * curr.quantity;
            }, 0)}
          </p>
        </div>

        <Button
          onClick={() => {
            setshowModal(true);
            clearCart();
          }}
        >
          Checkout
        </Button>
      </div>
      <div className={style.container}>
        <div className={style.divider}></div>
        <div>
          <Navbar />
          <div className={style.children}>{children}</div>
        </div>
      </div>
    </>
  );
}
