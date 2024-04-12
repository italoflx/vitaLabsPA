import React, { useState } from "react";
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, UserAddOutlined, } from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { getIsAuthenticated } from "../api/api";
import { Checkbox, Form, Input } from 'antd'

const { Header, Content, Footer, Sider } = Layout;

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function getItem(label, key, icon, children) {
  return { key, icon, children, label, };
}

const items = [getItem("Option 1", "1", <PieChartOutlined />),
getItem("Option 2", "2", <DesktopOutlined />), getItem("User", "sub1", <UserOutlined />, [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5"),]),
getItem("Team", "sub2", <TeamOutlined />, [getItem("Team 1", "6"), getItem("Team 2", "8"), getItem("Team 3", "10"),]),
getItem("Cadastro", "sub3", <UserAddOutlined />, [getItem("Secretaria", "12"), getItem("Medico", "14"),]),
getItem("Files", "9", <FileOutlined />),
];

const handleLoginVerification = async (e) => {
  e.preventDefault();
  try {
    const isAuthenticated = await getIsAuthenticated()
    console.log(isAuthenticated)
  } catch (error) {
    console.error("Erro ao tentar autenticar o token:", error);
  }
};

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuItemClick = ({ key }) => {
    setSelectedMenuItem(key);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onSelect={handleMenuItemClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedMenuItem}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {selectedMenuItem === "12" && <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
                
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Nome"
                name="nome"
                rules={[
                  {
                    required: true,
                    message: 'Digite seu nome!',
                  },
                ]}
              >
               <Input />
              </Form.Item>

              <Form.Item
                label="CPF"
                name="cpf"
                rules={[
                  {
                    required: true,
                    message: 'Digite seu cpf!',
                  },
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Por favor, insira apenas números.',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Contato"
                name="contato"
                rules={[
                  {
                    required: true,
                    message: 'Digite seu número de contato!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Digite seu email!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Senha"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Digite sua senha!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Cadastrar
                </Button>
              </Form.Item>
            </Form>} {/* Exibir a mensagem quando o item "Secretaria" for selecionado */}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Home;