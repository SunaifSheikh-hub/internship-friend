import React from 'react'
import style from "./Posts.module.css";
import { Card as AntCard, Avatar, Menu, Dropdown} from 'antd';
import fb from '../../images/fb.png'

// import image from ''
const { Meta } = AntCard;

const Posts = ({data}) => {

    // const menu = (
    //     <Menu>
    //         <Menu.Item>
    //             <div onClick={deleteHandle}>
    //                 Delete Item
    //             </div>
    //         </Menu.Item>
    //     </Menu>
    // );

    return (
        <AntCard
            style={{ width: 300, margin: 10, borderColor: "black",  }}
            cover={
                <img
                    alt="example"
                    src={data.imageUrl}
                />
            }
            // actions={[
            //     <SettingOutlined key="setting" />,
            //     <EditOutlined key="edit" onClick={edit_click} />,
            //     <Dropdown overlay={menu} placement="bottomRight" arrow>
            //         <EllipsisOutlined key="ellipsis" />
            //     </Dropdown>
            // ]}
        >
            <Meta
                avatar={<Avatar src={data.imageUrl} />}
                title={data.title}
                description={data.description}
            />
        </AntCard>
    )
}

export default Posts
