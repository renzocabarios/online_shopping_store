import style from "./style.module.css";

import { Button } from "../index";

function CategoryList() {
  return (
    <>
      <div className={style.toolbar}>
        <h3 className="text-2xl font-extrabold">Online Shopping Store</h3>

        <div className={style.links_container}></div>
        <div className={style.links_container}></div>
      </div>
      <div className={style.divider}></div>
    </>
  );
}

export default CategoryList;
