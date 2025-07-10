"use client";
import { Box, Typography } from "@mui/material";

export default function EmptyPage() {
  return (
    <Box sx={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h4" color="text.secondary" align="center">
        No Data Available
      </Typography>
    </Box>
  );
}
