import { useDispatch, useSelector } from "react-redux";
import { rmWishlistAction } from "../../store/actionCreators/actionCreator";
import React, { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";

const WishlistItems = ({ itemId }) => {
  const { userId } = useSelector((state) => state.reducer1.userWishlist);
  const dispatch = useDispatch();
  const [itemDetail, setItemDetail] = useState(null);
  const { request, response } = useRequest();
  useEffect(() => {
    request("GET", `/food/getOne/${itemId}`);
  }, []);
  useEffect(() => {
    if (response) {
      setItemDetail(response);
    }
  }, [response]);
  const rmFromWishlist = () => {
    dispatch(
      rmWishlistAction({
        userId: userId,
        itemId: itemId,
      })
    );
  };
  return (
    <div>
      {itemDetail && (
        <div>
          <span>{itemDetail.name}</span>
          <button onClick={rmFromWishlist}>remove</button>
        </div>
      )}
    </div>
  );
};

const ViewWishlist = () => {
  const { items } = useSelector((state) => state.reducer1.userWishlist);

  return (
    <div>
      {items.map((val) => {
        return <WishlistItems key={val} itemId={val} />;
      })}
    </div>
  );
};

export default ViewWishlist;
