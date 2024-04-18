import axios from "axios";

import { CityEventDetails } from "../../features/cityEvents/types/CityEvents";
import {
  CityEvent,
  CityEventCategory,
  CityEventCityEventCategory,
  CityEventCityEventTiming,
  CityEventLocation,
  CityEventOpenAgendaInfo,
  CityEventRegistration,
  CityEventStatus,
  CityEventTiming,
} from "../../models/cityEventModel/index";

let nbEventAdded = 0;
let nbEventRejected = 0;
let nbEventDone = 0;
let totalEvent = 0;
let errorEvent: any[] = [];

export const initOpenAgendaCityEvents = async () => {
  console.log("\n[Seeder] ⌛ Start seeding OpenAgenda city events ...\n");
  try {
    const URL =
      "https://api.openagenda.com/v2/agendas/89904399/events?key=b139873be49e4eaf8802204829301bb2&detailed=1&size=100&state=2&relative[]=upcoming";

    const retreiveEvent = async (currUrl = URL) => {
      const response = await axios.get(currUrl);
      const events = response.data;
      totalEvent = events.total;

      for (const event of events.events) {
        // Calculate the progress as a percentage
        const progress = Math.floor((nbEventDone / totalEvent) * 100);

        // Write the progress bar to the stdout
        console.clear();
        console.log(
          `[Open Agenda] ⌛ Progress: [${"#".repeat(progress / 2)}${"…".repeat(
            50 - progress / 2
          )}] ${progress}%`
        );
        console.log(`[Open Agenda] Done: ${nbEventDone}/${totalEvent} events`);
        console.log(`[Open Agenda] ✅ Added: ${nbEventAdded} events`);
        console.log(`[Open Agenda] 🛑 Rejected: ${nbEventRejected} events`);
        errorEvent.forEach((e) => {
          console.log(`[Open Agenda] ❌ Error : `, e, "\n");
        });
        nbEventDone++;
        await addToDB(event);
      }

      if (events.after && events.after.length > 0) {
        const afterUrl = `${URL}${events.after
          .map((e: string) => `&after[]=${e}`)
          .join("")}`;
        console.log(`\n[Open Agenda] fetching next pages... (${afterUrl})\n`);
        await retreiveEvent(afterUrl);
      }
    };

    await retreiveEvent();

    console.log(
      `[Open Agenda] ✅ ${nbEventAdded} events successfully seeded\n`
    );
  } catch (error) {
    console.log(
      "[Open Agenda] ❌ Error seeding OpenAgenda city events : ",
      error
    );
  }
};
const addToDB = async (testEvent: CityEventDetails) => {
  console.log(`[Open Agenda] ➡ Current event uid: ${testEvent.uid}...`);
  try {
    const testEventCategoryId = testEvent["categories-metropolitaines"];
    // Avoid event with no category
    if (testEventCategoryId.includes(28)) {
      nbEventRejected++;
      console.log(
        `[Open Agenda] 🛑 No category for ${testEvent.uid}, skipped...\n`
      );
      return;
    }

    if (!testEvent.image?.base) {
      nbEventRejected++;
      console.log(
        `[Open Agenda] 🛑 No image for ${testEvent.uid}, skipped...\n`
      );
      return;
    }

    const [cityEventLocation, created] = await CityEventLocation.findOrCreate({
      where: {
        adress: testEvent.location?.address ?? null,
        city: testEvent.location?.city ?? null,
        postal_code: testEvent.location?.insee ?? null,
      },
    });
    const locationId = cityEventLocation.id;
    // console.log("adress success", cityEventLocation.id);

    // console.log("category success", testEventCategoryId);
    const categoryDbsId = [];
    for (const categoryId of testEventCategoryId) {
      const categoryDbId = await CityEventCategory.findOne({
        where: { open_agenda_id: categoryId },
      });
      if (categoryDbId) categoryDbsId.push(categoryDbId.id);
      else throw new Error(`Category not found for event ${testEvent.uid}`);
    }

    // console.log("categoryDbId success", categoryDbsId);

    const statusDbId = await CityEventStatus.findOne({
      where: { status_code: testEvent.status },
    });

    if (!statusDbId)
      throw new Error(`Status not found for event ${testEvent.uid}`);

    // console.log("statusDbId success :", statusDbId.id);

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
    // console.log("createRegistation", createRegistration.id);

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
      next_timing_start_date: testEvent.nextTiming?.begin,
      city_event_open_agenda_info_id: createOpenAgenda.id,
      city_event_state_id: testEvent.state,
      city_event_status_id: statusDbId.id,
      city_event_location_id: locationId,
      city_event_registration_id: createRegistration.id,
    });

    for (const timing of testEvent.timings) {
      const [createTiming, created] = await CityEventTiming.findOrCreate({
        where: {
          start_time: new Date(timing.begin),
          end_time: new Date(timing.end),
        },
      });
      await CityEventCityEventTiming.create({
        city_event_id: createCityEvent.id,
        city_event_timing_id: createTiming.id,
      });
    }

    for (const categoryDbId of categoryDbsId) {
      const createCategory = await CityEventCityEventCategory.create({
        city_event_id: createCityEvent.id,
        city_event_category_id: categoryDbId,
      });
    }

    nbEventAdded++;
    console.log(
      `[Open Agenda] ✅ Event ${testEvent.uid} successfully added with id  ${createCityEvent.id}\n`
    );
  } catch (error) {
    errorEvent.push(error);
    console.log(
      `[Open Agenda] ❌ Error seeding OpenAgenda city event ${testEvent.uid} : \n${error}`
    );
    console.log(
      `[Open Agenda] ❌ Details Event ${testEvent.uid}: ${testEvent}`
    );
  }
};
