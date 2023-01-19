import * as _g from "../../_g";

import * as convert from "../../helpers/convert";
import * as cast from "../../helpers/cast";

// TO-DO optimize
export let update_hivepower = async (app) => {
  try {
    const array_list = convert.objects_to_arr(app.accounts, "name");
    const hivepower = { effective: 0, own: 0 };
    for (let list of array_list) {
      const accounts = await cast.get_accounts(list);
      for (let account of accounts) {
        const { effective_hivepower, own_hivepower } = await get_hivepower(
          account
        );
        if (effective_hivepower > 0 && !isNaN(effective_hivepower))
          hivepower.effective += effective_hivepower;
        if (own_hivepower > 0 && !isNaN(own_hivepower))
          hivepower.own += own_hivepower;
      }
    }
    app.hivepower = hivepower;
    app.markModified("hivepower");
    await app.save();
  } catch (error) {
    console.error("process_app", "update_hivepower", error, app.name);
  }
};

const get_hivepower = async (account) => {
  let vesting_shares = parseFloat(
    account.vesting_shares.toString().replace(" VESTS", "")
  );
  let received_vesting_shares = parseFloat(
    account.received_vesting_shares.toString().replace(" VESTS", "")
  );
  let delegated_vesting_shares = parseFloat(
    account.delegated_vesting_shares.toString().replace(" VESTS", "")
  );
  let effective_hivepower = convert.vests_to_sp(
    vesting_shares - delegated_vesting_shares + received_vesting_shares,
    _g.global_properties
  );
  let own_hivepower = convert.vests_to_sp(vesting_shares, _g.global_properties);
  return { effective_hivepower, own_hivepower };
};
