import React, { useState } from "react";
import { Form, Input, Button, DatePicker, message, TimePicker } from "antd";
import { postRequest } from "../api/api"; 
import moment from "moment";

const ConsultaForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const { medicoId, pacienteId, dataConsulta, horaConsulta } = values;
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
      <Form.Item
        label="ID do Médico"
        name="medicoId"
        rules={[{ required: true, message: "Por favor, insira o ID do médico!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="ID do Paciente"
        name="pacienteId"
        rules={[{ required: true, message: "Por favor, insira o ID do paciente!" }]}
      >
        <Input />
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
        <Button type="primary" htmlType="submit">
          Agendar Consulta
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ConsultaForm;
