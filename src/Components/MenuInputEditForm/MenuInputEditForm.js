import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  ImageList,
  ImageListItem,
  Input,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { Delete, Edit, PhotoCamera, Save } from "@mui/icons-material";

function MenuInputEditForm({
  cloudinary,
  customerId,
  menu,
  updateMenu,
  deleteMenu,
}) {
  const [open, setOpen] = useState();
  const [menuOnEdit, setMenuOnEdit] = useState(menu);
  const [imageUrlOnEdit, setImageUrlOnEdit] = useState(menu.img);
  const [imageFileOnEdit, setImageFileOnEdit] = useState();

  const handleEditButtonOnClick = (event) => {
    setOpen(true);
  };
  const handleDeleteButtonOnClick = (event) => {
    deleteMenu(customerId, menu.menuId);
  };

  const handleOnChange = (event) => {
    if (event.target.name === "img") {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrlOnEdit(url);
      setImageFileOnEdit(file);
      return;
    }
    const target = event.target.name;
    const value = event.target.value;
    setMenuOnEdit({ ...menuOnEdit, [target]: value });
  };
  const handleCancel = () => {
    setOpen(false);
    setMenuOnEdit(menu);
    setImageUrlOnEdit(menu.img);
    setImageFileOnEdit();
  };
  const handleSave = async () => {
    setOpen(false);
    if (imageFileOnEdit) {
      const result = await cloudinary.imageUpload(imageFileOnEdit, [
        menuOnEdit.menuId,
        menuOnEdit.category,
        menuOnEdit.name,
      ]);
      updateMenu(customerId, menu.menuId, { ...menuOnEdit, img: result.url });

      return;
    }
    updateMenu(customerId, menu.menuId, menuOnEdit);
  };
  return (
    <Grid container item spacing={2}>
      <Grid item xs={6}>
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
      <Grid item xs={3}>
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
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Edit />}
            onClick={handleEditButtonOnClick}
          >
            Edit
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Delete />}
            onClick={handleDeleteButtonOnClick}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>

          <Grid sx={{ mt: 1 }} container item spacing={2} alignItems="center">
            <Grid item xs={6}>
              <TextField
                required
                autoFocus
                label="Menu name"
                name="name"
                value={menuOnEdit.name}
                fullWidth
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                label="Rate"
                name="rate"
                value={menuOnEdit.rate}
                fullWidth
                onChange={handleOnChange}
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
            <Grid item xs={3}>
              <TextField
                type="number"
                label="Price"
                name="price"
                value={menuOnEdit.price}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onChange={handleOnChange}
              />
            </Grid>
            {imageUrlOnEdit && (
              <Grid
                container
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <ImageList cols={1}>
                    <ImageListItem>
                      <img src={imageUrlOnEdit} alt="No Iamge" loading="lazy" />
                    </ImageListItem>
                  </ImageList>
                </Grid>
              </Grid>
            )}

            <Grid container item xs={12} justifyContent="right">
              <Grid item>
                <label htmlFor="contained-button-file-edit">
                  <Input
                    sx={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    id="contained-button-file-edit"
                    name="img"
                    onChange={handleOnChange}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<PhotoCamera />}
                  >
                    Image Upload
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="desc"
                value={menuOnEdit.desc}
                fullWidth
                multiline
                onChange={handleOnChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave} startIcon={<Save />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default MenuInputEditForm;
