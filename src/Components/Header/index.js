import { useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useTheme } from "../../Contexts/ThemeContext";
import style from "./style.module.css";

function Header() {
  const { theme, setTheme, setDefaultTheme, togClass, setTogClass } =
    useTheme();

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
    if (localStorage.getItem("theme") === "theme-dark") {
      setTogClass("dark");
    } else if (localStorage.getItem("theme") === "theme-light") {
      setTogClass("light");
    }
  }, [theme, setTogClass, setTheme]);

  const handleOnClick = () => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setDefaultTheme("theme-light");
      setTogClass("light");
    } else {
      setDefaultTheme("theme-dark");
      setTogClass("dark");
    }
  };

  return (
    <div>
      <Navbar expand='lg' className={style.menu}>
        <Navbar.Brand href='/'>Crypto Money</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/faq'>F.A.Q</Nav.Link>
          </Nav>
          <Nav>
            <div className={style.containerToggle}>
              {togClass === "light" ? (
                <img
                  src={`${process.env.PUBLIC_URL}/Images/dark.png`}
                  className={style.themeChange}
                  onClick={handleOnClick}
                  alt='theme'
                />
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/Images/light.png`}
                  className={style.themeChange}
                  onClick={handleOnClick}
                  alt='theme'
                />
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
