const label_service = require("../services/label.js");
const user_service = require("../services/user.js");

const find_label_all = async (_req, res) => {
  try {
    const label = await label_service.find_label_all();
    label.forEach((item) => {
      let array = item["dataValues"]["date"].split(" ");
      let Today = new Date();
      const date1 = new Date(array[0]);
      const date2 = new Date(
        Today.getFullYear() +
          "-" +
          (Today.getMonth() + 1) +
          "-" +
          Today.getDate()
      );
      const diff_time = Math.abs(date2 - date1);
      const diff_days = Math.ceil(diff_time / (1000 * 60 * 60 * 24));
      let date = array[0] + " - " + diff_days;
      //
      if (diff_days >= 2) {
        date += " days ago";
      } else {
        date += " day ago";
      }

      const name = item["dataValues"]["User"]["dataValues"]["name"];
      const mail = item["dataValues"]["User"]["dataValues"]["mail"];
      item["dataValues"]["name"] = name;
      item["dataValues"]["mail"] = mail;
      item["dataValues"]["date"] = date;
      delete item["dataValues"]["User"];
    });

    //printer狀態
    const printer_state = await label_service.printer_state();
    return res
      .status(200)
      .json({ message: label, printer_state: printer_state });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const create_label = async (req, res) => {
  try {
    if (!req.body.date || !req.body.cardId) {
      return res.status(403).json({ message: "Information missing" });
    } else {
      const is_user = await user_service.is_user(req.body);
      if (is_user) {
        const final_id = await label_service.last_id();
        let data_id = "";
        if (!final_id) {
          data_id = "001";
        } else if (final_id.id > 0 && final_id.id + 1 < 10) {
          data_id = "00" + String(final_id.id + 1);
        } else if (final_id.id + 1 >= 10 && final_id.id + 1 < 100) {
          data_id = "0" + String(final_id.id + 1);
        } else if (final_id.id + 1 >= 100 && final_id.id + 1 < 1000) {
          data_id = String(final_id.id + 1);
        } else {
          data_id = String(final_id.id + 1).slice(-3);
        }

        req.body.dataId = data_id;
        req.body.userId = is_user.id;
        req.body.username = is_user.name;

        const label = await label_service.create_label(req.body);
        if (label) {
          return res.status(201).json({
            labelId: label["dataValues"]["labelId"],
            name: label.name,
          });
        }
      } else {
        return res.status(403).json({ message: "User does not exist" });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const update_label = async (req, res) => {
  const id = await label_service.have_id(req.body.id);
  try {
    if (/^\d+$/.test(req.body.id) && id) {
      const update_label = await label_service.update_label(req.body);
      if (update_label) {
        return res.status(200).json({ message: "Edited successfully" });
      }
    } else {
      return res.status(417).json({ message: "Failed to execute" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const delete_label = async (req, res) => {
  try {
    if (!req.body.labelId) {
      return res.status(403).json({ message: "Information missing" });
    }

    const delete_label = await label_service.delete_label(req.body["labelId"]);
    if (delete_label) {
      return res.status(200).json({ message: "Deleted successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const printer_state_change = async (req, res) => {
  try {
    if (!req.body.printerState) {
      return res.status(403).json({ message: "Information missing" });
    }

    await label_service.printer_state_change(req.body);
    return res.status(201).json({ message: "State change successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  find_label_all,
  create_label,
  delete_label,
  update_label,
  printer_state_change,
};
