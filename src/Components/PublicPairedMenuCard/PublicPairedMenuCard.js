import {
  Delete,
  DinnerDining,
  Edit,
  ExpandLess,
  ExpandMore,
  WineBar,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuEditorPreviewListItem from "../MenuEditorPreviewListItem/MenuEditorPreviewListItem";

function PublicPairedMenuCard({
  menuRepository,
  customerId,
  menuId,
  menu,
  menus,
  type,
  editMenu,
  deleteMenu,
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
          action={
            <Box sx={{ ml: 1 }}>
              <IconButton
                onClick={() => {
                  editMenu(menu.menuId);
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                onClick={() => {
                  deleteMenu(menu.menuId);
                }}
              >
                <Delete />
              </IconButton>
            </Box>
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

export default PublicPairedMenuCard;
