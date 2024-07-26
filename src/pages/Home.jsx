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
import PacienteFormEdit from "../components/PacienteFormEdit";

import MedicoCard from "../components/MedicoCard";
import MedicoForm from "../components/MedicoForm";
import MedicoFormEdit from "../components/MedicoFormEdit";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const HomePage = () => {
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("pacientes");
  const [editingPaciente, setEditingPaciente] = useState(null);
  const [editingMedico, setEditingMedico] = useState(null);

  const fetchData = async (type) => {
    try {
      setLoading(true);
      const data = await getRequest(type);
      type === "pacientes" ? setPacientes(data) : setMedicos(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error(`Erro ao listar ${type}: `, error);
    }
  };

  useEffect(() => {
    if (view === "pacientes") {
      fetchData("pacientes");
    } else if (view === "medicos") {
      fetchData("medicos");
    }
  }, [view]);

  const handleViewChange = (newView) => {
    setView(newView);
    setEditingPaciente(null);
    setEditingMedico(null);
  };

  const handleEditPaciente = (paciente) => {
    setEditingPaciente(paciente);
    setView("editPaciente");
  };

  const handleEditMedico = (medico) => {
    setEditingMedico(medico);
    setView("editMedico");
  };

  const handleEditClose = () => {
    setEditingPaciente(null);
    setEditingMedico(null);
    setView("pacientes");
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
              <Menu.Item key="1" onClick={() => handleViewChange("pacientes")}>
                Listar
              </Menu.Item>
              <Menu.Item key="2" onClick={() => handleViewChange("formPaciente")}>
                Cadastrar
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UserOutlined />} title="Medicos">
              <Menu.Item key="3" onClick={() => handleViewChange("medicos")}>
                Listar
              </Menu.Item>
              <Menu.Item key="4" onClick={() => handleViewChange("formMedico")}>
                Cadastrar
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<LaptopOutlined />} title="Sistema">
              <Menu.Item key="5">Opção 1</Menu.Item>
              <Menu.Item key="6">Opção 2</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
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
            {view === "pacientes" ? (
              loading ? (
                <Spin tip="Carregando..." />
              ) : error ? (
                <Alert message="Erro ao carregar os dados" type="error" />
              ) : (
                <div>
                  {pacientes.map((paciente) => (
                    <PacienteCard
                      key={paciente.id}
                      paciente={paciente}
                      onEdit={handleEditPaciente}
                    />
                  ))}
                </div>
              )
            ) : view === "formPaciente" ? (
              <PacienteForm />
            ) : view === "editPaciente" ? (
              <PacienteFormEdit
                paciente={editingPaciente}
                onClose={handleEditClose}
              />
            ) : view === "medicos" ? (
              loading ? (
                <Spin tip="Carregando..." />
              ) : error ? (
                <Alert message="Erro ao carregar os dados" type="error" />
              ) : (
                <div>
                  {medicos.map((medico) => (
                    <MedicoCard
                      key={medico.id}
                      medico={medico}
                      onEdit={handleEditMedico}
                    />
                  ))}
                </div>
              )
            ) : view === "formMedico" ? (
              <MedicoForm />
            ) : view === "editMedico" ? (
              <MedicoFormEdit
                medico={editingMedico}
                onClose={handleEditClose}
              />
            ) : null}
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
