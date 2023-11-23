import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react"
import { useLocation } from "react-router-dom"


const HeaderBar = () => {
    const location = useLocation()
    const isActive = (a) => location.pathname.includes(a) ? 'text-blue-200' : '' 
    return (
        <Navbar className="bg-blue-900">
            <NavbarBrand>
                <p className="font-bold text-inherit text-blue-100">GG Creacioness</p>
            </NavbarBrand>
            <NavbarContent>
                <NavbarItem>
                    <Link className={isActive('/home')}  href="/home">Home</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className={isActive('/materials')} href="/materials">Materiales</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className={isActive('/sales')} href="/sales">Ventas</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className={isActive('/profits')} href="/profits">Ganancias</Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default HeaderBar