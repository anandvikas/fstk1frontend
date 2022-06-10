import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWishlistAction } from "../../store/actionCreators/actionCreator";

const AddToWishlist = ({ itemId }) => {
  const { userId, items } = useSelector((state) => state.reducer1.userWishlist);
  const dispatch = useDispatch();

  const addToWishlist = () => {
    dispatch(
      addWishlistAction({
        userId: userId,
        itemId: itemId,
      })
    );
  };

  return items.includes(itemId) ? (
    <>
      <button id='addToWishlist'>Added to wishlist</button>
    </>
  ) : (
    <>
      <button id='addToWishlist' onClick={addToWishlist}>Add to wishlist</button>
    </>
  );
};

export default AddToWishlist;
