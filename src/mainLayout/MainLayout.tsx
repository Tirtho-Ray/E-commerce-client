import { Outlet } from "react-router";
import Navbar from "../components/layout/navbar/Navbar";
import Footer from "../components/layout/footer/Footer";
import { Container } from "../components/ui/Container/Container";
import { Toaster } from 'react-hot-toast';
import ScrollManager from "../utils/ScrollManager/ScrollManager";


const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>
            <ScrollManager />
            <main className="pt-[120px] md:pt-[87px] flex-grow">
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default MainLayout;
