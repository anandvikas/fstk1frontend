import { useDispatch, useSelector } from "react-redux";
import { rmCartAction } from "../../store/actionCreators/actionCreator";
import React, { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import CartItemCount from "./cartItemCount";

const CartItems = ({ item, userId }) => {
  const dispatch = useDispatch();
  const [itemDetail, setItemDetail] = useState(null);
  const { request, response } = useRequest();
  useEffect(() => {
    request("GET", `/food/getOne/${item.itemId}`);
  }, []);
  useEffect(() => {
    if (response) {
      setItemDetail(response);
    }
  }, [response]);
  const rmFromCart = () => {
    dispatch(
      rmCartAction({
        userId: userId,
        itemId: item.itemId,
      })
    );
  };
  return (
    <div>
      {itemDetail && (
        <div>
          <span>{itemDetail.name}</span>
          <CartItemCount userId={userId} item={item} />
          <button onClick={rmFromCart}>remove</button>
        </div>
      )}
    </div>
  );
};

const ViewCart = () => {
  const { items, userId } = useSelector((state) => state.reducer1.userCart);

  return (
    <div>
      {items.map((val) => {
        return <CartItems key={val.itemId} item={val} userId={userId} />;
      })}
    </div>
  );
};

export default ViewCart;
