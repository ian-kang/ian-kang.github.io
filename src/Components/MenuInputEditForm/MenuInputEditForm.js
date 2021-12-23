import React, { useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Delete, Edit, PhotoCamera, Save } from "@mui/icons-material";
import { Box } from "@mui/system";

function MenuInputEditForm({
  cloudinary,
  customerId,
  menu,
  menus,
  menusArray,
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
  const handleImageDeleteButton = () => {
    setImageUrlOnEdit("");
  };

  const handleOnChange = (event) => {
    if (event.target.name === "img") {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrlOnEdit(url);
      setImageFileOnEdit(file);
      return;
    } else if (event.target.name === "pairs") {
      const value = event.target.value;
      const pairs = typeof value === "string" ? value.split(",") : value;
      setMenuOnEdit({ ...menuOnEdit, pairs });
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
    if (imageFileOnEdit) {
      const result = await cloudinary.imageUpload(imageFileOnEdit, [
        menuOnEdit.menuId,
        menuOnEdit.category,
        menuOnEdit.name,
      ]);
      updateMenu(customerId, menu.menuId, {
        ...menuOnEdit,
        img: result.url,
      });
      setMenuOnEdit(menu);
      setOpen(false);
      return;
    }
    updateMenu(customerId, menu.menuId, { ...menuOnEdit, img: imageUrlOnEdit });
    setMenuOnEdit(menuOnEdit);
    setOpen(false);
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
            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                label="Category"
                name="category"
                value={menuOnEdit.category}
                fullWidth
                onChange={handleOnChange}
              />
            </Grid>
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

            <Grid
              container
              item
              xs={12}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<Delete />}
                  onClick={handleImageDeleteButton}
                >
                  Delete Image
                </Button>
              </Grid>
              <Grid item>
                <label htmlFor={`contained-button-file-${menuOnEdit.menuId}`}>
                  <Input
                    sx={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    id={`contained-button-file-${menuOnEdit.menuId}`}
                    name="img"
                    onChange={handleOnChange}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<PhotoCamera />}
                  >
                    Upload
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
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id={`best-paired-with-${menuOnEdit.menuId}`}>
                  Best Paired With
                </InputLabel>
                <Select
                  labelId={`best-paired-with-${menuOnEdit.menuId}`}
                  multiple
                  value={menuOnEdit.pairs ? menuOnEdit.pairs : []}
                  name="pairs"
                  label="Best Paired With"
                  onChange={handleOnChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={menus[value].name} />
                      ))}
                    </Box>
                  )}
                >
                  {menusArray.map((menu) => (
                    <MenuItem value={menu.menuId}>{menu.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
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
