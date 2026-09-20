import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// هر چیزی که قرار است داخل سبد خرید نگه داریم این ساختار را دارد.
export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// اینجا شکل State مربوط به سبد خرید را مشخص می‌کنیم.
type CartState = {
  items: CartItem[];
};

// مقدار اولیه Redux Store؛ در شروع، سبد خرید خالی است.
const initialState: CartState = {
  items: [],
};

// Slice یعنی یک بخش مستقل از State به همراه عملیات تغییر آن.
// اینجا بخش cart را برای مدیریت سبد خرید ساخته‌ایم.
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // این Action برای اضافه کردن یک محصول به سبد استفاده می‌شود.
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      // بررسی می‌کنیم محصول از قبل داخل سبد هست یا نه.
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        // اگر محصول قبلاً وجود داشت، فقط تعدادش را یکی زیاد می‌کنیم.
        existingItem.quantity += 1;
      } else {
        // اگر محصول جدید بود، آن را با تعداد اولیه ۱ وارد سبد می‌کنیم.
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    // این Action یک محصول را بر اساس id کاملاً از سبد حذف می‌کند.
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // این Action کل سبد خرید را خالی می‌کند.
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Actionها را برای استفاده در کامپوننت‌ها export می‌کنیم.
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Reducer این Slice را به Store می‌دهیم تا Redux بداند چطور State را تغییر دهد.
export default cartSlice.reducer;
