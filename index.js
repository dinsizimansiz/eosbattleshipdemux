const { BaseActionWatcher } = require('demux');
const { NodeosActionReader } = require('demux-eos');

const ActionHandler = require('./ActionHandler');

const updaters = require('./updaters');
const EOSIO_HTTP_URL = "http://127.0.0.1:8888";

const effects = require('./effects');


const actionHandler = new ActionHandler(updaters, effects);
const actionReader = new NodeosActionReader(
    EOSIO_HTTP_URL,
    1
);

const actionWatcher = new BaseActionWatcher(
    actionReader,
    actionHandler,
    250
);



module.exports = {
    actionWatcher
};