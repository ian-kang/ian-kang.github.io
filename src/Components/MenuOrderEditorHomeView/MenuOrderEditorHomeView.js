import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingView from "../LoadingView/LoadingView";
import PairedMenuCard from "../PairedMenuCard/PairedMenuCard";

export default function MenuOrderEditorHomeView({
  customerId,
  menuRepository,
}) {
  const [database, setDatabase] = useState({});
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [categories, setCategories] = useState();

  useEffect(() => {
    menuRepository.getCustomerInfo(customerId, (data) => {
      if (data) {
        setDatabase(data);
        if (Object.keys(data).find((key) => key === "menus")) {
          setCategories([
            ...new Set(Object.values(data.menus).map((menu) => menu.category)),
          ]);
        }
        setLoading(false);
        return;
      }
      setLoading(false);
    });
  }, [customerId, menuRepository]);
  console.log(categories);

  function handleSave() {
    setSaveLoading(true);
  }
  return (
    <>
      {loading ? (
        <LoadingView loading={loading} text="Loading Editor..." />
      ) : (
        <Grid container item justifyContent="center">
          <Grid item>
            <Typography variant="h5">Menu Order Editor</Typography>
          </Grid>
          <Grid item container justifyContent="right">
            <Grid item sx={{ mr: 4 }}>
              <LoadingButton
                loading={saveLoading}
                onClick={handleSave}
                startIcon={<Save />}
                variant="contained"
              >
                Save
              </LoadingButton>
            </Grid>
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
              }}
            >
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <Box
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
                    {Object.values(database.menus)
                      .filter((menu) => menu.category === category)
                      .map((menu) => (
                        <PairedMenuCard menu={menu} menus={database.menus} />
                      ))}
                  </Box>
                ))
              ) : (
                <Grid item>No Data Available</Grid>
              )}
            </Box>
          </Grid>

          <Grid
            item
            container
            direction="column"
            alignItems="center"
            xs={10}
            spacing={2}
          >
            {Object.keys(database).find((key) => key === "menus") ? (
              Object.values(database.menus).map((menu) => (
                <Grid item>
                  <PairedMenuCard menu={menu} menus={database.menus} />
                </Grid>
              ))
            ) : (
              <Grid item>No Data Available</Grid>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
}
