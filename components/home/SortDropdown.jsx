import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { changeSort, mostLiked, newestSort } from "../../redux/slices/homeSlice";
export default function SortDropdown() {
  const dispatch = useDispatch();
  const [sort, setSort] = React.useState(newestSort);

  const handleChange = (event) => {
    setSort(event.target.value);

    dispatch(changeSort(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 ,marginTop:"10px",}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value={newestSort}>Newest</MenuItem>
          <MenuItem value={mostLiked}>Most liked</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
