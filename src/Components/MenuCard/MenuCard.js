import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

function MenuCard({ menu }) {
  return (
    <Card>
      <CardHeader
        title={menu.name}
        action={<Typography variant="caption">${menu.price}</Typography>}
      />
      {menu.img && (
        <CardMedia
          component="img"
          height="130"
          image={menu.img}
          alt="No Image"
        />
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {menu.desc}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MenuCard;
