import CartSidebar from "./cart/sidebar";
import Logo from "./logo";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
            <div className="flex items-center gap-4">
                <Logo />
                <ThemeToggle />
            </div>
            <div className="flex items-center gap-4">
                <CartSidebar />
            </div>
        </header>
    );
};

export default Header;
