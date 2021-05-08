import React, {FC} from 'react';
import MainRouterComponent from "./router/main-router.component";
import {BrowserRouter} from "react-router-dom";

const DepartmentApp: FC = () => {
    return (
        <>
            <BrowserRouter>
                <MainRouterComponent/>
            </BrowserRouter>
        </>
    );
};

export default DepartmentApp;