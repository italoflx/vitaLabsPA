import React, { useState } from "react";
import { Card, Avatar, Button, Modal, message } from "antd";
import { LuUser } from "react-icons/lu";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteRequest } from "../api/api";
import PacienteFormEdit from "./PacienteFormEdit";

const PacienteCard = ({ paciente }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteRequest("pacientes", paciente.id);
      message.success("Paciente excluído com sucesso!");
    } catch (error) {
      message.error("Erro ao excluir paciente. Tente novamente.");
    }
  };

  return (
    <>
      <Card style={{ minWidth: 300 }}>
        <Card.Meta
          avatar={<Avatar icon={<LuUser />
          } />}
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
          size="large"
          style={{ marginRight: "10px" }}
          onClick={() => setShowEditForm(true)}
        />
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          size="large"
          style={{ marginRight: "10px" }}
          onClick={() => {
            Modal.confirm({
              title: 'Tem certeza que deseja excluir este paciente?',
              onOk: handleDelete
            });
          }}
        />
      </Card>
      {showEditForm && (
        <PacienteFormEdit 
          paciente={paciente} 
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  );
};

export default PacienteCard;
