import { Delete, PhotoCamera, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
function MenuEditDialog({
  open,
  setOpen,
  menu,
  menus,
  menusArray,
  imageRepository,
  updateMenu,
  customerId,
}) {
  const [menuOnEdit, setMenuOnEdit] = useState(menu);
  const [imageUrlOnEdit, setImageUrlOnEdit] = useState(menu.img);
  const [imageFileOnEdit, setImageFileOnEdit] = useState();
  const [loading, setLoading] = useState();

  const handleOnChange = (event) => {
    if (event.target.name === "img") {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImageUrlOnEdit(url);
        setImageFileOnEdit(file);
        return;
      }
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
      setLoading(true);
      const result = await imageRepository.imageUpload(
        customerId,
        imageFileOnEdit,
        [menuOnEdit.menuId, menuOnEdit.category, menuOnEdit.name]
      );
      updateMenu(customerId, menu.menuId, {
        ...menuOnEdit,
        img: result.url,
      });
      setMenuOnEdit(menu);
      setOpen(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    updateMenu(customerId, menu.menuId, { ...menuOnEdit, img: imageUrlOnEdit });
    setMenuOnEdit(menuOnEdit);
    setOpen(false);
    setLoading(false);
  };
  const handleImageDeleteButton = () => {
    setImageUrlOnEdit("");
    setImageFileOnEdit(null);
  };
  return (
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
                <img
                  src={imageUrlOnEdit}
                  alt=""
                  loading="lazy"
                  style={{ width: "100%", height: "100%" }}
                />
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
                disabled={loading}
              >
                Delete Image
              </Button>
            </Grid>
            <Grid item>
              <label htmlFor={`contained-button-file-${menuOnEdit.menuId}`}>
                <Input
                  sx={{ display: "none" }}
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  id={`contained-button-file-${menuOnEdit.menuId}`}
                  name="img"
                  onChange={handleOnChange}
                  disabled={loading}
                />
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCamera />}
                  disabled={loading}
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
              disabled={loading}
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
                disabled={loading}
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
                  <MenuItem key={menu.menuId} value={menu.menuId}>
                    {menu.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} disabled={loading}>
          Cancel
        </Button>
        <LoadingButton
          loading={loading}
          onClick={handleSave}
          startIcon={<Save />}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default MenuEditDialog;
