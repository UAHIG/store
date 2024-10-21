import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import styles from "../../styles/Category.module.css";
import Products from "../Products/Products";
import { useSelector } from "react-redux";

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);

  const defaultValues = {
    title: "",
    price_min: 0,
    price_max: 0,
  };

  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  };

  const [isEnd, setEnd] = useState(false);
  const [cat, setCat] = useState("");
  const [items, setItems] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);

  const { data, isLoading, } = useGetProductsQuery(params);

  useEffect(() => {
    if (!id) return;

    setValues(defaultValues);
    setItems([]);
    setEnd(false);
    // Обновляем параметры при изменении категории
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  useEffect(() => {
    if (!id || !list.length) return;
    const category = list.find((item) => item.id === Number(id));
    if (category) setCat(category.name);
  }, [list, id]);

  useEffect(() => {
    if (isLoading) return;
    if (!data.length) return setEnd(true);
    setItems((prevItems) => [...prevItems, ...data]); // Добавляем продукты к уже существующим
  }, [data, isLoading]);

  useEffect(() => {
    // Автоматически обновляем параметры фильтрации при изменении значений
    setParams({ ...defaultParams, ...values, categoryId: id, offset: 0 });
    setItems([]); // Сбрасываем список продуктов при обновлении фильтров
    setEnd(false); // Сбрасываем флаг окончания продуктов
  }, [values, id]);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleLoadMore = () => {
    // Увеличиваем offset для подгрузки следующих продуктов
    setParams((prevParams) => ({
      ...prevParams,
      offset: prevParams.offset + prevParams.limit,
    }));
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat}</h2>

      <form className={styles.filters}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            placeholder="Product name"
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            placeholder="0"
            onChange={handleChange}
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            placeholder="0"
            onChange={handleChange}
            value={values.price_max}
          />
          <span>Price to</span>
        </div>
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !items.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button onClick={() => setValues(defaultValues)}>Reset</button>
        </div>
      ) : (
        <>
          <Products
            title=""
            products={items}
            style={{ padding: 0 }}
            amount={items.length}
          />
          {!isEnd && (
            <div className={styles.more}>
              <button onClick={handleLoadMore}>See more</button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Category;
