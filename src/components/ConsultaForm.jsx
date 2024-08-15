import React, { useState, useEffect } from "react";
import { Form, Button, DatePicker, TimePicker, message } from "antd";
import { getRequest, postRequest } from "../api/api";
import moment from "moment";

const ConsultaForm = () => {
  const [form] = Form.useForm();
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [dataConsulta, setDataConsulta] = useState(null);
  const [horaConsulta, setHoraConsulta] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicosData = await getRequest("medicos");
        setMedicos(medicosData);
        const pacientesData = await getRequest("pacientes");
        setPacientes(pacientesData);
        const horariosData = await getRequest("consultas/ocupadas");
        setHorariosOcupados(horariosData);
      } catch (error) {
        message.error("Erro ao carregar dados.");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const dataHoraConsulta = moment(dataConsulta)
      .set({
        hour: horaConsulta.hour(),
        minute: horaConsulta.minute(),
      })
      .toISOString();

    const consultaData = {
      medico_id: selectedMedico,
      paciente_id: selectedPaciente,
      dataHoraConsulta: dataHoraConsulta,
    };

    try {
      await postRequest("consultas", consultaData);
      message.success("Consulta agendada com sucesso!");
      form.resetFields();
    } catch (error) {
      message.error("Erro ao agendar consulta.");
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item label="Selecionar Médico">
        <select onChange={(e) => setSelectedMedico(e.target.value)} required>
          <option value="">Selecione um médico</option>
          {medicos.map((medico) => (
            <option key={medico.id} value={medico.id}>
              {medico.nome}
            </option>
          ))}
        </select>
      </Form.Item>
      <Form.Item label="Selecionar Paciente">
        <select onChange={(e) => setSelectedPaciente(e.target.value)} required>
          <option value="">Selecione um paciente</option>
          {pacientes.map((paciente) => (
            <option key={paciente.id} value={paciente.id}>
              {paciente.nome}
            </option>
          ))}
        </select>
      </Form.Item>
      <Form.Item label="Data da Consulta">
        <DatePicker onChange={(date) => setDataConsulta(date)} />
      </Form.Item>
      <Form.Item label="Hora da Consulta">
        <TimePicker onChange={(time) => setHoraConsulta(time)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Agendar Consulta
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ConsultaForm;
