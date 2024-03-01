import {
    CloseSquareOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FileDoneOutlined, EyeOutlined, StarOutlined, FundProjectionScreenOutlined, HddOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Typography } from 'antd';
import React, { useState } from 'react';
import "../styles/main.css"
import Logo from "../images/markaz.png"
import Monitoring from "./Monitoring";
import AllIncidents from "./AllIncidents"
import Info from "./Info";
import Exit from "./Exit"

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function Main(props) {
    const [collapsed, setCollapsed] = useState(false);
    const [itemId, setItemId] = useState(1);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    function getKey(key) {
        setItemId(key.key)
    }

    return (
        <Layout id="sidebar">
            <Sider trigger={null} collapsible collapsed={collapsed} width={300}>
                <div id="logo">
                    <img width="60px" src={Logo} alt="something.jpg"/>
                </div>
                <Menu
                    style={{height:"100vh", color:"white", fontSize:"18px", fontFamily:"monospace"}}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={getKey}
                    items={[
                        {
                            key: '1',
                            icon: <FundProjectionScreenOutlined style={{fontSize:"20px"}}/>,
                            label: "Monitoring oynasi",
                        },
                        {
                            key: '2',
                            icon: <HddOutlined style={{fontSize:"20px"}}/>,
                            label: "Barcha insidentlar",
                        },
                        // {
                        //     key: '2',
                        //     icon: <FormOutlined />,
                        //     label: "Yangilik qo'shish",
                        // },
                        // {
                        //     key: '3',
                        //     icon: <CommentOutlined />,
                        //     label: "Izohlarni tasdiqlash",
                        // },
                        // {
                        //     key: '4',
                        //     icon: <AppstoreAddOutlined />,
                        //     label: "Ma'lumotnoma",
                        // },
                        {
                            key: '5',
                            icon: <CloseSquareOutlined style={{fontSize:"20px"}}/>,
                            label: "Chiqish",
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 20,
                        background: colorBgContainer,
                        display: "flex"
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <div style={{margin: "0 auto", display:"flex"}}>
                        <EyeOutlined style={{fontSize: "22px", fontWeight: "bold", paddingRight: "5px"}}/>
                        <Title style={{fontSize: "20px", margin: "0 auto", fontFamily:"monospace"}}> OBSERVATOR </Title>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: colorBgContainer,
                    }}
                >
                    {
                        itemId == 1 ? <Monitoring/> :
                            itemId == 2 ? <AllIncidents/> :
                                // itemId == 3 ? <AddComment/> :
                                    itemId == 4 ? <Info/> :
                                        itemId == 5 ? <Exit open={true}/> : null
                    }
                </Content>
            </Layout>
        </Layout>
    );
}

export default Main;