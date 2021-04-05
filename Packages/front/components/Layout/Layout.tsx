import { ConfigProvider, Image, Layout as LayoutAntd } from "antd";
import React, { FunctionComponent, useState } from "react";
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes";
import { setLocale } from "yup";
import moment from "moment";
import esES from "antd/lib/locale/es_ES";
import { useRouter } from "next/router";

const { Content, Footer, Sider } = LayoutAntd;

const Layout: FunctionComponent = ({ children }) => {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [user, setUser] = useState<any>();
    const [sourceImage, setSourceImage] = useState<string>();

    return (
        <LayoutAntd>
            <Sider
                theme="light"
                style={{
                    minHeight: "100vh",
                    boxShadow: "0 2px 21px rgba(0,37,136,0.23)",
                    position: "fixed",
                    zIndex: 99
                }}
                breakpoint="lg"
                onBreakpoint={(breakPoint) => setCollapsed(breakPoint)}
                collapsedWidth="0"
            >
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Image
                        width={100}
                        height={"auto"}
                        preview={false}
                        src={sourceImage}
                    />
                </div>
                <SidebarRoutes roles={user?.roles} />
            </Sider>
            <LayoutAntd style={{ marginLeft: collapsed ? 0 : 200, minHeight: "100vh" }}>
                <ConfigProvider locale={esES}>
                    <Content style={{ margin: "24px 16px 0" }}>
                        <div style={{ padding: 24, minHeight: "90%" }}>
                            {children}
                        </div>
                    </Content>
                </ConfigProvider>
                <Footer style={{ textAlign: "center" }}>
                    ©2021 Made with ❤ by Wolfgang Welcomez
                </Footer>
            </LayoutAntd>
        </LayoutAntd>
    );
};
setLocale({
    mixed: {
        required: "El campo es requerido",
        notType: ({ type }) => `El campo debe ser tipo ${type}`
    },
    string: {
        min: "Mínimo ${min} caracteres",
        max: "Máximo ${max} caracteres"
    },
    number: {
        min: ({ min }) => `El número debe ser mayor o igual a ${min}`,
        max: ({ max }) => `El número debe ser inferior o igual a ${max}`,
        moreThan: ({ value, more }) => `El número debe ser mayor a ${more}`
    }
});
moment.locale("es");
export default Layout;