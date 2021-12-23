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
import React from "react";

function MenuEditDialog({
  open,
  menuOnEdit,
  handleCancel,
  handleOnChange,
  imageUrlOnEdit,
  handleImageDeleteButton,
  handleSave,
  menus,
  menusArray,
}) {
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
  );
}

export default MenuEditDialog;
