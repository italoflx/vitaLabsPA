import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, List, Spin, Alert } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import PacientePost from "../components/PacientePost";

import { getRequest, postRequest, deleteRequest } from "../api/api";
import PacienteCard from "../components/PacienteCard";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const HomePage = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showList, setShowList] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [paciente, setPaciente] = useState({
    nome: "",
    dataNascimento: null,
    sexo: "",
    cpf: "",
    altura: "",
    peso: "",
    contato: "",
    email: "",
  });
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

  const handleSubmit = async () => {
    //e.preventDefault();
    const pacienteData = {
      nome: paciente.nome,
      dataNascimento: paciente.dataNascimento
        ? paciente.dataNascimento.format("YYYY-MM-DD")
        : null,
      sexo: paciente.sexo,
      cpf: paciente.cpf,
      altura: parseFloat(paciente.altura),
      peso: parseFloat(paciente.peso),
      contato: paciente.contato,
      email: paciente.email,
    };
    try {
      await postRequest("http://localhost:8080", "/pacientes", pacienteData);
      alert("Paciente cadastrado com sucesso!");
      setShowForm(false);
      setShowList(true);
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      alert("Erro ao cadastrar paciente");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRequest("http://localhost:8080", `/pacientes/${id}`);
      console.log("paciente deletado")
      setPacientes(pacientes.filter((paciente) => paciente.id !== id));
    } catch (err) {
      console.log("erro ao deletar paciente")
    }
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
                <List
                  itemLayout="vertical"
                  dataSource={pacientes}
                  renderItem={(item) => (
                    <List.Item>
                      <PacienteCard key={item.id} paciente={item} />
                    </List.Item>
                  )}
                />
              ))}
            {showForm && (
              <PacientePost
                paciente={paciente}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
              />
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
