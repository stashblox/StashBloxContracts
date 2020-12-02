#!/usr/bin/env node

const ejs = require('ejs');
const StashBloxData = require('../build/contracts/StashBlox.json');

// console.log(StashBloxData.abi);
// console.log(StashBloxData.userdoc);
// console.log(StashBloxData.devdoc);
// for (var i in StashBloxData) console.log(i);

const generateDoc = (data) => {
  let contractDoc = {
    contractName: data.contractName || "",
    title: data.devdoc.title || "",
    updatedAt: data.updatedAt || "",
    compiler: data.compiler || "",
    author: data.devdoc.author || "",
    devdoc: data.devdoc.details || "",
    userdoc: data.userdoc.notice || ""
  };

  let documentedABI = {};
  let apiList = {};

  for (var index = 0; index < data.abi.length; index++) {
    let item = data.abi[index];
    item.name = item.name || item.type;
    let sign = item.name + "(";
    let types = [];
    if (item.inputs !== undefined) for (var i = 0; i < item.inputs.length; i++)
      types.push(item.inputs[i].type);
    sign += types.join(",") + ")";
    //console.log(sign);
    item.sign = sign;

    const userdocList = item.type == "event" ? data.userdoc.events : data.userdoc.methods;
    if (userdocList !== undefined && sign in userdocList) {
      const userdoc = userdocList[sign];
      if (userdoc !== undefined && "notice" in userdoc) {
        item.userdoc = userdoc["notice"];
      }
    }

    const devdocList = item.type == "event" ? data.devdoc.events : data.devdoc.methods;
    if (devdocList !== undefined && sign in devdocList) {
      const devdoc = devdocList[sign];
      if (devdoc !== undefined && "details" in devdoc) {
        item.devdoc = devdoc["details"];
      }
      if (item.inputs !== undefined){
        for (var i = 0; i < item.inputs.length; i++) {
          let paramName = item.inputs[i].name;
          if (devdoc.params !== undefined && paramName in devdoc.params) {
            item.inputs[i].devdoc = devdoc.params[paramName];
          }
        }
      }
      if (item.outputs !== undefined){
        for (var i = 0; i < item.outputs.length; i++) {
          let returnName = item.outputs[i].name || ("_" + i);
          if (devdoc.returns !== undefined && returnName in devdoc.returns) {
            item.outputs[i].devdoc = devdoc.returns[returnName];
          }
        }
      }
    }
    let itemType = ["constructor", "receive"].indexOf(item.type) == -1 ?
                   (item.type == "function" ? item.stateMutability : item.type ) :
                   "special";
    //console.log(itemType);

    if (apiList[itemType] === undefined) apiList[itemType] = [];
    //console.log(apiList[itemType]);
    apiList[itemType].push(item.sign);
    documentedABI[item.sign] = item;
  }
  contractDoc.api = documentedABI;
  contractDoc.apiList = apiList;
  return contractDoc;
}

// const functionGroups = {
//   "event": "Events",
//   "payable": "Payable functions",
//   "nonpayable": "Non payable functions",
//   "views": "Views"
// }
// const doc = generateDoc(StashBloxData);
//console.log(doc.apiList);

ejs.renderFile("./utils/doctemplate.html", generateDoc(StashBloxData), {outputFunctionName: "echo"}, function(err, str) {
    if (err !== undefined && err !== null) {

      console.log("ERROR", err);
      return;
    }
    console.log(str);
});
