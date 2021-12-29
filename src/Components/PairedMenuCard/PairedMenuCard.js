import {
  Delete,
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
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuEditorPreviewListItem from "../MenuEditorPreviewListItem/MenuEditorPreviewListItem";

function PairedMenuCard({ menu, menus }) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        title={menu.name}
        subheader={<Typography variant="subtitle2">${menu.price}</Typography>}
      />
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
