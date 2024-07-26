import React, { useState } from "react";
import { Card, Avatar, Button, Modal, message } from "antd";
import { LuUser } from "react-icons/lu";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteRequest } from "../api/api";
import MedicoFormEdit from "./MedicoFormEdit";

const MedicoCard = ({ medico }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async () => {
    try {
      console.log(medico)
      await deleteRequest("medicos", medico.id);
      message.success("Médico excluído com sucesso!");
    } catch (error) {
      message.error("Erro ao excluir médico. Tente novamente.");
    }
  };

  return (
    <>
      <Card style={{ minWidth: 300 }}>
        <Card.Meta
          avatar={<Avatar icon={<LuUser />} />}
          title={medico.nome}
          description={
            <>
              <p>Email: {medico.email}</p>
              <p>Contato: {medico.contato}</p>
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
              title: "Tem certeza que deseja excluir este médico?",
              onOk: handleDelete,
            });
          }}
        />
      </Card>
      {showEditForm && (
        <MedicoFormEdit
          medico={medico}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  );
};

export default MedicoCard;
