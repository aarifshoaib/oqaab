import { useContextElement } from "@/context/Context";
import { fetchapi } from "@/utlis/api";
import { Link } from "react-router-dom";
import { act, useEffect, useState } from "react";
import ColorSelect from "../productDetails/ColorSelect";
import SizeSelect from "../productDetails/SizeSelect";
import QuantitySelect from "../productDetails/QuantitySelect";

export default function QuickAdd() {
  const [quantity, setQuantity] = useState(1);
  const {
    quickAddItem,
    addProductToCart,
    isAddedToCartProducts,
    addToCompareItem,
    addToWishlist,
    isAddedtoWishlist,
    isAddedtoCompareItem,
    cartProducts,
    updateQuantity,
    quickViewItem,
  } = useContextElement();
  const [allProducts, setAllproducts] = useState([]);
  const [item, setItem] = useState(null);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  
    const [maxQuantity, setMaxQuantity] = useState(1);

  const [activeColor, setActiveColor] = useState("gray");
  const [activeSize, setActiveSize] = useState("S");
  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const response = await fetchapi("images/top-picks/");
        const parsedProducts = response.data.map((item) => {
          const parsed = JSON.parse(item.product_json);
          return parsed;
        });
        setAllproducts(parsedProducts);

      } catch (error) {
        console.error("Error fetching Top Picks:", error);
      }
    };
    fetchTopPicks();
  }, []);

  useEffect(() => {
    const filtered = allProducts.filter((el) => el.id === quickAddItem);
    if (filtered.length > 0) {
      setItem(filtered[0]);
      const colorOptions = filtered[0].filterColor // only include colors from filterColor
        .map((color) => ({
          id: `values-${color}`,
          value: color.charAt(0).toUpperCase() + color.slice(1),
          color: color.toLowerCase(),
        }));
      setColor(colorOptions);
      setActiveColor(filtered[0].filterColor?.[0] || "gray");
      const sizeOptions = filtered[0].filterSizes
        .map((size) => ({
          id: `values-${size.toLowerCase()}`,
          value: size,
          price: filtered[0].price,
          disabled: false,
        }));
      setActiveSize(filtered[0].filterSizes?.[0] || "L");
      setSize(sizeOptions);
    } else {
      setItem(null);
    }
  }, [quickAddItem, allProducts]);

    useEffect(() => {

      const filtered = allProducts.filter((el) => el.id === quickAddItem);
      console.log('Changing size/color:', activeSize, activeColor);
      setQuantity(1);
  
      if (filtered[0]?.stocks && activeSize && activeColor) {
        const matchedStock = filtered[0].stocks.find(
          (item) =>
            item.size === activeSize &&
            item.color.toLowerCase() === activeColor.toLowerCase()
        );
  
        setMaxQuantity(matchedStock ? matchedStock.stocks : 0);
      }
    }, [activeSize, activeColor, allProducts]);
  
  

  return (
    item && (
      <div className="modal fade modal-quick-add" id="quickAdd">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="header">
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="modal"
              />
            </div>
            <div>
              <div className="tf-product-info-list">
                <div className="tf-product-info-item">
                  <div className="image">
                    <img alt="" src={item.imgSrc} width={600} height={800} />
                  </div>
                  <div className="content">
                    <Link to={`/product-detail/${item.id}`}>{item.title}</Link>
                    <div className="tf-product-info-price">
                      <h5 className="price-on-sale font-2">
                        <span className="uae-icon" title="aed" /> {" "} {item.price.toFixed(2)}
                      </h5>
                      {item.oldPrice ? (
                        <>
                          <div className="compare-at-price font-2">
                            <span className="uae-icon" title="aed" /> {" "} {item.oldPrice.toFixed(2)}
                          </div>
                          <div className="badges-on-sale text-btn-uppercase">
                           -{(((item.oldPrice - item.price) / item.oldPrice) * 100).toFixed(0)}% OFF
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="tf-product-info-choose-option">
                  <ColorSelect
                    setActiveColor={setActiveColor}
                    activeColor={activeColor}
                    colorOptions={color}
                  />
                  <SizeSelect sizes={size} 
                    setActiveSize={setActiveSize}
                    activeSize={activeSize}/>
                  <div className="tf-product-info-quantity">
                    <div className="title mb_12">Quantity: (Available Stock : {maxQuantity}) </div>
                    <QuantitySelect
                    maxQuantity={maxQuantity}
                      quantity={
                        isAddedToCartProducts(item.id)
                          ? cartProducts.filter((elm) => elm.id === item.id)[0]
                            .quantity
                          : quantity
                      }
                      setQuantity={(qty) => {
                        if (isAddedToCartProducts(item.id)) {
                          updateQuantity(item.id, qty);
                        } else {
                          setQuantity(qty);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <div className="tf-product-info-by-btn mb_10">
                      <a
                        className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 show-shopping-cart"
                        onClick={() => addProductToCart(item.id, quantity, activeSize, activeColor)}
                      >
                        <span>
                          {isAddedToCartProducts(item.id)
                            ? "Already Added"
                            : "Add to cart -"}
                          &nbsp;
                        </span>
                        <span className="tf-qty-price total-price">
                          AED 
                          {isAddedToCartProducts(item.id)
                            ? (
                              item.price *
                              cartProducts.filter(
                                (elm) => elm.id === item.id
                              )[0].quantity
                            ).toFixed(2)
                            : (item.price * quantity).toFixed(2)}
                        </span>
                      </a>
                      {/* <a
                        href="#compare"
                        onClick={() => addToCompareItem(item.id)}
                        data-bs-toggle="offcanvas"
                        aria-controls="compare"
                        className="box-icon hover-tooltip compare btn-icon-action show-compare"
                      >
                        <span className="icon icon-gitDiff" />
                        <span className="tooltip text-caption-2">
                          {isAddedtoCompareItem(item.id)
                            ? "Already compared"
                            : "Compare"}
                        </span>
                      </a> */}
                      <a
                        onClick={() => addToWishlist(item.id)}
                        className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action"
                      >
                        <span className="icon icon-heart" />
                        <span className="tooltip text-caption-2">
                          {isAddedtoWishlist(item.id)
                            ? "Already Wishlished"
                            : "Wishlist"}
                        </span>
                      </a>
                    </div>
                    {/* <a href="#" className="btn-style-3 text-btn-uppercase">
                      Buy it now
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
