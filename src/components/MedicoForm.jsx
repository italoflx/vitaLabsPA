import React from "react";
import { Form, Input, Button, message } from "antd";
import { postRequest } from "../api/api";

const MedicoForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log("Dados do médico:", values);
    try {
      const data = await postRequest("medicos", values);
      console.log(data);
      message.success('Médico cadastrado com sucesso!');
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Erro ao cadastrar médico. Tente novamente.');
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item
        label="Nome"
        name="nome"
        rules={[{ required: true, message: 'Por favor, insira o nome do médico' }]}
      >
        <Input placeholder="Nome do médico" />
      </Form.Item>
      <Form.Item
        label="Contato"
        name="contato"
        rules={[{ required: true, message: 'Por favor, insira o contato do médico' }]}
      >
        <Input placeholder="Contato do médico" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Por favor, insira o email do médico' },
          { type: 'email', message: 'O email deve ser válido' }
        ]}
      >
        <Input placeholder="Email do médico" />
      </Form.Item>
     
      <Form.Item
        label="CRM"
        name="crm"
        rules={[{ required: true, message: 'Por favor, insira o CRM do médico' }]}
      >
        <Input placeholder="CRM do médico" />
      </Form.Item>
      <Form.Item
        label="Especialidade"
        name="especialidade"
        rules={[{ required: true, message: 'Por favor, insira a especialidade do médico' }]}
      >
        <Input placeholder="Especialidade do médico" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Cadastrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MedicoForm;
