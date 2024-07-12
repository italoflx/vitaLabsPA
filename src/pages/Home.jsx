import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  List,
  Spin,
  Alert,
  Button,
  Form,
  Input,
} from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { getRequest } from "../api/api";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const HomePage = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showList, setShowList] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [size] = useState("large");

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await getRequest("http://localhost:8080", "/pacientes");
        setPacientes(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (showList) {
      fetchPacientes();
    }
  }, [showList]);

  const handleListClick = () => {
    setShowList(true);
    setShowForm(false);
  };

  const handleFormClick = () => {
    setShowList(false);
    setShowForm(true);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="logo" />  
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Sobre</Menu.Item>
          <Menu.Item key="3">Contato</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Pacientes">
              <Menu.Item key="1" onClick={handleListClick}>
                Listar
              </Menu.Item>
              <Menu.Item key="2" onClick={handleFormClick}>
                Cadastrar
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Sistema">
              <Menu.Item key="5">Opção 1</Menu.Item>
              <Menu.Item key="6">Opção 2</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<NotificationOutlined />}
              title="Notificações"
            >
              <Menu.Item key="9">Alerta 1</Menu.Item>
              <Menu.Item key="10">Alerta 2</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {showList && (
              loading ? (
                <Spin tip="Carregando..." />
              ) : error ? (
                <Alert message="Erro ao carregar os dados" type="error" />
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={pacientes}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.nome}
                        description={`Idade: ${item.idade} | Gênero: ${item.sexo}`}
                      />
                      <div>
                        <Button
                          type="primary"
                          icon={<EditOutlined />}
                          size={size}
                          style={{ marginRight: '10px' }}
                        />
                        <Button
                          type="danger"
                          icon={<DeleteOutlined />}
                          size={size}
                        />
                      </div>
                    </List.Item>
                  )}
                />
              )
            )}
            {showForm && (
              <Form layout="vertical">
                <Form.Item label="Nome">
                  <Input placeholder="Nome do paciente" />
                </Form.Item>
                <Form.Item label="Idade">
                  <Input type="number" placeholder="Idade do paciente" />
                </Form.Item>
                <Form.Item label="Gênero">
                  <Input placeholder="Gênero do paciente" />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Cadastrar
                </Button>
              </Form>
            )}
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        VitaLabs ©2023 Criado por Alguns alunos
      </Footer>
    </Layout>
  );
};

export default HomePage;
