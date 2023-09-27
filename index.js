import * as contacts from "./contacts.js";
import { Command } from "commander";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
/**
 * Call function depends on action name
 * @param {{action: string, id: string, name: string, email: string, phone: string}} - Object of params
 * @returns {void}
 */

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      return console.log(await contacts.listContacts());

    case "get":
      return console.log(await contacts.getContactById(id));

    case "add":
      const contact = await contacts.addContact(name, email, phone);
      return console.log(contact);

    case "remove":
      return console.log(await contacts.removeContact(id));

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
