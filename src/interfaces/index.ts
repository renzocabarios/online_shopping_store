export interface IItem {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
}

export interface ICartItem {
  id: string;
  productname: string;
  dscription: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
  quantity: number;
}

export interface IUseItemStore {
  items: IItem[];
  getItems: () => void;
}

export interface IUseCategoryStore {
  categories: string[];
  getCategories: () => void;
}

export interface IUseCartStore {
  cartItems: ICartItem[];
  addToCart: (item: IItem) => void;
  removeItem: (item: IItem) => void;
  clearCart: () => void;
  increment: (item: IItem) => void;
  decrement: (item: IItem) => void;
}
