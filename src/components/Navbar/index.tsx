import style from "./style.module.css";

import { Button } from "../index";

function Navbar() {
  return (
    <>
      <div className={style.container}>
        <h3 className="text-2xl font-extrabold">Online Shopping Store</h3>
      </div>
      <div className={style.divider}></div>
    </>
  );
}

export default Navbar;
