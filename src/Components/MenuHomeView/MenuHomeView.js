import { Dashboard, ViewList } from "@mui/icons-material";
import { Button, Grid, Link, Switch, Typography } from "@mui/material";
import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";
import MenuCardView from "../MenuCardView/MenuCardView";
import MenuListView from "../MenuListView/MenuListView";

function MenuHomeView({ customerId, menuRepository }) {
  const [database, setDatabase] = useState({});
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    menuRepository.getCustomerInfo(customerId, (data) => {
      if (data) {
        setDatabase(data);
        return;
      }
    });
  }, [customerId, menuRepository]);

  const handleSwitch = (event) => {
    setToggle(!toggle);
  };
  const handleDownloadQrcode = () => {
    const canvas = document.getElementById("qr-code");
    const pngUrl = canvas.toDataURL("image/png");

    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "Pairable-Menu-QR-Code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Grid container item alignItems="center" direction="column" spacing={4}>
      <Grid item>
        <Typography variant="h5">Menu Preview</Typography>
      </Grid>
      <Grid container item>
        <Grid item container direction="column" alignItems="center" spacing={1}>
          <Grid item>
            <QRCode
              id="qr-code"
              value={`https://pairable.menu/#/menu/${database.publicUrl}`}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleDownloadQrcode}>
              QR Code Download
            </Button>
          </Grid>
          <Grid item>
            <Typography>
              Share this Public Link on social media or with anyone
            </Typography>
          </Grid>
          <Grid item>
            <Link
              href={`https://pairable.menu/#/menu/${database.publicUrl}`}
            >{`https://pairable.menu/#/menu/${database.publicUrl}`}</Link>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container justifyContent="center" alignItems="center">
        <Grid item>
          <ViewList />
        </Grid>
        <Grid item>
          <Switch checked={toggle} onChange={handleSwitch} />
        </Grid>
        <Grid item>
          <Dashboard />
        </Grid>
      </Grid>
      <Grid container item justifyContent="center" xs={10}>
        {Object.keys(database).find((key) => key === "menus") ? (
          toggle ? (
            <MenuCardView key={Date.now()} menus={database.menus} />
          ) : (
            <MenuListView menus={database.menus} />
          )
        ) : (
          <Grid item>No Data Available</Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default MenuHomeView;
