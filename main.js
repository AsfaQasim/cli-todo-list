#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
let condition = true;
while (condition) {
    const todoActions = await inquirer.prompt([
        {
            name: "Action",
            type: "list",
            message: chalk.blue("Select the following action"),
            choices: ["Add Item", "Remove Item", "Update Item", "Check Item"]
        }
    ]);
    //for Add Item in the list
    if (todoActions.Action === "Add Item") {
        const addItem = await inquirer.prompt([
            {
                name: "Item",
                type: "input",
                message: chalk.red("What do you want to add in a list?")
            },
            {
                name: "Confirmation",
                type: "confirm",
                message: chalk.red("Are you sure want to add todos"),
            }
        ]);
        if (addItem.Confirmation === condition) {
            if (addItem.Item.length >= 2) {
                todos.push(addItem.Item);
            }
            else {
                console.log(chalk.green("Cannot be empty, please enter an item to add in your list"));
            }
        }
    }
    // for remove item in the list 
    else if (todoActions.Action === "Remove Item") {
        if (todos.length === 0) {
            console.log(chalk.red("Nothing to Remove"));
            continue;
        }
        const removeItem = await inquirer.prompt([
            {
                name: "items",
                type: "list",
                message: (chalk.red("Which item do you want to remove?")),
                choices: todos,
            }
        ]);
        const index = todos.indexOf(removeItem.items);
        if (index > -1) {
            todos.splice(index, 1);
        }
    }
    // for update item in the list
    else if (todoActions.Action === "Update Item") {
        if (todos.length === 0) {
            console.log(chalk.red("Nothing to update"));
            continue;
        }
        const updateItems = await inquirer.prompt([
            {
                name: "item",
                type: "list",
                message: (chalk.blue("Which item do you want to update")),
                choices: todos,
            }
        ]);
        const updateIndex = todos.indexOf(updateItems.item);
        if (updateIndex > -1) {
            const newItem = await inquirer.prompt([
                {
                    name: "newItem",
                    type: "input",
                    messages: (chalk.blue("What's the new item?"))
                }
            ]);
            todos[updateIndex] = newItem.newItem;
        }
    }
    // for check items in the list 
    else if (todoActions.Action === "Check Item") {
        if (todos.length === 0) {
            console.log(chalk.blue("Nothing to check"));
            continue;
        }
        console.log(chalk.green("your items"));
        todos.forEach((val, ind) => {
            console.log(`${ind + 1}: ${val}`);
        });
        break;
    }
}
