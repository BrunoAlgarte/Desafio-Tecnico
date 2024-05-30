const router = require('express').Router();
const Funcionario = require('../models/Funcionario');

// Rota POST para criar um novo funcionário
router.post('/', async (req, res) => {
    const { nome, cargo, salario, desligado } = req.body;

    if (!nome || !cargo || !salario || desligado === undefined) {
        return res.status(422).json({ error: 'Informar um nome, cargo, salario e estado de desligado é obrigatório' });
    }

    const funcionario = {
        nome,
        cargo,
        salario,
        desligado,
    };

    try {
        await Funcionario.create(funcionario);
        res.status(201).json({ message: 'Funcionário cadastrado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota GET para listar todos os funcionários
router.get('/', async (req, res) => {
    try {
        const funcionarios = await Funcionario.find();
        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota GET para listar um funcionário específico
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const funcionario = await Funcionario.findById(id);

        if (!funcionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        res.status(200).json(funcionario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota PUT para atualizar um funcionário
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, cargo, salario, desligado } = req.body;

    const funcionario = {
        nome,
        cargo,
        salario,
        desligado,
    };

    try {
        const updatedFuncionario = await Funcionario.findByIdAndUpdate(id, funcionario, { new: true });

        if (!updatedFuncionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        res.status(200).json(updatedFuncionario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota DELETE para deletar um funcionário
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFuncionario = await Funcionario.findByIdAndDelete(id);

        if (!deletedFuncionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        res.status(200).json({ message: 'Funcionário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
