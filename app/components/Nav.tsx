import { Button, Flex, Separator, Text } from "@radix-ui/themes";
import { NavLink, useLocation } from "react-router";

export function Nav() {
  return (
    <Flex
      width="100%"
      asChild
      gap="2"
      p="2"
      justify="center"
      align="center"
      style={{ backgroundColor: "var(--gray-2)" }}
    >
      <nav>
        <NavItem to="/">Home</NavItem>
        <Separator size="1" orientation="vertical" />
        <NavItem to="/cv">CV</NavItem>
      </nav>
    </Flex>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  const active = useLocation().pathname === to;

  return (
    <Button asChild variant="ghost" style={{ margin: 0 }} size="3">
      <NavLink to={to} viewTransition end>
        <Text weight={active ? "bold" : "regular"}>{children}</Text>
      </NavLink>
    </Button>
  );
}
