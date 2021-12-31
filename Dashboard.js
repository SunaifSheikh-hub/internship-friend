import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import Setting from './Setting';
import Home from './Home';
import {Link} from 'react-router-dom'
import Navs from './Navs';

const Dashboard = () => {
    const { Header, Content, Footer } = Layout;

    return (
        <div>


            <Layout>
                {/* <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to="../home">Profile</Link></Menu.Item>
                        <Menu.Item key="2"> <Link to="../setting"> Setting </Link>   </Menu.Item>
                        <Menu.Item key="3">About</Menu.Item>
                    </Menu>
                </Header> */}
                <Navs />    
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                  {/* <Setting/>
                  <Home/> */}
                </Content>
            </Layout>,




        </div>
    )
}

export default Dashboard
