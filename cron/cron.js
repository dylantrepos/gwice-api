const axios = require("axios");
const { Sequelize, DataTypes } = require("sequelize");
const { config } = require("dotenv");
config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

const initCron = async () => {
  const requestUrl =
    "https://api.openagenda.com/v2/agendas/89904399/events?key=b139873be49e4eaf8802204829301bb2&detailed=1&includeLabels=true&size=20&state=2";

  const axiosRequest = await axios.get(requestUrl);
  const data = axiosRequest.data;
  const eventExample = data.events[0];

  const Event = require("../models/cityevent")(sequelize, DataTypes);
  const Adress = require("../models/cityeventadress")(sequelize, DataTypes);
  const Category = require("../models/cityeventcategory")(sequelize, DataTypes);
  const State = require("../models/cityeventstate")(sequelize, DataTypes);
  const Status = require("../models/cityeventstatus")(sequelize, DataTypes);
  const Timings = require("../models/cityeventtimings")(sequelize, DataTypes);

  const event = await Event.create({
    openAgendaUid: eventExample.uid,
    title: eventExample.title["fr"],
    shortDescription: eventExample.description["fr"],
    longDescription: eventExample.longDescription["fr"],
    price: eventExample.conditions["fr"],
    imageUrl: eventExample.image.base + eventExample.image.filename,
    minimumAge: eventExample.age.min,
    eventUrl: eventExample.links[0]?.link ?? null,
    openAgendaCreatedAt: eventExample.createdAt,
    openAgendaUpdatedAt: eventExample.updatedAt,
    openAgendaUserUid: eventExample.creatorUid,
  });

  console.log("axiosRequest : ", eventExample);
  console.log("event : ", event);
};

initCron();
