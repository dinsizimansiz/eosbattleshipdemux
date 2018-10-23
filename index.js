const { BaseActionWatcher } = require('demux');
const { NodeosActionReader } = require('demux-eos');

const ActionHandler = require('./ActionHandler');

const updaters = require('./updaters');
const EOSIO_HTTP_URL = "127.0.0.1:8888/";

const effects = require('./effects');


const actionHandler = new ActionHandler(updaters, effects);
const actionReader = new NodeosActionReader(
    EOSIO_HTTP_URL,
    0
);

const actionWatcher = new BaseActionWatcher(
    actionReader,
    actionHandler,
    250
);



module.exports = {
    actionWatcher
};