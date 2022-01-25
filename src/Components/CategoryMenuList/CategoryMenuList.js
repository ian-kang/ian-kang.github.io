import React from "react";
import CategoryMenuListItem from "../CategoryMenuListItem/CategoryMenuListItem";

function CategoryMenuList({ menus, category, menuRepository, customerId }) {
  return (
    <>
      {menus.categories[category].menuOrder &&
        menus.categories[category].menuOrder.map((menuId) => (
          <CategoryMenuListItem
            key={menuId}
            menus={menus.items}
            menu={menus.items[menuId]}
          />
        ))}
    </>
  );
}

export default CategoryMenuList;
