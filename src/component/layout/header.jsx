import React from 'react';
import {
    PlayCircleOutlined,
    QuestionCircleOutlined,
    BookOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import "./header.css"

const Header = () => {
    const location = useLocation();
    const items = [
        {
            label: (
                <Link to="/">
                    <div className="logo">
                        <img
                            src="/image/logo8_transparent.png"
                            alt="logo"
                            className="menu-logo"
                        />
                    </div>
                </Link>
            ),
            key: "home"
        },
        {
            label: <Link to="/lessons">Video bài giảng</Link>,
            key: 'lessons',
            icon: <PlayCircleOutlined />,
        },
        {
            label: <Link to="/quiz">Câu hỏi ôn tập</Link>,
            key: 'quiz',
            icon: <QuestionCircleOutlined />,
        },
        {
            label: <Link to="/knowledge">Tổng hợp kiến thức</Link>,
            key: 'knowledge',
            icon: <BookOutlined />,
        },
        {
            label: <Link to="/extend">Mở rộng</Link>,
            key: 'extend',
            icon: <AppstoreOutlined />,
        },
    ];

    return <Menu
        className="header-menu"
        selectedKeys={[location.pathname]}
        mode="horizontal" items={items} />;
};
export default Header;