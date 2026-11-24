import { lazy } from "react";

// export const OrderPageAsync = lazy(
//   () =>
//     new Promise((resolve) => {
//       // @ts-ignore
//       setTimeout(() => resolve(import("./OrderPage")), 500);
//     })
// );

export const OrderPageAsync = lazy(() => import("./OrderPage"));
