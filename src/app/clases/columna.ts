import { Expresion } from "./expresion";

import { Catalogo } from "./catalogo";

import { Entidad } from "./entidad";

export class Columna {
    id?: number;
    nombre?: string;
    esRequerido?: boolean;
    tipo?:'catalogo' | 'boolean' | 'string' | 'number' | 'columna' | 'expresion';
    expresion?: Expresion;
    catalogo?: Catalogo;
    entidad?:Entidad;
}
