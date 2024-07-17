import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';

const PacientePost = ({ paciente, setPaciente, handleSubmit }) => {
  return (
    <Form layout="vertical" method="POST" onFinish={handleSubmit}>
      <Form.Item label="Nome">
        <Input
          placeholder="Nome do paciente"
          value={paciente.nome}
          onChange={(e) => setPaciente({ ...paciente, nome: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Data de Nascimento">
        <DatePicker
          placeholder="Data de Nascimento do paciente"
          value={paciente.dataNascimento ? moment(paciente.dataNascimento) : null}
          onChange={(date) => setPaciente({ ...paciente, dataNascimento: date })}
        />
      </Form.Item>
      <Form.Item label="Sexo">
        <Input
          placeholder="Sexo do paciente"
          value={paciente.sexo}
          onChange={(e) => setPaciente({ ...paciente, sexo: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="CPF">
        <Input
          placeholder="CPF do paciente"
          value={paciente.cpf}
          onChange={(e) => setPaciente({ ...paciente, cpf: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Altura">
        <Input
          placeholder="Altura do paciente"
          value={paciente.altura}
          onChange={(e) => setPaciente({ ...paciente, altura: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Peso">
        <Input
          placeholder="Peso do paciente"
          value={paciente.peso}
          onChange={(e) => setPaciente({ ...paciente, peso: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Contato">
        <Input
          placeholder="Contato do paciente"
          value={paciente.contato}
          onChange={(e) => setPaciente({ ...paciente, contato: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          placeholder="Email do paciente"
          value={paciente.email}
          onChange={(e) => setPaciente({ ...paciente, email: e.target.value })}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Cadastrar
      </Button>
    </Form>
  );
};

export default PacientePost;
