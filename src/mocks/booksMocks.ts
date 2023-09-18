import { Types } from "mongoose";
import {
  type BookStructure,
  type BookDocumentStructure,
  type BookToUpdateStructure,
} from "../types/types";

export const booksMock: BookDocumentStructure[] = [
  {
    _id: new Types.ObjectId("647711a81beb7e30d69afe00"),
    title: "El desorden que dejas",
    author: "Carlos Montero",
    frontPage:
      "https://res.cloudinary.com/dg1skxpqt/image/upload/v1685524428/el-desorden_xvuti4.webp",
    publicationYear: "2016",
    editorial: "Espasa",
    status: "read",
    rating: 4,
    destination: "keep",
    cosmos:
      "Entre los misterios de un pueblo y la intriga de un instituto, las vidas de dos mujeres se entrelazan en un peligroso juego.",
  },
  {
    _id: new Types.ObjectId("648703abee528da727184560"),
    title: "La ridícula idea de no volver a verte",
    author: "Rosa Montero",
    frontPage:
      "https://res.cloudinary.com/dg1skxpqt/image/upload/v1685524636/9788432239939_nbrsas.webp",
    publicationYear: "2013",
    editorial: "Seix Barral",
    status: "read",
    rating: 5,
    destination: "keep",
    cosmos:
      "Morir es una experiencia única y fascinante y también algo muy divertido, aunque no para el muerto, lógicamente.",
  },
];

export const addBookMock: BookStructure = {
  title: "La uruguaya",
  author: "Pedro Mairal",
  frontPage: "image_la_uruguaya.jpg",
  publicationYear: "2016",
  editorial: "Libros del Asteroide",
  status: "read",
  rating: 4,
  destination: "keep",
  cosmos:
    "Un escritor argentino se embarca en un viaje a Montevideo que lo llevará a cuestionarse su vida, su matrimonio y sus ambiciones literarias.",
};

export const booksMockById = [
  {
    id: "648703abee528da727184561",
    title: "El desorden que dejas",
    author: "Carlos Montero",
    frontPage:
      "https://res.cloudinary.com/dg1skxpqt/image/upload/v1685524428/el-desorden_xvuti4.webp",
    publicationYear: "2016",
    editorial: "Espasa",
    status: "read",
    rating: 4,
    destination: "keep",
    cosmos:
      "Entre los misterios de un pueblo y la intriga de un instituto, las vidas de dos mujeres se entrelazan en un peligroso juego.",
  },
  {
    id: "648703abee528da727184560",
    title: "La ridícula idea de no volver a verte",
    author: "Rosa Montero",
    frontPage:
      "https://res.cloudinary.com/dg1skxpqt/image/upload/v1685524636/9788432239939_nbrsas.webp",
    publicationYear: "2013",
    editorial: "Seix Barral",
    status: "read",
    rating: 5,
    destination: "keep",
    cosmos:
      "Morir es una experiencia única y fascinante y también algo muy divertido, aunque no para el muerto, lógicamente.",
  },
];

export const updateBookMock: BookToUpdateStructure = {
  id: "648703abee528da727184560",
  title: "La ridícula idea",
  author: "Rosa Montero",
  frontPage:
    "https://res.cloudinary.com/dg1skxpqt/image/upload/v1685524636/9788432239939_nbrsas.webp",
  publicationYear: "2013",
  editorial: "Seix Barral",
  status: "read",
  rating: 5,
  destination: "keep",
  cosmos: "Morir es una experiencia única",
};
