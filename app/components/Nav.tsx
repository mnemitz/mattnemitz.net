import { Button, Flex, Separator, Text } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { NavLink, useLocation } from "react-router";

export function Nav() {
  const { theme, setTheme } = useTheme();

  return (
    <Flex
      align="center"
      width="100%"
      style={{ backgroundColor: "var(--gray-2)" }}
    >
      <Flex width="100%" asChild gap="2" p="2" justify="center" align="center">
        <nav>
          <NavItem to="/">Home</NavItem>
          <Separator size="1" orientation="vertical" />
          <NavItem to="/cv">CV</NavItem>
        </nav>
      </Flex>
      <Button
        variant="ghost"
        radius="full"
        color="gray"
        style={{ margin: 0 }}
        size="3"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </Flex>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  const active = useLocation().pathname === to;

  return (
    <Button asChild variant="ghost" color="gray" style={{ margin: 0 }} size="3">
      <NavLink to={to} viewTransition end>
        <Text weight={active ? "bold" : "regular"}>{children}</Text>
      </NavLink>
    </Button>
  );
}
