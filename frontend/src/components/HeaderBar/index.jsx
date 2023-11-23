import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react"
import { useLocation } from "react-router-dom"


const HeaderBar = () => {
    const location = useLocation()
    const isActive = (a) => location.pathname.includes(a) ? 'text-blue-100' : 'text-blue-400' 
    return (
        <Navbar className="bg-blue-900">
            <NavbarBrand>
                <p className="text-blue-100 font-bold">GG Creaciones</p>
            </NavbarBrand>
            <NavbarContent className="w-10">
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