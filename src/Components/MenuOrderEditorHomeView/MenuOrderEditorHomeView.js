import { Add, DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import CategoryAddForm from "../CategoryAddForm/CategoryAddForm";
import CategoryEditCard from "../CategoryEditCard/CategoryEditCard";
import DeleteAlertDialog from "../DeleteAlertDialog/DeleteAlertDialog";
import LoadingView from "../LoadingView/LoadingView";
import MenuAddDialog from "../MenuAddDialog/MenuAddDialog";
import MenuEditDialog from "../MenuEditDialog/MenuEditDialog";
import PairedMenuCard from "../PairedMenuCard/PairedMenuCard";
export default function MenuOrderEditorHomeView({
  customerId,
  menuRepository,
  imageRepository,
}) {
  const [menus, setMenus] = useState();
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [categoryEditOpen, setCategoryEditOpen] = useState(false);
  const [categoryAddOpen, setCategoryAddOpen] = useState(false);
  const [categoryExist, setCategoryExist] = useState();
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [clickedCategory, setClickedCategory] = useState();
  const [editMenuId, setEditMenuId] = useState();

  useEffect(() => {
    menuRepository.getCustomerInfo(customerId, (data) => {
      if (data) {
        setMenus(data.menus);

        setLoading(false);
        return;
      }
      setLoading(false);
    });
  }, [customerId, menuRepository]);

  function handleAddButtonOnClick(event) {
    setAddOpen(true);
    setClickedCategory(event.target.name);
  }
  function handleEditButtonOnClick(menuId) {
    setEditMenuId(menuId);
    setEditOpen(true);
  }

  function handleCategoryAddButtonOnClick() {
    setCategoryAddOpen(true);
  }
  function handleCategoryEditButtonOnClick(category) {
    setCategoryEditOpen(true);
    setClickedCategory(category);
  }
  function handleCategoryDeleteButtonOnClick(category) {
    setDeleteAlertOpen(true);
    setClickedCategory(category);
  }
  function refresh() {
    menuRepository.getCustomerInfo(customerId, (data) => {
      if (data) {
        setMenus(data.menus);

        setLoading(false);
        return;
      }
      setLoading(false);
    });
  }
  function addMenu(newMenus) {
    menuRepository.updateMenus(customerId, newMenus);
    refresh();
  }
  function deleteMenu(menuId) {
    const newMenus = JSON.parse(JSON.stringify(menus));
    newMenus.categoryOrder.forEach((category) => {
      let index;
      if (newMenus.categories[category].menuOrder) {
        index = newMenus.categories[category].menuOrder.indexOf(menuId);
      } else {
        return;
      }
      if (index > -1) {
        newMenus.categories[category].menuOrder.splice(index, 1);
      }
    });
    delete newMenus.items[menuId];
    const menuIds = Object.keys(newMenus.items);
    menuIds.forEach((id) => {
      const pairs = newMenus.items[id].pairs;
      if (pairs) {
        const index = pairs.indexOf(menuId);
        if (index > -1) {
          newMenus.items[id].pairs.splice(index, 1);
        } else {
          return;
        }
      }
    });
    setMenus(newMenus);
    menuRepository.updateMenus(customerId, newMenus);
  }
  function difference(oldArray, newArray) {
    return oldArray.filter((x) => !newArray.includes(x));
  }
  function editMenu(oldMenu, updatedMenu) {
    if (!oldMenu.pairs && !updatedMenu.pairs) {
      menuRepository.updateMenu(customerId, oldMenu.menuId, updatedMenu);
      menuRepository.getCustomerInfo(customerId, (data) => {
        setMenus(data.menus);
      });
      setEditMenuId();
    } else {
      menuRepository.updateMenu(customerId, oldMenu.menuId, updatedMenu);
      let addedPairs;
      let removedPairs;
      if (!oldMenu.pairs) {
        addedPairs = updatedMenu.pairs;
      } else if (!updatedMenu.pairs) {
        removedPairs = oldMenu.pairs;
      } else {
        removedPairs = difference(oldMenu.pairs, updatedMenu.pairs);
        addedPairs = difference(updatedMenu.pairs, oldMenu.pairs);
      }
      menuRepository.getCustomerInfo(customerId, (data) => {
        if (addedPairs && addedPairs.length > 0) {
          addedPairs.forEach((id) => {
            const pairs = data.menus.items[id].pairs;
            if (pairs) {
              pairs.push(updatedMenu.menuId);
            } else {
              data.menus.items[id]["pairs"] = [updatedMenu.menuId];
            }
          });
        }
        if (removedPairs && removedPairs.length > 0) {
          removedPairs.forEach((id) => {
            const pairs = data.menus.items[id].pairs;
            if (pairs) {
              const index = pairs.indexOf(updatedMenu.menuId);
              if (index > -1) {
                data.menus.items[id].pairs.splice(index, 1);
              }
            }
          });
        }
        menuRepository.updateMenus(customerId, data.menus);
        setMenus(data.menus);
        setEditMenuId();
      });
    }
  }

  function editCategory(oldCategory, newCategory) {
    const newMenus = JSON.parse(JSON.stringify(menus));
    if (newCategory in newMenus.categories) {
      setCategoryExist(true);
      return;
    }
    const copiedCategory = newMenus.categories[oldCategory];
    delete newMenus.categories[oldCategory];
    newMenus.categories[newCategory] = copiedCategory;

    const index = newMenus.categoryOrder.indexOf(oldCategory);
    if (index > -1) {
      newMenus.categoryOrder.splice(index, 1);
      newMenus.categoryOrder.splice(index, 0, newCategory);
    }

    menuRepository.updateMenus(customerId, newMenus);
    setMenus(newMenus);
  }

  function deleteCategory() {
    const newMenus = JSON.parse(JSON.stringify(menus));
    if (newMenus.categories[clickedCategory].menuOrder) {
      newMenus.categories[clickedCategory].menuOrder.forEach((menuId) => {
        delete newMenus.items[menuId];
        const menuIds = Object.keys(newMenus.items);
        menuIds.forEach((id) => {
          const pairs = newMenus.items[id].pairs;
          if (pairs) {
            const index = pairs.indexOf(menuId);
            if (index > -1) {
              newMenus.items[id].pairs.splice(index, 1);
            } else {
              return;
            }
          }
        });
      });
    }

    delete newMenus.categories[clickedCategory];

    const index = newMenus.categoryOrder.indexOf(clickedCategory);
    if (index > -1) {
      newMenus.categoryOrder.splice(index, 1);
    }

    menuRepository.updateMenus(customerId, newMenus);
    setMenus(newMenus);
  }
  function addCategory(newCategory) {
    let newMenus;
    if (!menus) {
      newMenus = {};
    } else {
      newMenus = JSON.parse(JSON.stringify(menus));
      if (newCategory in menus.categories) {
        setCategoryExist(true);
        return;
      }
    }
    if (!newMenus.categories && !newMenus.categoryOrder) {
      newMenus["categories"] = {
        [newCategory]: {
          type: "category",
          menuOrder: [],
        },
      };
      newMenus["categoryOrder"] = [];
      newMenus.categoryOrder.push(newCategory);
      menuRepository.updateMenus(customerId, newMenus);
      setMenus(newMenus);
      return;
    }
    newMenus.categories[newCategory] = { type: "category" };
    newMenus.categoryOrder.push(newCategory);

    menuRepository.updateMenus(customerId, newMenus);
    setMenus(newMenus);
  }

  function handleOnDragEnd(result) {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;
    const start = source.droppableId;
    const finish = destination.droppableId;
    if (start === finish && source.index === destination.index) return;

    if (type === "category") {
      const newCategoryOrder = Array.from(menus.categoryOrder);
      newCategoryOrder.splice(source.index, 1);
      newCategoryOrder.splice(destination.index, 0, draggableId);

      const newMenus = {
        ...menus,
        categoryOrder: newCategoryOrder,
      };
      setMenus(newMenus);
      menuRepository.updateMenus(customerId, newMenus);
      return;
    }

    if (start === finish) {
      const category = menus.categories[source.droppableId];
      const newMenuOrder = Array.from(category.menuOrder);
      newMenuOrder.splice(source.index, 1);
      newMenuOrder.splice(destination.index, 0, draggableId);
      const newMenus = {
        ...menus,
        categories: {
          ...menus.categories,
          [source.droppableId]: {
            ...menus.categories[source.droppableId],
            menuOrder: newMenuOrder,
          },
        },
      };
      setMenus(newMenus);
      menuRepository.updateMenus(customerId, newMenus);
      return;
    } else if (start !== finish) {
      const startMenuOrder = Array.from(menus.categories[start].menuOrder);
      startMenuOrder.splice(source.index, 1);
      let finishMenuOrder;
      if (!menus.categories[finish].menuOrder) {
        finishMenuOrder = [];
      } else {
        finishMenuOrder = Array.from(menus.categories[finish].menuOrder);
      }
      finishMenuOrder.splice(destination.index, 0, draggableId);
      const newMenus = {
        ...menus,
        categories: {
          ...menus.categories,
          [start]: {
            ...menus.categories[start],
            menuOrder: startMenuOrder,
          },
          [finish]: {
            ...menus.categories[finish],
            menuOrder: finishMenuOrder,
          },
        },
      };
      setMenus(newMenus);
      menuRepository.updateMenus(customerId, newMenus);
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {loading ? (
        <LoadingView loading={loading} text="Loading Editor..." />
      ) : (
        <Grid container item justifyContent="center">
          <Grid item>
            <Typography variant="h5">Menu Editor</Typography>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                p: 2,
                boxSizing: "border-box",
                gap: 2,
                justifyContent: "center",
              }}
            >
              <Droppable
                droppableId="total"
                direction="horizontal"
                type="category"
              >
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{
                      display: "flex",
                      width: "100%",
                      overflow: "auto",
                      p: 2,
                      boxSizing: "border-box",
                      gap: 2,
                      justifyContent: "flex-start",
                    }}
                  >
                    {menus &&
                    menus.categoryOrder &&
                    menus.categoryOrder.length > 0
                      ? menus.categoryOrder.map((category, index) => (
                          <Draggable
                            key={category}
                            draggableId={category}
                            index={index}
                          >
                            {(provided) => (
                              <Box
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                sx={{ mb: 2 }}
                              >
                                <Droppable droppableId={category} type="menu">
                                  {(provided) => (
                                    <Box
                                      {...provided.droppableProps}
                                      ref={provided.innerRef}
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "300px",
                                        height: "100%",
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: 1,
                                        gap: 1,
                                        p: 1,
                                        alignItems: "center",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: "100%",
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Box sx={{ ml: 1 }}>
                                          <Typography>{category}</Typography>
                                        </Box>
                                        <Box>
                                          <IconButton
                                            name={category}
                                            onClick={() => {
                                              handleCategoryEditButtonOnClick(
                                                category
                                              );
                                            }}
                                          >
                                            <EditOutlined />
                                          </IconButton>
                                          <IconButton
                                            name={category}
                                            onClick={() => {
                                              handleCategoryDeleteButtonOnClick(
                                                category
                                              );
                                            }}
                                          >
                                            <DeleteOutlined />
                                          </IconButton>
                                        </Box>
                                      </Box>

                                      {menus.categories[category].menuOrder &&
                                        menus.categories[
                                          category
                                        ].menuOrder.map((menuId, index) => (
                                          <Draggable
                                            key={menuId}
                                            draggableId={menuId.toString()}
                                            index={index}
                                          >
                                            {(provided) => (
                                              <Box
                                                sx={{ width: "100%" }}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                              >
                                                <PairedMenuCard
                                                  menu={menus.items[menuId]}
                                                  menus={menus.items}
                                                  type="edit"
                                                  editMenu={
                                                    handleEditButtonOnClick
                                                  }
                                                  deleteMenu={deleteMenu}
                                                />
                                              </Box>
                                            )}
                                          </Draggable>
                                        ))}
                                      {provided.placeholder}
                                      <LoadingButton
                                        loading={loading}
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<Add />}
                                        name={category}
                                        onClick={handleAddButtonOnClick}
                                      >
                                        Add Menu
                                      </LoadingButton>
                                    </Box>
                                  )}
                                </Droppable>
                              </Box>
                            )}
                          </Draggable>
                        ))
                      : null}
                    {provided.placeholder}
                    <Box>
                      <LoadingButton
                        loading={loading}
                        fullWidth
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={handleCategoryAddButtonOnClick}
                      >
                        Add Category
                      </LoadingButton>
                    </Box>
                  </Box>
                )}
              </Droppable>
            </Box>
            {clickedCategory && (
              <MenuAddDialog
                open={addOpen}
                setOpen={setAddOpen}
                category={clickedCategory}
                customerId={customerId}
                imageRepository={imageRepository}
                addMenu={addMenu}
                menus={menus}
              />
            )}
            {editMenuId && (
              <MenuEditDialog
                open={editOpen}
                setOpen={setEditOpen}
                category={clickedCategory}
                menu={menus.items[editMenuId]}
                menuItems={menus.items}
                imageRepository={imageRepository}
                editMenu={editMenu}
                customerId={customerId}
              />
            )}
            {clickedCategory && (
              <CategoryEditCard
                open={categoryEditOpen}
                setOpen={setCategoryEditOpen}
                category={clickedCategory}
                editCategory={editCategory}
              />
            )}
            {
              <DeleteAlertDialog
                open={deleteAlertOpen}
                setDeleteAlertOpen={setDeleteAlertOpen}
                deleteCategory={deleteCategory}
              />
            }
            {
              <CategoryAddForm
                open={categoryAddOpen}
                setOpen={setCategoryAddOpen}
                addCategory={addCategory}
              />
            }
            {
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={categoryExist}
                autoHideDuration={3000}
                onClose={() => {
                  setCategoryExist(false);
                }}
              >
                <Alert severity="error">Category Name already Exists</Alert>
              </Snackbar>
            }
          </Grid>
        </Grid>
      )}
    </DragDropContext>
  );
}
