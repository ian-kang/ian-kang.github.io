import React, { useState } from "react";
import {
  DinnerDining,
  ExpandLess,
  ExpandMore,
  WineBar,
} from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuEditorPreviewListItem from "../MenuEditorPreviewListItem/MenuEditorPreviewListItem";

export default function PublicCategoryMenuListItem({
  menu,
  menus,
  menuId,
  menuRepository,
  customerId,
}) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
    menuRepository.getMenu(customerId, menuId, (menu) => {
      let counts;
      if (!menu.pairClicks) {
        counts = 1;
      } else {
        counts = menu.pairClicks + 1;
      }
      menuRepository.updateMenu(customerId, menuId, {
        ...menu,
        pairClicks: counts,
      });
    });
  };
  return (
    <List>
      <ListItem>
        <ListItemText
          sx={{ width: "50%" }}
          primary={menu.name}
          secondary={menu.desc}
        />
        <ListItemText
          sx={{ width: "50%", textAlign: "right" }}
          primary={
            <Typography variant="subtitle2">
              ${menu.price}
              {menu.priceB && ` / $${menu.priceB}`}
            </Typography>
          }
        />
      </ListItem>
      {menu.pairs ? (
        <>
          <ListItemButton onClick={handleClick}>
            <ListItem
              secondaryAction={
                <Typography variant="body2">Best Paired With</Typography>
              }
            >
              <ListItemIcon>
                <WineBar />
                <DinnerDining />
              </ListItemIcon>
            </ListItem>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            sx={{ borderBottom: "1px solid", borderRadius: 4 }}
            in={expanded}
            timeout="auto"
            unmountOnExit
          >
            {menu.pairs &&
              menu.pairs.map((menuId) => (
                <MenuEditorPreviewListItem key={menuId} menu={menus[menuId]} />
              ))}
          </Collapse>
        </>
      ) : null}
    </List>
  );
}
