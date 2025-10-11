
import type React from "react";


export const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-[425px] md:max-w-[768px] lg:max-w-[1240px] xl:max-w-[1320px] mx-auto px-2 md:px-4 lg:px-6 xl:px-8">
            {children}
        </div>
    );
};

