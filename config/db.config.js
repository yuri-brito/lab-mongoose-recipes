import mongoose from "mongoose";
import Recipe from "../models/Recipe.model.js";
import data from "../data.json" assert { type: "json" };
async function connect() {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`conectado ao nosso DB:${dbConnect.connection.name}`);
    const deleteMany = await Recipe.deleteMany();
    const createRecipe = await Recipe.create({
      title: "Asian Glazed Chicken Thigh",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs",
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu",
    });
    console.log(createRecipe.title);
    const insertMany = await Recipe.insertMany(data);
    insertMany.forEach((element) => {
      console.log(element.title);
    });
    const findOneAndUpdate = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    console.log("Atualizado com sucesso");
    const deleteOne = await Recipe.deleteOne({ title: "Carrot Cake" });
    await dbConnect.connection.close();
  } catch (error) {
    console.log(error);
  }
}
export default connect;
