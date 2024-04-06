const axios = require("axios");
const CityEventAddress = require("../../models/cityEventModel/CityEventAdress");
const CityEventCategory = require("../../models/cityEventModel/CityEventCategory");
const {
  CityEvent,
  CityEventCityEventCategory,
  CityEventRegistration,
  CityEventStatus,
  CityEventOpenAgendaInfo,
} = require("../../models/cityEventModel");

const initOpenAgendaCityEvents = async () => {
  console.log("\n[Seeder] ⌛ Start seeding OpenAgenda city events ...\n");
  try {
    const URL =
      "https://api.openagenda.com/v2/agendas/89904399/events?key=b139873be49e4eaf8802204829301bb2&detailed=1&includeLabels=true&size=20&state=2";
    const response = await axios.get(URL);
    const events = response.data;
    // const testEvent = events.events[1];

    for (const event of events.events) {
      await addToDB(event);
    }
    // await addToDB(testEvent);

    console.log(
      "[Open Agenda] ✅ OpenAgenda city events successfully seeded\n"
    );
  } catch (error) {
    console.log(
      "[Open Agenda] ❌ Error seeding OpenAgenda city events : ",
      error
    );
  }
};
const addToDB = async (testEvent) => {
  console.log("\n[Open Agenda] ⌛ Start seeding an OpenAgenda event ...\n");
  try {
    const testEventCategoryId = testEvent["categories-metropolitaines"][0].id;
    // Avoid event with no category
    if (testEventCategoryId === 28) return;

    const [cityEventAddress, created] = await CityEventAddress.findOrCreate({
      where: {
        adress: testEvent.location.address,
        city: testEvent.location.city,
        postal_code: testEvent.location.insee,
      },
    });
    const adressId = cityEventAddress.id;
    console.log("adress success", cityEventAddress.id);

    console.log("category success", testEventCategoryId);
    const categoryDbId = await CityEventCategory.findOne({
      where: { open_agenda_id: testEventCategoryId },
    });
    console.log("categoryDbId success", categoryDbId.id);

    const statusDbId = await CityEventStatus.findOne({
      where: { status_code: testEvent.status.id.toString() },
    });

    // console.log("statusDbIdTEst success :", testEvent.status.id.toString());
    console.log("statusDbId success :", statusDbId.id);

    console.log("statusDbId success :", testEvent.id);
    const [createRegistration, createdRegistration] =
      await CityEventRegistration.findOrCreate({
        where: {
          link:
            testEvent.registration.find((r) => r.type === "link")?.value ??
            null,
          email:
            testEvent.registration.find((r) => r.type === "email")?.value ??
            null,
          phone:
            testEvent.registration.find((r) => r.type === "phone")?.value ??
            null,
        },
      });
    console.log("createRegistation", createRegistration.id);

    const createOpenAgenda = await CityEventOpenAgendaInfo.create({
      event_uid: testEvent.uid,
      creator_uid: testEvent.creatorUid,
      open_agenda_created_at: testEvent.createdAt,
      open_agenda_updated_at: testEvent.updatedAt,
    });

    const createCityEvent = await CityEvent.create({
      title: testEvent.title["fr"] ?? null,
      short_description: testEvent.description["fr"] ?? null,
      long_description:
        testEvent.longDescription["fr"] ?? testEvent.description["fr"],
      price: testEvent.conditions["fr"] ?? null,
      image_url: `${testEvent.image.base}${testEvent.image.filename}`,
      minimum_age: testEvent.age.min ?? 0,
      event_url: testEvent?.links[0]?.link ?? null,
      city_event_open_agenda_info_id: createOpenAgenda.id,
      city_event_state_id: testEvent.state,
      city_event_status_id: statusDbId.id,
      city_event_adress_id: adressId,
      city_event_registration_id: createRegistration.id,
    });
    // console.log("createCityEvent successfully created !");

    const createCategory = await CityEventCityEventCategory.create({
      city_event_id: createCityEvent.id,
      city_event_category_id: categoryDbId.id,
    });

    console.log(
      `[Open Agenda] ✅ Event ${createCityEvent.id} successfully seeded\n`
    );
  } catch (error) {
    console.log(
      "[Open Agenda] ❌ Error seeding OpenAgenda city events : ",
      error
    );
    console.log("error Event : ", testEvent);
  }
};

module.exports = initOpenAgendaCityEvents;
