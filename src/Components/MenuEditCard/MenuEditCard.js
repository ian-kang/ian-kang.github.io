import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";

function MenuEditCard({ menu, menus, handleEdit, handleDelete }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <TextField
          disabled
          required
          label="Menu name"
          name="name"
          value={menu.name}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          disabled
          select
          label="Rate"
          name="rate"
          value={menu.rate}
          fullWidth
        >
          <MenuItem key="None" value="none">
            None
          </MenuItem>
          <MenuItem key="High" value="high">
            High
          </MenuItem>
          <MenuItem key="Mid" value="mid">
            Mid
          </MenuItem>
          <MenuItem key="Low" value="low">
            Low
          </MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={2}>
        <TextField
          disabled
          type="number"
          label="Price"
          name="price"
          value={menu.price}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          disabled
          type="number"
          label="Price(B)"
          name="priceB"
          value={menu.priceB}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          disabled
          label="Description"
          name="desc"
          value={menu.desc}
          fullWidth
          multiline
        />
      </Grid>
      {menu.pairs && (
        <Grid item xs={12}>
          <TextField
            disabled
            label="Best Paired With"
            name="pairs"
            value={menu.pairs.map((menuId) => menus[menuId].name)}
            fullWidth
            multiline
          />
        </Grid>
      )}

      <Grid container item xs={12} spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Edit />}
            onClick={handleEdit}
          >
            Edit
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Delete />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MenuEditCard;
