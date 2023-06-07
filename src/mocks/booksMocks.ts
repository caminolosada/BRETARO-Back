import { Types } from "mongoose";
import { type BookDocumentStructure } from "../types/types";

const booksMock: BookDocumentStructure[] = [
  {
    _id: new Types.ObjectId("647711a81beb7e30d69afe00"),
    title: "El desorden que dejas",
    author: "Carlos Montero",
    frontPage:
      "https://res.cloudinary.com/dg1skxpqt/image/upload/v1685524428/el-desorden_xvuti4.webp",
    publicationYear: "2016",
    editorial: "Espasa",
    status: true,
    rating: 4,
    destination: "keep",
    cosmos:
      "Entre los misterios de un pueblo y la intriga de un instituto, las vidas de dos mujeres se entrelazan en un peligroso juego.",
  },
  {
    _id: new Types.ObjectId(),
    title: "La ridícula idea de no volver a verte",
    author: "Rosa Montero",
    frontPage:
      "https://res.cloudinary.com/dg1skxpqt/image/upload/v1685524636/9788432239939_nbrsas.webp",
    publicationYear: "2013",
    editorial: "Seix Barral",
    status: true,
    rating: 5,
    destination: "keep",
    cosmos:
      "Morir es una experiencia única y fascinante y también algo muy divertido, aunque no para el muerto, lógicamente.",
  },
];

export default booksMock;
