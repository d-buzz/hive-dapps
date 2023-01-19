import * as globalModal from "./../models/global.model";
import * as moment from "moment";

export const update_or_create = async (global_data) => {
  let global = await globalModal.Global.find({});
  if (!global || global.length <= 0) {
    await globalModal.Global.create(global_data);
  } else {
    global[0].dau = global_data.dau;
    global[0].tx = global_data.tx;
    global[0].volume = global_data.volume;
    global[0].rewards = global_data.rewards;
    global[0].last_updated = moment.utc().toDate();
    await global[0].save();
  }
};

export const find = async () => {
  return (await globalModal.Global.find({}, { _id: 0, created: 0, __v: 0 }))[0];
};
