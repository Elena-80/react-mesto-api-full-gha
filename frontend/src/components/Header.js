import logo from "./../images/logo.svg";
import { Link } from "react-router-dom";

function Header({location, email, onSignOut}) {

   return (
     <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
         {(location.pathname === "/signup") && 
            <div className = "header__item">
               <Link to = '/signin' className = "header__link">
                  Войти
               </Link>
            </div>
         }

         {(location.pathname === "/signin") && 
            <div className = "header__item">
               <Link to = '/signup' className="header__link">
                  Регистрация
               </Link>
            </div>
         }

         {(location.pathname === "/") && 
            <div className = "header__item">
            <div className = "header__email">{email}</div>
               <Link to = '/signin' className = "header__link header__link_logged" onClick = {onSignOut}>
                  Выйти
               </Link>
            </div>
         }
     </header>
   )

}


export default Header;
