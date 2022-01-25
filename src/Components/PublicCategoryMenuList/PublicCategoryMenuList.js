import React from "react";
import PublicCategoryMenuListItem from "../PublicCategoryMenuListItem/PublicCategoryMenuListItem";

function PublicCategoryMenuList({
  menus,
  category,
  menuRepository,
  customerId,
}) {
  return (
    <>
      {menus.categories[category].menuOrder &&
        menus.categories[category].menuOrder.map((menuId) => (
          <PublicCategoryMenuListItem
            key={menuId}
            menuId={menuId}
            menus={menus.items}
            menu={menus.items[menuId]}
            menuRepository={menuRepository}
            customerId={customerId}
          />
        ))}
    </>
  );
}

export default PublicCategoryMenuList;
