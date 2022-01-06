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
    <List sx={{ pl: 4 }} dense>
      <ListItem>
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
    </List>
  );
}

export default MenuEditorPreviewListItem;
