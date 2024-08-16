import React, { useEffect, useState } from "react";
import { Form, Button, DatePicker, message, TimePicker, Card, Spin } from "antd";
import { postRequest, getRequest } from "../api/api"; 
import moment from "moment";

const ConsultaForm = () => {
  const [form] = Form.useForm();
  const [medicoId, setMedicoId] = useState(null);
  const [pacienteId, setPacienteId] = useState(null);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loadingMedicos, setLoadingMedicos] = useState(true);
  const [loadingPacientes, setLoadingPacientes] = useState(true);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const data = await getRequest("medicos");
        setMedicos(data);
        setLoadingMedicos(false);
      } catch (error) {
        message.error("Erro ao carregar médicos.");
        setLoadingMedicos(false);
      }
    };

    const fetchPacientes = async () => {
      try {
        const data = await getRequest("pacientes");
        setPacientes(data);
        setLoadingPacientes(false);
      } catch (error) {
        message.error("Erro ao carregar pacientes.");
        setLoadingPacientes(false);
      }
    };

    fetchMedicos();
    fetchPacientes();
  }, []);

  const handleSubmit = async (values) => {
    const { dataConsulta, horaConsulta } = values;
    const dataHoraConsulta = moment(dataConsulta)
      .set({
        hour: horaConsulta.hour(),
        minute: horaConsulta.minute(),
      })
      .toISOString();

    const consultaData = {
      medico_id: medicoId,
      paciente_id: pacienteId,
      dataHoraConsulta: dataHoraConsulta,
    };

    console.log("Dados da consulta:", consultaData);

    try {
      const data = await postRequest("consultas", consultaData);
      console.log(data);
      message.success("Consulta cadastrada com sucesso!");
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Erro ao cadastrar consulta. Tente novamente.");
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item label="Selecione o Médico">
        {loadingMedicos ? (
          <Spin tip="Carregando médicos..." />
        ) : (
          medicos.map((medico) => (
            <Card
              key={medico.id}
              onClick={() => setMedicoId(medico.id)}
              title={medico.nome}
              style={{
                marginBottom: "16px",
                cursor: "pointer",
                border: medicoId === medico.id ? "2px solid #1890ff" : "",
              }}
            >
              <p>Especialidade: {medico.especialidade}</p>
            </Card>
          ))
        )}
      </Form.Item>
      <Form.Item label="Selecione o Paciente">
        {loadingPacientes ? (
          <Spin tip="Carregando pacientes..." />
        ) : (
          pacientes.map((paciente) => (
            <Card
              key={paciente.id}
              onClick={() => setPacienteId(paciente.id)}
              title={paciente.nome}
              style={{
                marginBottom: "16px",
                cursor: "pointer",
                border: pacienteId === paciente.id ? "2px solid #1890ff" : "",
              }}
            >
              <p>Idade: {paciente.dataNascimento}</p>
            </Card>
          ))
        )}
      </Form.Item>
      <Form.Item
        label="Data da Consulta"
        name="dataConsulta"
        rules={[{ required: true, message: "Por favor, selecione a data da consulta!" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Hora da Consulta"
        name="horaConsulta"
        rules={[{ required: true, message: "Por favor, selecione a hora da consulta!" }]}
      >
        <TimePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={!medicoId || !pacienteId}>
          Agendar Consulta
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ConsultaForm;
