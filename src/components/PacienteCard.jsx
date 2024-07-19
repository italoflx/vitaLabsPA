import React from "react";
import { Card, Avatar, Button } from "antd";
import { CiUser } from "react-icons/ci";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deleteRequest } from "../api/api";

const PacienteCard = ({ paciente, handleEdit }) => {
  return (
    <Card
      style={{
        minWidth: 300,
      }}
    >
      <Card.Meta
        avatar={<Avatar src={<CiUser />} />}
        title={paciente.nome}
        description={
          <>
            <p>Email: {paciente.email}</p>
            <p>Contato: {paciente.contato}</p>
          </>
        }
      />
      <Button
        type="primary"
        icon={<EditOutlined />}
        size={"large"}
        style={{ marginRight: "10px" }}
        onClick={() => handleEdit(paciente)}
      />
      <Button 
        type="danger"
        icon={<DeleteOutlined />} 
        size={"large"} 
        style={{ marginRight: "10px" }}
        onClick={() => deleteRequest("pacientes", paciente.id)}
      />
    </Card>
  );
};

export default PacienteCard;
