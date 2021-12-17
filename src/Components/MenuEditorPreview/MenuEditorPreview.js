import React from "react";
import MenuEditorPreviewListItem from "../MenuEditorPreviewListItem/MenuEditorPreviewListItem";

function MenuEditorPreview({ menus }) {
  return Object.keys(menus).map((menuId) => (
    <MenuEditorPreviewListItem menu={menus[menuId]} />
  ));
}

export default MenuEditorPreview;
