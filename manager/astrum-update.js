#!/usr/bin/env node
var Command = require('commander').Command,
    program = require('commander'),
    fs = require('fs-extra'),
    chalk = require('chalk'),
    inquirer = require('inquirer'),
    utils = require('./utils');

utils.init();

program
    .usage('[path]')
    .description(chalk.yellow('Update an existing pattern library.'));

/**
 * Override argv[1] so that usage command is
 * formatted correctly.
 */
process.argv[1] = 'astrum update';

program.parse(process.argv);

/**
 * Update pattern library.
 */
oldVersion = utils.$data.version;
newVersion = utils.$pjson.version;

if(newVersion !== oldVersion) {
    utils.update(function () {
        console.log();
        console.log(chalk.grey('----------------------------------------------------------------'));
        console.log(chalk.green('\u2713 Pattern library successfully updated from ' + oldVersion + ' to ' + newVersion + '.'));
        console.log(chalk.grey('----------------------------------------------------------------'));
        console.log();
    });
} else {
    console.log();
    console.log(chalk.grey('----------------------------------------------------------------'));
    console.log(chalk.yellow('Pattern library is up-to-date.'));
    console.log(chalk.grey('----------------------------------------------------------------'));
    console.log();
}