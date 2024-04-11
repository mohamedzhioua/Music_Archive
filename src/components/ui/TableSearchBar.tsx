import { Box, InputAdornment, TextField } from "@mui/material";
import React from "react";

interface TableSearchBarProps {
  query: string;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableSearchBar: React.FC<TableSearchBarProps> = ({
  query,
  handleQueryChange,
}) => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        m: -1,
        p: 2,
      }}
    >
      <Box
        sx={{
          m: 1,
          maxWidth: "100%",
          width: 500,
        }}
      >
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {/* <SearchOutlinedIcon fontSize="small" /> */}
              </InputAdornment>
            ),
          }}
          onChange={handleQueryChange}
          placeholder="Search"
          value={query}
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default TableSearchBar;
