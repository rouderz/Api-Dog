import {
    HomeOutlined,
    PoweroffOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import React, { FunctionComponent, useMemo } from "react";
import { Menu } from "antd";
import { useRouter } from "next/router";

export interface SidebarRoutes {
    roles: AppRole[];
}

export type AppRole = "user";

const SidebarRoutes: FunctionComponent<SidebarRoutes> = ({ roles }) => {
    const route = useRouter();
    const finalRoutes = useMemo(() => {
        return routes.reduce((acc, route) => {
            if (route.role == undefined) {
                acc.push(route);
                return acc;
            }
            if (route?.role && roles?.some(r => route.role.includes(r))) {
                acc.push(route);
                return acc;
            }
            return acc;
        }, []);
    }, [roles]);

    const selectedKey = [finalRoutes?.findIndex((rute) => rute.routeUrl === route.pathname).toString()];

    return (
        <Menu mode="inline"
              selectedKeys={selectedKey}>
            {finalRoutes?.map((routeData, index) => {
                return (
                    <Menu.Item
                        key={index}
                        icon={routeData.icon}
                        onClick={() => {
                            route.push(routeData.routeUrl);
                            routeData.routeUrl == "/" && localStorage.removeItem("token");
                        }}
                    >
                        {routeData.name}
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};

export default SidebarRoutes;

export interface Route {
    name: string;
    icon: any;
    routeUrl: string;
    role?: string[];
}

export const routes: Route[] = [
    {
        name: "Inicio",
        icon: <HomeOutlined />,
        routeUrl: "/Dashboard"
    },
    {
        name: "Listado de perros",
        icon: <UnorderedListOutlined />,
        routeUrl: "/AllList"
    },
    {
        name: "Cerrar sesión",
        icon: <PoweroffOutlined />,
        routeUrl: "/"
    }
];