const { BaseActionWatcher } = require('demux');
const { NodeosActionReader } = require('demux-eos');
const dbConnection = require("./utils/db");

const ActionHandler = require('./ActionHandler');

const updaters = require('./updaters');
const effects = require('./effects');

const actionHandler = new ActionHandler(updaters, effects, );

const actionReader = new NodeosActionReader(
    process.env.EOSIO_HTTP_URL,
    parseInt(process.env.EOSIO_STARTING_BLOCK, 10)
);

const actionWatcher = new BaseActionWatcher(
    actionReader,
    actionHandler,
    250
);

module.exports = {
    actionWatcher,
    dbConnection
};