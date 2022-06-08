import React from "react";
import { useDispatch } from "react-redux";
import { cartItemCountAction } from "../../store/actionCreators/actionCreator";

const CartItemCount = ({ item, userId }) => {
  const dispatch = useDispatch();

  const decrease = () => {
    if (item.quantity <= 0) {
      return;
    }
    dispatch(
      cartItemCountAction({
        userId: userId,
        itemId: item.itemId,
        quantity: item.quantity - 1,
      })
    );
  };
  const increase = () => {
    if (item.quantity >= 5) {
      return;
    }
    dispatch(
      cartItemCountAction({
        userId: userId,
        itemId: item.itemId,
        quantity: item.quantity + 1,
      })
    );
  };

  return (
    <span>
      <button onClick={decrease}>-</button>
      <span>{item.quantity}</span>
      <button onClick={increase}>+</button>
    </span>
  );
};

export default CartItemCount;
