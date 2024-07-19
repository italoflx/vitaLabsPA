import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, Spin, Alert } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import { getRequest } from "../api/api";
import PacienteCard from "../components/PacienteCard";
import PacienteForm from "../components/PacienteForm";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const HomePage = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showList, setShowList] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getRequest("pacientes");
      setPacientes(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error("Erro ao listar pacientes: ", error);
    }
  };

  useEffect(() => {
    if (showList) {
      fetchData();
    }
  }, [showList]);

  const handleListClick = () => {
    setShowList(true);
    setShowForm(false);
    fetchData()
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
            {showList &&
              (loading ? (
                <Spin tip="Carregando..." />
              ) : error ? (
                <Alert message="Erro ao carregar os dados" type="error" />
              ) : (
                <div>
                  {pacientes.map((paciente) => (
                    <PacienteCard key={paciente.id} paciente={paciente} />
                  ))}
                </div>
              ))}
            {showForm && (
              <PacienteForm/>
            )}
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        VitaLabs ©2024 Criado por Alguns alunos lascados que não dormem
      </Footer>
    </Layout>
  );
};

export default HomePage;
