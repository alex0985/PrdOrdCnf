/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

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
		"alwe/ProdOrderConf/test/integration/NavigationJourneyPhone",
		"alwe/ProdOrderConf/test/integration/NotFoundJourneyPhone",
		"alwe/ProdOrderConf/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});