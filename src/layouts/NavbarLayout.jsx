import Navbar from "@/components/Navbar"

const NavbarLayout = ({ cartList, setCartList },{children}) => {
    return (
      <>
        <Navbar cartList={cartList} setCartList={setCartList} />
        {children}
      </>
    );
}

export default NavbarLayout;