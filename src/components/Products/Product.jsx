// import React, { useEffect, useState, useRef } from "react"
// import { useDispatch } from "react-redux"
// import { Link, useLocation,useNavigate } from "react-router-dom"
// import { ROUTES } from "../../utils/routes"

// import styles from "../../styles/Product.module.css"
// import { addItemToCart, addItemToFavorites } from "../../features/user/userSlice"

// const SIZES = [4, 4.5, 5]

// const Product = (item) => {
//   const { title, images, price, description } = item
//   const dispatch = useDispatch()
//   const location = useLocation();
//   const productRef = useRef(null); 
//   const navigate = useNavigate();


//   const [currentImage, setCurrentImage] = useState()
//   const [currentSize, setCurrentSize] = useState()

//   useEffect(() => {
//     if (!images.length) return

//     setCurrentImage(images[0])
//   }, [images]);

//   useEffect(() => {
//     if (location.state?.scrollToProduct) {
//       setTimeout(() => {
//         if (productRef.current) {
//           productRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//       }, 100); 
//     }
//   }, [location]);
  

//   const addToCart = () => {
//     dispatch(addItemToCart(item))
//   }

//   const addToFavorites = () => {
//     dispatch(addItemToFavorites(item))
//   }

//   return (
//     <section className={styles.product}>
//       <div className={styles.images}>
//         <div
//           className={styles.current}
//           style={{ backgroundImage: `url(${currentImage})` }}
//         />
//         <div className={styles["images-list"]}>
//           {images.map((image, i) => (
//             <div
//               key={i}
//               className={styles.image}
//               style={{ backgroundImage: `url(${image})` }}
//               onClick={() => setCurrentImage(image)}
//             />
//           ))}
//         </div>
//       </div>
//       <div className={styles.info}>
//         <h1 className={styles.title}>{title}</h1>
//         <div className={styles.price}>{price}$</div>
//         <div className={styles.color}>
//           <span>Color:</span> Green
//         </div>
//         <div className={styles.sizes}>
//           <span>Sizes:</span>{" "}
//           <div className={styles.list}>
//             {SIZES.map((size) => (
//               <div
//                 onClick={() => setCurrentSize(size)}
//                 className={`${styles.size} ${
//                   currentSize === size ? styles.active : ""
//                 }`}
//                 key={size}>
//                 {size}
//               </div>
//             ))}
//           </div>
//         </div>
//         <p className={styles.description}>{description}</p>
//         <div className={styles.actions}>
//           <button
//             onClick={addToCart}
//             className={styles.add}
//             disabled={!currentSize}>
//             Add to cart
//           </button>
//           <button onClick={addToFavorites} className={styles.favourite}>Add to favourites</button>
//         </div>
//         <div className={styles.purchase}>19 people purchased</div>
//         <Link className={styles.link} to={ROUTES.HOME}>
//         <button>Return to store</button>
        
//         </Link>
//       </div>
//     </section>
//   )
// }

// export default Product

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

import styles from "../../styles/Product.module.css";
import { addItemToCart, addItemToFavorites } from "../../features/user/userSlice";

const SIZES = [4, 4.5, 5];

const Product = (item) => {
  const { title, images, price, description } = item;
  const dispatch = useDispatch();
  const location = useLocation();
  const productRef = useRef(null);
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();

  useEffect(() => {
    if (!images.length) return;
    setCurrentImage(images[0]);
  }, [images]);

  useEffect(() => {
    if (location.state?.scrollToProduct) {
      setTimeout(() => {
        if (productRef.current) {
          productRef.current.scrollIntoView({ behavior: "smooth" });

          // Сбрасываем состояние scrollToProduct после прокрутки
          navigate(location.pathname, { replace: true, state: {} });
        }
      }, 100); // время задержки можно настроить при необходимости
    }
  }, [location, navigate]);

  const addToCart = () => {
    dispatch(addItemToCart(item));
  };

  const addToFavorites = () => {
    dispatch(addItemToFavorites(item));
  };

  return (
    <section ref={productRef} className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={styles["images-list"]}>
          {images.map((image, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$</div>
        <div className={styles.color}>
          <span>Color:</span> Green
        </div>
        <div className={styles.sizes}>
          <span>Sizes:</span>{" "}
          <div className={styles.list}>
            {SIZES.map((size) => (
              <div
                onClick={() => setCurrentSize(size)}
                className={`${styles.size} ${
                  currentSize === size ? styles.active : ""
                }`}
                key={size}>
                {size}
              </div>
            ))}
          </div>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <button
            onClick={addToCart}
            className={styles.add}
            disabled={!currentSize}>
            Add to cart
          </button>
          <button onClick={addToFavorites} className={styles.favourite}>Add to favourites</button>
        </div>
        <div className={styles.purchase}>19 people purchased</div>
        <Link className={styles.link} to={ROUTES.HOME}>
          <button>Return to store</button>
        </Link>
      </div>
    </section>
  );
};

export default Product;

