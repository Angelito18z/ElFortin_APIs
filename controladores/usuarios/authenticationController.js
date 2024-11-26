import express from 'express';
import User from '../../modelos/usuarios/usuariosModel.js';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

class AutenticationController {

    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json({ message: "Usuario agregado exitosamente", user });
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor', error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            return res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const user = await User.update(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const user = await User.delete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            return res.json({ codigo: 200, mensaje: 'Usuario eliminado con exito', data: user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async descargarUsuariosExcel(req, res) {
        try {
            const usuarios = await User.getUsersExcel();
            
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Usuarios');
            
            worksheet.columns = [
                { header: 'name', key: 'name', width: 15 },
                { header: 'email', key: 'email', width: 15 },
                { header: 'phone', key: 'phone', width: 20 },
                { header: 'user_type', key: 'user_type', width: 20 },
                { header: 'nickname', key: 'nickname', width: 20 }
            ];
            usuarios.forEach(usuario => {  // Fix variable name here
                worksheet.addRow(usuario);
            });
            
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=Usuarios.xlsx');
            
            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error);
            res.status(500).json({ message: 'Error del servidor', error: error.message });
        }
    }

    // Upload User Image
    static async uploadUserImage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Image upload failed' });
            }

            const userId = req.params.id;
            const imagePath = `/uploads/users/${req.file.filename}`;

            const user = await User.findById(userId);
            if (!user) {
                fs.unlinkSync(path.join('uploads/users', req.file.filename)); // Remove uploaded file
                return res.status(404).json({ message: 'User not found' });
            }

            // Update user with the new image path
            const updatedUser = await User.update(userId, { profile_image: imagePath });
            res.status(200).json({
                message: 'Image uploaded successfully',
                data: updatedUser,
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

export default AutenticationController;
