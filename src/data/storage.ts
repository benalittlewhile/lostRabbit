import { BulletProps } from "../types/bullet.types";
import { LOCAL_STORAGE_KEY } from "./keys";

/*
Easy optimization in the future: after adding categories or whatever the name
becomes, update this to use the category title or uuid so that we're only
loading one category at a time (IO slow).
*/
export const getLocalBullets: () => BulletProps[] = () => {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);

  return raw ? JSON.parse(raw) as BulletProps[] : [];
};

export const updateLocalStorage  = (store: BulletProps[] ) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
}