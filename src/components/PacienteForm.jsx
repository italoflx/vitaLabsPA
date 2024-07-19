import React from "react";
import { Form, Input, Button, message, DatePicker } from "antd";
import { postRequest } from "../api/api"; 

const PacienteForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log("Dados do paciente:", values);
    try {
      const data = await postRequest("pacientes", values);
      console.log(data);
      message.success('Paciente cadastrado com sucesso!');
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Erro ao cadastrar paciente. Tente novamente.');
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item
        label="Nome"
        name="nome"
        rules={[{ required: true, message: 'Por favor, insira o nome do paciente' }]}
      >
        <Input placeholder="Nome do paciente" />
      </Form.Item>
      <Form.Item
        label="CPF"
        name="cpf"
        rules={[{ required: true, message: 'Por favor, insira o CPF do paciente' }]}
      >
        <Input placeholder="CPF do paciente" />
      </Form.Item>
      <Form.Item
        label="Gênero"
        name="sexo"
        rules={[{ required: true, message: 'Por favor, insira o gênero do paciente' }]}
      >
        <Input placeholder="Gênero do paciente" />
      </Form.Item>
      <Form.Item
        label="Data de Nascimento"
        name="dataNascimento"
        rules={[{ required: true, message: 'Por favor, insira a data de nascimento do paciente' }]}
      >
        <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="Altura (m)"
        name="altura"
        rules={[{ required: true, message: 'Por favor, insira a altura do paciente' }]}
      >
        <Input type="number" step="0.01" placeholder="Altura do paciente" />
      </Form.Item>
      <Form.Item
        label="Peso (kg)"
        name="peso"
        rules={[{ required: true, message: 'Por favor, insira o peso do paciente' }]}
      >
        <Input type="number" step="0.1" placeholder="Peso do paciente" />
      </Form.Item>
      <Form.Item
        label="Contato"
        name="contato"
        rules={[{ required: true, message: 'Por favor, insira o contato do paciente' }]}
      >
        <Input placeholder="Contato do paciente" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Por favor, insira o email do paciente' },
          { type: 'email', message: 'O email deve ser válido' }
        ]}
      >
        <Input placeholder="Email do paciente" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Cadastrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PacienteForm;
