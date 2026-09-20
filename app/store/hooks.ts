import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// نسخه TypeScript-friendly از useDispatch برای ارسال Actionها.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// نسخه TypeScript-friendly از useSelector برای خواندن اطلاعات Store.
export const useAppSelector = useSelector.withTypes<RootState>();
