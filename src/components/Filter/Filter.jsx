//react hooks
import { useState, useEffect, useRef } from "react";
//styles
import styles from "./Filter.module.scss";
//icons
import Search from "@/Icons/Search";

const Filter = ({ data, items, setItems, setShow }) => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [activeAll, setActiveAll] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");
  const [activePrice, setActivePrice] = useState("");

  const categoryRef = useRef(null);


  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    let value = e.target.value;

    if (category === "") {
      let filteredItem = data?.filter((item) => {
        return item.description.toLowerCase().includes(value.toLowerCase());
      });

      setItems(filteredItem);
    } else {
      const products = data.filter((el) => {
        return el.category === category;
      });

      let filteredItem = products.filter((item) => {
        return item.description.toLowerCase().includes(value.toLowerCase());
      });

      setItems(filteredItem);
    }
  };

  const handleClick = (cat, index) => {
    setActiveAll(false);
    setActiveCategory(cat);

    let categoryValue = cat;
    setCategory(categoryValue);

    const products = data.filter((el) => {
      return el.category === cat;
    });
    setItems(products);
    setShow(4);
  };

  const showAllProducts = () => {
    setActiveAll(true);
    setActiveCategory("");
    setItems(data);
    setCategory("");
    setActivePrice("");
    setShow(4);
  };

  const sortByPriceLow = () => {
    let sorted = [...items];

    if (activePrice === "low") {
      setActivePrice("");
      sorted.sort((a, b) => {
        return a.id - b.id;
      });
      setItems((prev) => (prev = sorted));
    } else {
      setActivePrice("low");
      sorted.sort((a, b) => {
        return a.price - b.price;
      });
      setItems((prev) => (prev = sorted));
    }
  };

  const sortByPriceHigh = () => {
    let sorted = [...items];

    if (activePrice === "high") {
      setActivePrice("");
      sorted.sort((a, b) => {
        return a.id - b.id;
      });
      setItems((prev) => (prev = sorted));
    } else {
      setActivePrice("high");
      sorted.sort((a, b) => {
        return a.price > b.price ? -1 : b.price > a.price ? 1 : 0;
      });
      setItems((prev) => (prev = sorted));
    }
  };

  return (
    <div className={styles.Filter}>
      <form action="" className={styles.searchItems}>
        <input
          type="search"
          name=""
          id=""
          value={search}
          placeholder="Search the products you want"
          className={styles.inputItems}
          onChange={(e) => onChangeSearch(e)}
        />
        <Search className={styles.searchIcon} />
      </form>
      <div className={styles.filterTypes}>
        <ul className={styles.categories}>
          <label>Categories</label>
          {categories.map((category, index) => (
            <li
              className={`${styles.category} ${
                category.toLowerCase() === activeCategory && styles.activeButton
              }`}
              key={index + 1}
              onClick={() => handleClick(category, index)}
              ref={categoryRef}
            >
              <div className={styles.category_overlay}>{category}</div>
            </li>
          ))}
        </ul>
        <ul className={styles.Filter_price}>
          <label>Price</label>
          <li
            onClick={() => sortByPriceLow()}
            className={activePrice === "low" && styles.activeButton}
          >
            low-high
          </li>
          <li
            onClick={() => sortByPriceHigh()}
            className={activePrice === "high" && styles.activeButton}
          >
            high-low
          </li>
        </ul>
      </div>
      <button className={styles.Filter_reset} onClick={() => showAllProducts()}>
        reset
      </button>
    </div>
  );
};

export default Filter;
