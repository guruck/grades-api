import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const GradeStudent = db.model;

const create = async (req, res) => {
  try {
    const student = new GradeStudent(req.body);
    await student.save();
    res.send(student);
    logger.info(`POST /grade - ${JSON.stringify(student)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const student = await GradeStudent.find(condition);
    res.send(student);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const student = await GradeStudent.findOne({ _id: id });
    res.send(student);

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const student = await GradeStudent.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    // res.send({ message: 'Grade atualizado com sucesso' });
    res.send(student);

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  logger.info(`DELETE /grade - ${id}`);
  try {
    const data = await GradeStudent.findByIdAndRemove({ _id: id });
    if (!data) {
      res.send(`Podcast id ${id} nao encontrado`);
      logger.info(`grade - ${id} nao encontrado`);
    } else {
      res.send({ message: 'Grade excluido com sucesso' });
      logger.info(`DELETE /grade - ${id} sucessfuly`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    const data = await GradeStudent.remove({});
    res.send({
      message: `Grades excluidos ${data}`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
