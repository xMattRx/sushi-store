import { Separator } from '@radix-ui/react-dropdown-menu';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-white py-4 text-center">
            <Separator />
            <div>
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
                </p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="/privacy" className="text-sm hover:underline">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="text-sm hover:underline">
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
