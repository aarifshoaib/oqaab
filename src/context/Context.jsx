
import { openCartModal } from "@/utlis/openCartModal";
import { openWistlistModal } from "@/utlis/openWishlist";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { fetchapi } from "@/utlis/api";
import { use } from "react";
const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [allProducts, setAllproducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([1, 2, 3]);
  const [compareItem, setCompareItem] = useState([1, 2, 3]);
  const [quickViewItem, setQuickViewItem] = useState([]);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [collectionItems, setCollectionItems] = useState([]);
  const [loginUser, setLoginUser] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [allProductsData, setAllProductsData] = useState([]);

  useEffect(() => {
    const productCount = cartProducts.length;
    let subtotal = cartProducts.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0);
    const totalQuantity = cartProducts.reduce((sum, product) => {
      return sum + product.quantity;
    }, 0);
    
    let total = subtotal;
    if (totalQuantity >= 2) {
      if (totalQuantity % 2 === 0) {
        subtotal -= (totalQuantity /2) * 20;
      } else {
        subtotal -= (totalQuantity - 1)/2 * 20;
      }
    }
    console.log("Discounted Subtotal:", total - subtotal);
    setTotalPrice(subtotal);
    setDiscount(total - subtotal);
  }, [cartProducts]);


  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetchapi("images/top-picks/");
        const parsedProducts = await response.data.map((item) => {
          const parsed = JSON.parse(item.product_json);
          return parsed;
        });
        setAllproducts(parsedProducts);
      } catch (error) {
        console.error("Error fetching all products:", error);
      } finally {
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchAllProductsData = async () => {
      try {
        const response = await fetchapi("images/all-products/");
        const parsedProducts = await response.data.map((item) => {
          const parsed = JSON.parse(item.product_json);
          return parsed;
        });
        setAllProductsData(parsedProducts);
      } catch (error) {
        console.error("Error fetching all products Data:", error);
      } finally {
        console.log('All Products fetched');
      }
    }
    fetchAllProductsData();
  }
  , []);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetchapi("images/collects/");
        const parsedProducts = await response.data.map((item) => {
          const parsed = JSON.parse(item.json_data);
          return parsed;
        });
        const coll = await parsedProducts.map((item) => {
          // { name: "Bags", count: 112, active: false }
          return {
            name: item.s_text, // remove <br/> tags for plain text
            count: item.cnt, // or any logic you have to determine this
            active: false
          };
        });
        setCollectionItems(coll);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };
    fetchCollections();
  }, []);

  // const isAddedToCartProducts = (id) => {
  //   if (cartProducts.filter((elm) => elm.id == id)[0]) {
  //     return true;
  //   }
  //   return false;
  // };

  const isAddedToCartProducts = (id, size, color) => {
    const item = cartProducts.find((elm) =>
      elm.id === id &&
      elm.ssize === (size || "") &&
      elm.scolor === (color || "")
    );

    if (item) {
      return true;
    }
    return false;
  };
  
  const addProductToCart = (id, qty, size, color, isModal = true) => {
    if (!isAddedToCartProducts(id) || 1==1) {
      // const item = {
      //   ...allProductsData.filter((elm) => elm.id == id)[0],
      //   quantity: qty ? qty : 1,
      //   ssize: size ? size : "",
      //   scolor: color ? color : "",
      // };

      // setCartProducts((pre) => [...pre, item]);
      // if (isModal) {
      //   openCartModal();
      // }
      const item = {
        ...allProductsData.filter((elm) => elm.id == id)[0],
        quantity: qty ? qty : 1,
        ssize: size ? size : "",
        scolor: color ? color : "",
      };

      setCartProducts((prevCart) => {
        // Check if item with same id, size, and color already exists
        const existingItemIndex = prevCart.findIndex(
          (cartItem) =>
            cartItem.id === id &&
            cartItem.ssize === (size || "") &&
            cartItem.scolor === (color || "")
        );

        if (existingItemIndex !== -1) {
          // Item exists, update quantity
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + (qty || 1)
          };
          return updatedCart;
        } else {
          // Item doesn't exist, add new item
          return [...prevCart, item];
        }
      });

      if (isModal) {
        openCartModal();
      }
    }
  };

  const updateQuantity = (id, qty, size, color) => {
    setCartProducts((prevCart) => {
      // Find the item with matching id, size, and color
      const itemIndex = prevCart.findIndex((elm) =>
        elm.id === id &&
        elm.ssize === (size || "") &&
        elm.scolor === (color || "")
      );

      if (itemIndex !== -1) {
        // Item found, update its quantity
        const updatedCart = [...prevCart];
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          quantity: qty / 1 // Convert to number
        };
        return updatedCart;
      }
      return prevCart;
    });
  };
  // const updateQuantity = (id, qty) => {
  //   if (isAddedToCartProducts(id) || 1==1) {
  //     let item = cartProducts.filter((elm) => elm.id == id)[0];
  //     let items = [...cartProducts];
  //     const itemIndex = items.indexOf(item);

  //     item.quantity = qty / 1;
  //     items[itemIndex] = item;
  //     setCartProducts(items);
  //   }
  // };

  const addToWishlist = (id) => {
    if (!wishList.includes(id)) {
      setWishList((pre) => [...pre, id]);
      openWistlistModal();
    }
  };

  const removeFromWishlist = (id) => {
    if (wishList.includes(id)) {
      setWishList((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };
  const addToCompareItem = (id) => {
    if (!compareItem.includes(id)) {
      setCompareItem((pre) => [...pre, id]);
    }
  };
  const removeFromCompareItem = (id) => {
    if (compareItem.includes(id)) {
      setCompareItem((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };
  const isAddedtoWishlist = (id) => {
    if (wishList.includes(id)) {
      return true;
    }
    return false;
  };
  const isAddedtoCompareItem = (id) => {
    if (compareItem.includes(id)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartList"));
    if (items?.length) {
      setCartProducts(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (items?.length) {
      setWishList(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const handleLogin = (user) => {
    setLoginUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }
  const handleLogout = () => {
    setLoginUser(null);
    localStorage.removeItem("user");
  }

  const contextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
    updateQuantity,
    collectionItems,
    setCollectionItems,
    handleLogin,
    loginUser,
    allProducts,
    setAllproducts,
    discount,
    handleLogout,
    allProductsData,
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
