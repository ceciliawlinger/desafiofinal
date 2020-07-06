import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import { gradeModel } from '../models/gradeModel.js';

const create = async (req, res) => {
  const grade = new Grade({
    name: req.body.name,
    subject: req.body.subject,
    type: req.body.type,
    value: req.body.value,
  });

  try {
    const data = await grade.save(grade);
    res.send(data);
  } catch (error) {
    res.status(500).send('Erro ao inserir nota' + error);
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Grade.find();
    res.send(data);
  } catch (error) {
    res.status(500).send('Erro ao listar todos as notas' + error);
  }

  const findOne = async (req, res) => {
    const id = req.params.id;
    try {
      const data = await Grade.findById({ _id: id });
      res.send(data);
    } catch (error) {
      res.status(500).send(`Erro ao buscar o Grade id ${id} ${error}`);
    }
  };
  //atualiza
  const update = async (req, res) => {
    const id = req.params.id;
    try {
      const data = await Grade.findByIdAndUpdate({ _id: id }, req.body);

      if (!data) {
        res.send(`Nota id ${id} nao encontrada`);
      } else {
        res.send('Nota atualizada com sucesso');
      }
    } catch (error) {
      res.status(500).send(`Erro ao atualizar a nota id ${id} ${error}`);
    }
  };
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Grade.findByIdAndRemove({ _id: id });
    if (!data) {
      res.send(`Nota id ${id} nao encontrada`);
    } else {
      res.send('Nota excluida com sucesso');
    }
  } catch (error) {
    res.status(500).send(`Erro ao excluir a nota id ${id} ${error}`);
  }
};

const removeAll = async (req, res) => {
  try {
    const grades = await Grade.deleteMany({});
    res.send({
      message: `Grades excluidos`,
    });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
