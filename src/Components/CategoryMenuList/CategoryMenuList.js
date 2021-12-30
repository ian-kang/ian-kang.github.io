import React from "react";
import CategoryMenuListItem from "../CategoryMenuListItem/CategoryMenuListItem";

function CategoryMenuList({ menus, menusArray, category }) {
  return (
    <>
      {menusArray
        .filter((menu) => menu.category === category)
        .map((menu) => (
          <CategoryMenuListItem key={menu.menuId} menus={menus} menu={menu} />
        ))}
    </>
  );
}

export default CategoryMenuList;
