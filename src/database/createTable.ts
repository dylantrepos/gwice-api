import sequelize from "./getConnexion";

export const initTable = async () => {
  console.log("[Database] ⌛ Creating table ...");
  try {
    for (const model of Object.values(sequelize.models)) {
      await model.sync({ force: true });
      console.log(
        `[Database] ✅ Table ${model.tableName} successfully created`
      );
    }
    console.log("[Database] ✅ Tables successfully created\n");
  } catch (error) {
    console.log("[Database] ❌ Error creating tables : ", error);
  }
};
