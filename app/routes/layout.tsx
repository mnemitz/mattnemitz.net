import { Box } from "@radix-ui/themes";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <Box width="100%" maxWidth="1300px" mx="auto" asChild p="4">
      <main>
        <Outlet />
      </main>
    </Box>
  );
}
