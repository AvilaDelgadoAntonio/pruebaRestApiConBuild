"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const autos_1 = require("../model/autos");
const database_1 = require("../database/database");
class DatoRoutes {
    constructor() {
        this.getAutos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield autos_1.Autos.find({});
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getPlaca = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            console.log(req.params);
            //res.send('Me has dado la matrícula: ${matricula}')
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield autos_1.Autos.find({ "_matricula": matricula });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.crearAuto = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _tipoObjeto, _precioBase, _potenciaMotor, _matricula } = req.body;
            console.log(req.body);
            //res.send('Me has dado la matrícula: ${matricula}')
            yield database_1.db.conectarBD();
            res.send(`Me has dado un objeto tipo ${_tipoObjeto}`);
            const dSchema = {
                _tipoObjeto: _tipoObjeto,
                _precioBase: parseInt(_precioBase),
                _potenciaMotor: parseInt(_potenciaMotor),
                _matricula: _matricula,
            };
            console.log(dSchema);
            const oSchema = new autos_1.Autos(dSchema);
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
            })
                .catch((err) => {
                console.log('Error: ' + err); // concatenando con cadena muestra mensaje  
            });
            yield database_1.db.desconectarBD();
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/autos', this.getAutos);
        this._router.get('/autos/:matricula', this.getPlaca);
        this._router.post('/auto', this.crearAuto);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.routes = obj.router;
