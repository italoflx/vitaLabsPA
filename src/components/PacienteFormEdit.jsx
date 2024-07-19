import React, { useEffect } from "react";
import { Form, Input, Button, message, DatePicker } from "antd";
import { putRequest } from "../api/api"; 
import moment from "moment";

const PacienteFormEdit = ({ paciente, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (paciente) {
      form.setFieldsValue({
        id: paciente.id, // Adiciona o ID ao estado do formulário
        nome: paciente.nome,
        cpf: paciente.cpf,
        sexo: paciente.sexo,
        dataNascimento: paciente.dataNascimento ? moment(paciente.dataNascimento) : null,
        altura: paciente.altura,
        peso: paciente.peso,
        contato: paciente.contato,
        email: paciente.email,
      });
    }
  }, [paciente, form]);

  const handleSubmit = async (values) => {
    try {
      // Remove o campo id do objeto de dados antes de enviá-lo
      const { id, ...data } = values;
      const response = await putRequest(`pacientes/${id}`, data);
      console.log(response);
      message.success('Paciente atualizado com sucesso!');
      form.resetFields();
      if (onClose) onClose();
    } catch (error) {
      console.error(error);
      message.error('Erro ao atualizar paciente. Tente novamente.');
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
          Atualizar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PacienteFormEdit;
