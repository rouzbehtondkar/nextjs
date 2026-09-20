import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// اینجا Store اصلی برنامه ساخته می‌شود.
// Store را می‌توانیم مثل «مخزن مرکزی اطلاعات» برنامه در نظر بگیریم.
export const store = configureStore({
  reducer: {
    // بخش cart مربوط به cartSlice است.
    // بنابراین مسیر اطلاعات سبد خرید می‌شود: state.cart
    cart: cartReducer,
  },
});

// نوع کامل State فعلی برنامه را از خود Store استخراج می‌کنیم.
export type RootState = ReturnType<typeof store.getState>;

// نوع dispatch را استخراج می‌کنیم تا TypeScript از Actionها محافظت کند.
export type AppDispatch = typeof store.dispatch;
