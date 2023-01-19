import * as db_data from "../database/global.db";
import * as _g from "../_g";

export let index = async (req, res, next) => {
  let obj: any = {
    data: _g.global_data,
    hbd_dollar_price: _g.hbd_dollar_price,
    hive_dollar_price: _g.hive_dollar_price,
  };

  return res.status(200).send(obj);
};
