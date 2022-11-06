import { Navbar } from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const CNavbar = () => {
    return (
      <Navbar variant="static">
        <Navbar.Brand>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Item>
            <ConnectButton />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    )
}
export default CNavbar;