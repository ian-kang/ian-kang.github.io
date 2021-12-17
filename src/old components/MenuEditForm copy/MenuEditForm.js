import { RestaurantMenu, WineBar } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

export default function MenuEditForm({ pairedMenu }) {
  const [foodName, setFoodName] = useState();
  const [foodDesc, setFoodDesc] = useState();
  const [foodPrice, setFoodPrice] = useState();
  const [drinkName, setDrinkName] = useState();
  const [drinkDesc, setDrinkDesc] = useState();
  const [drinkPrice, setDrinkPrice] = useState();
  const [drinkRate, setDrinkRate] = useState();

  const handleAddButton = () => {
    setPairedMenuList([
      ...pairedMenuList,
      {
        pairId: pairedMenuList.length + 1,
        foods: [{ name: foodName, desc: foodDesc, price: foodPrice }],
        drinks: [
          {
            rate: drinkRate,
            name: drinkName,
            desc: drinkDesc,
            price: drinkPrice,
          },
        ],
      },
    ]);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "foodName":
        setFoodName(value);
        break;
      case "foodDesc":
        setFoodDesc(value);
        break;
      case "foodPrice":
        setFoodPrice(value);
        break;
      case "drinkName":
        setDrinkName(value);
        break;
      case "drinkDesc":
        setDrinkDesc(value);
        break;
      case "drinkPrice":
        setDrinkPrice(value);
        break;
      case "drinkRate":
        setDrinkRate(value);
        break;
      default:
        new Error("Input type is not supported");
    }
  };
  return (
    <Box sx={{ border: "solid", borderRadius: "4px" }}>
      <Box>
        <RestaurantMenu />
        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor="foodName">Name</InputLabel>
          <Input name="foodName" value={foodName} onChange={handleChange} />
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor="foodDesc">Description</InputLabel>
          <Input
            name="foodDesc"
            multiline
            value={foodDesc}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor="foodPrice">Price</InputLabel>
          <Input
            name="foodPrice"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={foodPrice}
            onChange={handleChange}
          />
        </FormControl>
      </Box>
      <Box>
        <WineBar />
        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor="drinkName">Name</InputLabel>
          <Input name="drinkName" value={drinkName} onChange={handleChange} />
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor="drinkDesc">Description</InputLabel>
          <Input
            name="drinkDesc"
            multiline
            value={drinkDesc}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor="drinkPrice">Price</InputLabel>
          <Input
            name="drinkPrice"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={drinkPrice}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ width: "100px" }}>
          <InputLabel name="drinkRate">Rate</InputLabel>
          <Select
            labelId="drinkRate"
            name="drinkRate"
            label="Rate"
            value={drinkRate}
            onChange={handleChange}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Mid">Mid</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" onClick={handleAddButton}>
        Add
      </Button>
    </Box>
  );
}
