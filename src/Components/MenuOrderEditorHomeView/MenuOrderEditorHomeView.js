import { Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import LoadingView from "../LoadingView/LoadingView";
import MenuAddDialog from "../MenuAddDialog/MenuAddDialog";
import PairedMenuCard from "../PairedMenuCard/PairedMenuCard";

export default function MenuOrderEditorHomeView({
  customerId,
  menuRepository,
  imageRepository,
}) {
  const [menus, setMenus] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [clickedCategory, setClickedCategory] = useState();

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
    setOpen(true);
    setClickedCategory(event.target.name);
  }
  function saved() {
    menuRepository.getCustomerInfo(customerId, (data) => {
      if (data) {
        setMenus(data.menus);

        setLoading(false);
        return;
      }
      setLoading(false);
    });
  }

  function handleOnDragEnd(result) {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    const start = source.droppableId;
    const finish = destination.droppableId;
    if (start === finish && source.index === destination.index) return;
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

      const finishMenuOrder = Array.from(menus.categories[finish].menuOrder);
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
            <Typography variant="h5">Menu Order Editor</Typography>
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
              {menus.categoryOrder && menus.categoryOrder.length > 0 ? (
                menus.categoryOrder.map((category) => (
                  <Droppable key={category} droppableId={category}>
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
                        <Typography>{category}</Typography>
                        {menus.categories[category].menuOrder.map(
                          (menuId, index) => (
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
                                  />
                                </Box>
                              )}
                            </Draggable>
                          )
                        )}
                        {provided.placeholder}
                        <LoadingButton
                          loading={loading}
                          fullWidth
                          variant="outlined"
                          startIcon={<Add />}
                          name={category}
                          onClick={handleAddButtonOnClick}
                        >
                          Add
                        </LoadingButton>
                        <MenuAddDialog
                          open={open}
                          setOpen={setOpen}
                          category={clickedCategory}
                          customerId={customerId}
                          imageRepository={imageRepository}
                          menuRepository={menuRepository}
                          menus={menus}
                          saved={saved}
                        />
                      </Box>
                    )}
                  </Droppable>
                ))
              ) : (
                <Grid item>No Data Available</Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </DragDropContext>
  );
}
