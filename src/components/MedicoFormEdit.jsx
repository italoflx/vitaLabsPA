import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { putRequest } from "../api/api";

const MedicoFormEdit = ({ medico, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (medico) {
      form.setFieldsValue({
        id: medico.id,
        nome: medico.nome,
        contato: medico.contato,
        email: medico.email,
        crm: medico.crm,
        especialidade: medico.especialidade,
      });
    }
  }, [medico, form]);

  const handleSubmit = async (values) => {
    console.log("Dados do médico a serem enviados:", values);
    try {
      const { id, ...data } = values;
      await putRequest(`medicos/${id}`, data);
      message.success('Médico atualizado com sucesso!');
      form.resetFields();
      if (onClose) onClose();
    } catch (error) {
      console.error("Erro ao atualizar médico:", error);
      message.error('Erro ao atualizar médico. Tente novamente.');
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item
        name="id"
        noStyle
      >
        <Input type="hidden" />
      </Form.Item>
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
          Atualizar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MedicoFormEdit;
