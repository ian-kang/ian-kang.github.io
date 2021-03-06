import {
  DinnerDining,
  ExpandLess,
  ExpandMore,
  WineBar,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuEditorPreviewListItem from "../MenuEditorPreviewListItem/MenuEditorPreviewListItem";

function PairedMenuCard({ menu, menus, type }) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "100%" }}>
      {type === "edit" ? (
        <CardHeader
          title={menu.name}
          subheader={
            <Typography sx={{ mt: 1 }} variant="subtitle2">
              ${menu.price}
              {menu.priceB && ` / $${menu.priceB}`}
            </Typography>
          }
        />
      ) : (
        <CardHeader
          title={menu.name}
          action={
            <Typography sx={{ mt: 1.5, ml: 1 }} variant="subtitle2">
              ${menu.price}
              {menu.priceB && ` / $${menu.priceB}`}
            </Typography>
          }
        />
      )}

      {menu.img && (
        <CardMedia
          component="img"
          height="150"
          image={menu.img}
          alt="No Image"
        />
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {menu.desc}
        </Typography>
      </CardContent>
      {menu.pairs && menu.pairs.length > 0 && (
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
      )}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {menu.pairs &&
          menu.pairs.map((menuId) => (
            <MenuEditorPreviewListItem key={menuId} menu={menus[menuId]} />
          ))}
      </Collapse>
    </Card>
  );
}

export default PairedMenuCard;
