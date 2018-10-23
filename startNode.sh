#!/usr/bin/env bash

echo "$1"
if [[ "$1" = "--delete-all-blocks" ]] ; then
    nodeos -e -p eosio --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin --delete-all-blocks

else
    nodeos -e -p eosio --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin
fi


