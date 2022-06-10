import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCartAction } from "../../store/actionCreators/actionCreator";

const AddToCart = ({ itemId }) => {
  const { userId, items } = useSelector((state) => state.reducer1.userCart);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      addCartAction({
        userId: userId,
        itemId: itemId,
      })
    );
  };

  // this will check the item is added to cart or not
  const [isAdded, setIsAdded] = useState(null);
  useEffect(() => {
    setIsAdded(
      items.find((val) => {
        return val.itemId === itemId;
      })
    );
  }, [items]);

  return isAdded ? (
    <>
      <button id='addToCart'>Added to cart</button>
    </>
  ) : (
    <>
      <button id='addToCart' onClick={addToCart}>Add to Cart</button>
    </>
  );
};

export default AddToCart;
