import React from "react";
import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

function MenuEditorPreviewListItem({ menu }) {
  return (
    <List sx={{ p: 1 }}>
      <ListItem
        secondaryAction={
          <Typography variant="subtitle2">${menu.price}</Typography>
        }
      >
        {menu.rate === "high" ? (
          <ListItemIcon>
            <Star />
          </ListItemIcon>
        ) : menu.rate === "mid" ? (
          <ListItemIcon>
            <StarHalf />
          </ListItemIcon>
        ) : menu.rate === "low" ? (
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
        ) : null}

        <ListItemText primary={menu.name} secondary={menu.desc} />
      </ListItem>
    </List>
  );
}

export default MenuEditorPreviewListItem;
