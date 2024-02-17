import { Router } from 'express';
import {TypesUser } from '../model/TypesUser.js'

export const getTypesUser = async (req, res) => {
  const types = await TypesUser.findAll({
    attributes: { exclude: ["status"] },
    where: { status: false },
  });
  if (!types) {
    return res.status(401).json({ message: "there is not data" });
  }
  res.status(200).json({ type: types });
};

export const store = async (req, res) => {
    try {
        const { type } = req.body;
        if (!type) {
          res.status(401).json({ message: "No se permiten campos vacios" });
        } else {
          const tp = await TypesUser.create({
            type: type,
          });
          res.status(201).json({ message: "Create sucessfull", type: tp });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export  const update = async(req, res)=>{
  try {
      const id = req.params.id;
      const {type} =req.body
      if(!type){
          return res.status(401).json({ message: "No se pueden imprimir campos vacios"});
      }
      const typeFinded = await TypesUser.findByPk(id);
      if (typeFinded) {
          typeFinded.set({type});
          typeFinded.save();
         return res.status(200).json({message:'Actualizado Correctamente' })
      }else{
          return res.status(404).json({ message: "not type found"})
      }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export  const delet = async (req, res)=>{
  try {
      const id = req.params.id;
      const typeFinded = await TypesUser.findByPk(id);
      if (typeFinded) {
          typeFinded.set({status :true});
          typeFinded.save();
         return res.status(200).json({message:'Eliminado Correctamente' })
      }else{
          return res.status(404).json({ message: "not type found"})
      }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}