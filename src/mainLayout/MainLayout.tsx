import { Outlet } from "react-router";
import Navbar from "../components/layout/navbar/Navbar";
import Footer from "../components/layout/footer/Footer";
import { Container } from "../components/ui/reUsable/Container";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
                <Navbar />
            </div>
            <main className="pt-[86px] flex-grow">
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
