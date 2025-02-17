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
        const updatedProject = await Project.selectById(id);//se busca el id del proyecto a actualizar llamando a la función selectById
        res.json({ message: 'Project update succesfull', updatedProject });
    } catch (error) {
        next(error);
    }
}

const projectExists = async (req, res, next) => {
    const { id } = req.params;

    try {
        const project = await Project.selectById(id);
        return true;
    } catch (error) {
        next(error);
        return false;
    }
}

module.exports = {
    deleteProjectById, updateProjectById, projectExists
};
