import React from "react";
import { Form, Input, Button } from "antd";

const PacienteForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onSubmit(values);
    console.log(values)
    form.resetFields();
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Por favor, insira o nome do paciente' }]}>
        <Input placeholder="Nome do paciente" />
      </Form.Item>
      <Form.Item label="Data de Nascimento" name="dataNascimento" rules={[{ required: true, message: 'Por favor, insira a data de nascimento do paciente' }]}>
        <Input type="date" placeholder="Data de Nascimento" />
      </Form.Item>
      <Form.Item label="Gênero" name="sexo" rules={[{ required: true, message: 'Por favor, insira o gênero do paciente' }]}>
        <Input placeholder="Gênero do paciente" />
      </Form.Item>
      <Form.Item label="Altura" name="altura" rules={[{ required: true, message: 'Por favor, insira a altura do paciente' }]}>
        <Input type="number" placeholder="Altura do paciente" />
      </Form.Item>
      <Form.Item label="Peso" name="peso" rules={[{ required: true, message: 'Por favor, insira o peso do paciente' }]}>
        <Input type="number" placeholder="Peso do paciente" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Cadastrar
      </Button>
    </Form>
  );
};

export default PacienteForm;
