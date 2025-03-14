const Project = require("../models/projects.model");

/**
 * Elimina un proyecto de la base de datos por su ID.
 *
 * Esta función recibe un ID de proyecto desde los parámetros de la URL,
 * verifica que sea un número válido, y lo elimina de la base de datos si existe.
 * Devuelve un mensaje de éxito si la eliminación fue exitosa o un mensaje de error si el proyecto no se encuentra.
 *
 * @async
 * @function deleteProjectById
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.params - Parámetros de la URL.
 * @param {string} req.params.id - ID del proyecto a eliminar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve una respuesta JSON indicando el resultado de la operación.
 * @throws {Error} Si ocurre un error en la eliminación del proyecto.
 */
const deleteProjectById = async (req, res) => {
    const { id } = req.params;

    // Validar que el ID sea un número válido
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
    }

    try {
        const result = await Project.deleteProjectById(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project has been deleted." });
    } catch (error) {
        res.status(500).json({
            message: "Server error, please try again later.",
        });
    }
};

const updateProjectById = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Project.updateById(id, req.body);
        const updatedProject = await Project.selectById(id); //se busca el id del proyecto a actualizar llamando a la función selectById
        res.json({ message: "Project update succesfull", updatedProject });
    } catch (error) {
        next(error);
    }
};

const getAllProjects = async (req, res, next) => {
    try {
        const result = await Project.getAllProjects();

        res.json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const projectExists = async (id) => {
    //función que permite comprobar que un proyecto existe en la BBDD

    try {
        const project = await Project.selectById(id);

        if (!project) return true;

        return false;
    } catch (error) {
        next(error);
    }
};

const createNewProject = async (req, res, next) => {
    try {
        const project = await Project.selectByName(req.body.name);

        if (project) {
            return res.status(400).json({
                message: "Este proyecto ya existe",
            });
        }
        const result = await Project.createNewProject(req.body);
        res.status(200).json({
            message: "New poject created succesfuly.",
            projectId: result.insertId,
        });
    } catch (error) {
        next(error);
    }
};

const getProjectById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await Project.selectById(id);

        if (!result) {
            res.status(404).json({
                message: "Project not found",
            });
        }

        res.json({ id: result.id, name: result.name, description: result.description, start: result.start, end: result.end, status: result.status, estimatedHours: result.estimated_hours, workedHours: result.worked_hours });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    deleteProjectById,
    updateProjectById,
    getAllProjects,
    projectExists,
    createNewProject,
    getProjectById,
};
