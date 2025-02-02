import express from 'express';
import User from '../../modelos/usuarios/usuariosModel.js';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { uploadToCloudinary } from '../../config/cloudinary.js';
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
            const { body } = req;
            const filePath = req.file?.path;  // Get the uploaded file path from multer
            
            // Pass the user data and filePath to the User model
            const user = await User.create(body, filePath);
            
            res.status(201).json({ message: "Usuario agregado exitosamente", user });
        } catch (error) {
            console.error('Error creating user:', error);
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
            const { body } = req; // Extract user data from the request body
            const { id } = req.params; // Extract user ID from the route parameters
            const filePath = req.file?.path; // Get the uploaded file path from multer
    
            // Pass the user data, file path, and ID to the User model's update method
            const updatedUser = await User.update(id, body, filePath);
    
            res.status(200).json({ message: "Usuario actualizado exitosamente", user: updatedUser });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Error del servidor', error: error.message });
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

}

export default AutenticationController;
