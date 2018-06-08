/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 OperationSet in the list

sap.ui.require([
	"sap/ui/test/Opa5",
	"alwe/ProdOrderConf/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"alwe/ProdOrderConf/test/integration/pages/App",
	"alwe/ProdOrderConf/test/integration/pages/Browser",
	"alwe/ProdOrderConf/test/integration/pages/Master",
	"alwe/ProdOrderConf/test/integration/pages/Detail",
	"alwe/ProdOrderConf/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "alwe.ProdOrderConf.view."
	});

	sap.ui.require([
		"alwe/ProdOrderConf/test/integration/MasterJourney",
		"alwe/ProdOrderConf/test/integration/NavigationJourney",
		"alwe/ProdOrderConf/test/integration/NotFoundJourney",
		"alwe/ProdOrderConf/test/integration/BusyJourney",
		"alwe/ProdOrderConf/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});