import { client } from "../mongo/connection";
import { addEventsCulturalToMongo } from "../mongo/culturalEventsMongo";
import { getExecutionTimeDuration } from "../utils/utils";

export const cron = async () => {
  await client.connect();

  console.log('[CRON] ⌛ starting... ');
  
  const startTime = Date.now();
  const collection = client.db("gwice").collection('lille');


  const culturalsEventLastUpdate = await collection.findOne({}, { projection: { 'culturalEvents.lastUpdate': 1 } });
  const isLastUpdateToday = new Date(culturalsEventLastUpdate?.culturalEvents.lastUpdate ?? 0).getDate() === new Date().getDate();

  if (isLastUpdateToday) {
    const startTime = Date.now();
    console.log(`[addEventsCulturalToMongo][month] ⌛ starting...`)
    await addEventsCulturalToMongo('lille', 'month', client);
    const endTime = Date.now();
    const executionTime = (endTime - startTime) / 1000;
    console.log(`[addEventsCulturalToMongo][month] ✅ Done ! Execution time: ${getExecutionTimeDuration(executionTime)}`);

    // for(const when of timeQueries) {
    //   const startTime = Date.now();
    //   console.log(`[addEventsCulturalToMongo][${when}] ⌛ starting...`)
    //   await addEventsCulturalToMongo('lille', when, client);
    //   const endTime = Date.now();
    //   const executionTime = (endTime - startTime) / 1000;
    //   console.log(`[addEventsCulturalToMongo][${when}] ✅ Done ! Execution time: ${getExecutionTimeDuration(executionTime)}`);
    //   console.log('')
    // };

    await collection.updateOne(
      { name: 'lille' }, // filter
      { $set: { 'culturalEvents.lastUpdate': Date.now() }}, // update
      { upsert: true } // options
    );
  } else {
    console.log('[culturalEvents] data already updated today');
  }

  const endTime = Date.now();
  const executionTime = (endTime - startTime) / 1000;
  logCronDuration(executionTime);

  await client.close();
}

const logCronDuration = (executionTime: number) => {

  let timeMessage = getExecutionTimeDuration(executionTime);

  console.log(`[CRON] ✅ Done ! Execution time: ${timeMessage}`);
}