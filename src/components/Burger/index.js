import React, { useContext, useMemo } from "react";
import BurgerIngredient from "../BurgerIngredient";
import css from "./style.module.css";
import BurgerContext from "../../context/Burgercontext";
const Burger = (props) => {
  const burgerContext = useContext(BurgerContext);

  return useMemo(() => {
    const items = Object.entries(burgerContext.burger.ingredients);
    let content = [];
    items.map((el) => {
      for (let i = 0; i < el[1]; i++) {
        content.push(<BurgerIngredient key={`${el}${i + 1}`} type={el[0]} />);
      }
    });
    if (content.length === 0)
      content = (
        <p className={css.Paragraph}>хачиртай талхныхаа орцыг сонгоно уу...</p>
      );
    // console.log(props);

    return (
      <div className={css.Burger}>
        <BurgerIngredient type="bread-top" />
        {content}
        <BurgerIngredient type="bread-bottom" />
      </div>
    );
  }, [burgerContext.burger.ingredients]);
};

export default Burger;
