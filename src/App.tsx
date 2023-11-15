import { useEffect, useMemo, useState } from "react";
import { Button, Sidenav } from "./components";
import { useCartStore, useCategoryStore, useItemStore } from "./states";
import {
  IItem,
  IUseCartStore,
  IUseCategoryStore,
  IUseItemStore,
} from "./interfaces";
function App() {
  const [search, setsearch] = useState("");
  const [category, setcategory] = useState("");
  const [ishightolow, setishightolow] = useState(false);
  const { getItems, items } = useItemStore() as IUseItemStore;
  const { getCategories, categories } = useCategoryStore() as IUseCategoryStore;
  const { addToCart } = useCartStore() as IUseCartStore;

  const handleChange = (event: any) => {
    setsearch(event.target.value);
  };

  const filtered = useMemo(() => {
    let parsed = items;
    if (category != "") {
      parsed = parsed.filter(
        (e: IItem) => e.category.toLowerCase() == category.toLowerCase()
      );
    }

    if (search != "") {
      parsed = parsed.filter((e: IItem) =>
        e.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (ishightolow) {
      parsed = parsed.sort((a: IItem, b: IItem) => {
        return a.unitPrice - b.unitPrice;
      });
    }

    if (!ishightolow) {
      parsed = parsed = parsed.sort((a: IItem, b: IItem) => {
        return b.unitPrice - a.unitPrice;
      });
    }

    return parsed;
  }, [items, search, category, ishightolow]);

  const handleCategory = (type: string) => {
    setcategory(type);
  };

  const handlePrice = () => {
    setishightolow((prev: boolean) => !prev);
  };

  useEffect(() => {
    getItems();
    getCategories();
  }, []);

  return (
    <>
      <Sidenav>
        <input
          type="text"
          onChange={handleChange}
          className="w-full bg-slate-500 text-slate-100 p-4 rounded-md"
        />

        <div className="">
          <Button
            onClick={() => {
              handleCategory("");
            }}
          >
            All
          </Button>
          {categories.map((e: string) => (
            <Button
              key={e}
              onClick={() => {
                handleCategory(e);
              }}
            >
              {e.toUpperCase()}
            </Button>
          ))}
          <Button
            onClick={() => {
              handlePrice();
            }}
          >
            {ishightolow ? "Low to High" : "High to Low"}
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {filtered.map((e: IItem) => (
            <div
              key={e.id}
              className="bg-slate-200 p-10 rounded-md grid grid-flow-row-dense grid-cols-4"
            >
              <div className=" flex items-center place-self-center">
                <img
                  src={e.imageUrl}
                  className="rounded-md"
                  alt={e.imageUrl}
                  height={250}
                  width={250}
                />
              </div>
              <div className="flex flex-col col-span-2 gap-2">
                <p className="text-2xl font-bold">{e.productName}</p>
                <p>{e.description}</p>
                <p>Category: {e.category}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-4xl font-bold text-red-600">
                  ₱ {new Intl.NumberFormat().format(e.unitPrice)}
                </p>

                <Button
                  onClick={() => {
                    addToCart(e);
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Sidenav>
    </>
  );
}

export default App;
