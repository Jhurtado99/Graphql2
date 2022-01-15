const graphql = require("graphql");
const Curso = require("../models/Curso");
const Profesor = require("../models/Profesor");
const Usuario = require("../models/Usuario");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLID
} = graphql;

  const cursos = [
    {
      id: "1",
      nombre: "Patrones de diseño java",
      lenguaje: "java",
      fecha: "2021",
      profesorId: "2",
    },
    {
      id: "2",
      nombre: "Patrones de diseño Kotlin",
      lenguaje: "Kotlin",
      fecha: "2021",
      profesorId: "3",
    },
    {
      id: "3",
      nombre: "Patrones de diseño C",
      lenguaje: "C",
      fecha: "2021",
      profesorId: "2",
    },
    {
      id: "4",
      nombre: "Patrones de diseño C++",
      lenguaje: "C++",
      fecha: "2021",
      profesorId: "1",
    },
  ];

const profesores = [
  {
    id: "1",
    nombre: "Jose",
    edad: 22,
    estado: true,
    fecha: 2017,
  },
  {
    id: "2",
    nombre: "Maria",
    edad: 25,
    estado: true,
    fecha: 2018,
  },
  {
    id: "3",
    nombre: "Olga",
    edad: 50,
    estado: true,
    fecha: 2010,
  },
  {
    id: "4",
    nombre: "Jaime",
    edad: 61,
    estado: false,
    fecha: 2000,
  },
];

const Usuarios = [
  {
    id: "1",
    nombre: "Jose",
    email: "jose@gmail.com",
    password: "123456",
  },
  {
    id: "2",
    nombre: "Ana",
    email: "ana@gmail.com",
    password: "123456",
  },
  {
    id: "3",
    nombre: "Juan",
    email: "juan@gmail.com",
    password: "123456",
  },
  {
    id: "1",
    nombre: "juana",
    email: "juana@gmail.com",
    password: "123456",
  },
];

const CursoType = new GraphQLObjectType({
  name: "Curso",
  fields: () => ({
    id: { type: GraphQLString },
    nombre: { type: GraphQLString },
    lenguaje: { type: GraphQLString },
    fecha: { type: GraphQLString },
    profesor: {
      type: ProfesorType,
      resolve(parent, args) {
        return Profesor.findById(parent.profesorId)
      },
    },
  }),
});

const ProfesorType = new GraphQLObjectType({
  name: "Profesor",
  fields: () => ({
    id: { type: GraphQLString },
    nombre: { type: GraphQLString },
    edad: { type: GraphQLInt },
    estado: { type: GraphQLBoolean },
    fecha: { type: GraphQLString },
    cursos: {
      type: new GraphQLList(CursoType),
      resolve(parent, args) {
        return Curso.findById(parent.id);
      },
    },
  }),
});

const UsuarioType = new GraphQLObjectType({
  name: "Usuario",
  fields: () => ({
    id: { type: GraphQLString },
    nombre: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    curso: {
      type: CursoType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return Curso.findById(args.id)
        // return cursos.find((curso) => curso.id === args.id);
      },
    },
    cursos: {
      type: new GraphQLList(CursoType),
      resolve() {
        return Curso.find();
      },
    },
    profesor: {
      type: ProfesorType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return Profesor.findById(args.id)
      },
    },
    profesores: {
      type: new GraphQLList(ProfesorType),
      resolve() {
        return Profesor.find();
      },
    },
    usuario: {
      type: UsuarioType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return Usuario.findById(args.id)
      },
    },
    usuarios: {
      type: new GraphQLList(UsuarioType),
      resolve() {
        return Usuario.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    AgregarCurso: {
      type: CursoType,
      args: {
        nombre: { type: GraphQLString },
        lenguaje: { type: GraphQLString },
        fecha: { type: GraphQLString },
        profesorId: { type: GraphQLID }
      },
      async resolve(parent, args){
        const curso = new Curso({
          nombre: args.nombre,
          lenguaje: args.lenguaje,
          fecha: args.fecha,
          profesorId: args.profesorId
        })
        return await curso.save()
      }
    },
    ActualizarCurso: {
      type: CursoType,
      args: {
        id: { type: GraphQLID },
        nombre: { type: GraphQLString },
        lenguaje: { type: GraphQLString },
        fecha: { type: GraphQLString },
        profesorId: { type: GraphQLID }
      },
      async resolve(parent, args){
        return Curso.findByIdAndUpdate(args.id,{
          nombre: args.nombre,
          lenguaje: args.lenguaje,
          fecha: args.fecha,
          profesorId: args.profesorId
        },{
          new: true
        })
      }
    },
    AgregarProfesor: {
      type: ProfesorType,
      args: {
        nombre: { type: GraphQLString },
        edad: { type: GraphQLInt },
        estado: {type: GraphQLBoolean},
        fecha: { type: GraphQLString }
      },
      resolve(parent, args){
        const profesor = new Profesor({
          nombre: args.nombre,
          edad: args.edad,
          estado: args.estado,
          fecha: args.fecha,
        })
        return profesor.save()
      }
    },
    Agregarusuario: {
      type: UsuarioType,
      args: {
        nombre: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString}
      },
      resolve(parent, args){
        const usuario = new Usuario({
          nombre: args.nombre,
          email: args.email,
          password: args.password
        })
        return usuario.save()
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery, 
  mutation: Mutation
});
