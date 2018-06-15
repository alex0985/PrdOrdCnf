/*global location */
sap.ui.define([
	"alwe/ProdOrderConf/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"alwe/ProdOrderConf/model/formatter",
	"sap/m/Dialog"
], function(BaseController, JSONModel, formatter, Dialog) {
	"use strict";

	return BaseController.extend("alwe.ProdOrderConf.controller.Detail", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
		onInit: function() {
			
			var order = this.getOwnerComponent().getModel("selection").getProperty("/order");
			if(order === ""){
				this.getRouter().navTo("master");
			}
			
			var oMessageProcessor = new sap.ui.core.message.ControlMessageProcessor();
			var oMessageManager = sap.ui.getCore().getMessageManager();
			oMessageManager.registerMessageProcessor(oMessageProcessor);
			
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.attachRoutePatternMatched(this._bindElement, this);
		},
		_bindElement: function(oEvent) {
			var actualPath;
			var oModelSelection = this.getView().getModel("selection");
			actualPath = oModelSelection.getProperty("/opPath");
			if (actualPath !== "") {
				this.byId("operationData").bindElement(actualPath);
				actualPath = actualPath + "/ToHeader";
				this.getView().bindElement({
					path: actualPath
				});
			}
		},
		onPressStartButton: function(oEvent) {
			var confNo = oEvent.getSource().getModel("selection").getProperty("/ConfNo");
			//Leave function, if no confirmation umber 
			if (confNo === "") {
				return;
			}
			var that = this;
			if (!oDialog) {
				var oDialog = this._idCheckDialog(that, confNo, "start");
			}
			oDialog.open();
		},
		onPressPauseButton: function(oEvent) {
			var confNo = oEvent.getSource().getModel("selection").getProperty("/ConfNo");
			//Leave function, if no confirmation umber 
			if (confNo === "") {
				return;
			}
			var that = this;
			if (!oDialog) {
				var oDialog = this._idCheckDialog(that, confNo, "pause");
			}
			oDialog.open();
		},

		_postStartWork: function(User, ConfNo, oModel) {
			oModel.callFunction("/StartWork", {
				method: "POST",
				urlParameters: {
					"User": User,
					"ConfNo": ConfNo
				},
				success: function(oContent) {
					sap.m.MessageToast.show(oContent.Name1 + " " + oContent.Name2 + " started to work!");
				},
				error: function(error) {
				}
			});
		},
		
		_postPauseWork: function(User, ConfNo, oModel) {
			oModel.callFunction("/PauseWork", {
				method: "POST",
				urlParameters: {
					"User": User,
					"ConfNo": ConfNo
				},
				success: function(oContent) {
					sap.m.MessageToast.show(oContent.Name1 + " " + oContent.Name2 + " paused his work!");
				},
				error: function(error) {
					var oMessageManager = sap.ui.getCore().getMessageManager();
				}
			});
		},
		
		_postFinishWork: function(User, ConfNo, oModel) {
			oModel.callFunction("/FinishWork", {
				method: "POST",
				urlParameters: {
					"User": User,
					"ConfNo": ConfNo
				},
				success: function(oContent) {
					sap.m.MessageToast.show(oContent.Name1 + " " + oContent.Name2 + " paused his work!");
				},
				error: function(error) {
				}
			});
		},
		_idCheckDialog: function(that, confNo, process) {
			
			if (!oInput) {
				var oInput = new sap.m.Input("idInputField", {
					"maxLength": 10
				});
			}

			oInput.attachBrowserEvent('keypress', function(oKeypressEvent) {
				if (oKeypressEvent.key === "Enter") {
					var inputValue = oInput.getValue();
					if (inputValue !== "") {
						that.getView().getModel().callFunction("/CheckUserData", {
							method: "GET",
							urlParameters: {
								"User": inputValue
							},
							success: function(oContent) {
								oDialog.close();
								oDialog.destroy();

								switch (process) {
									case "start":
										that._postStartWork(inputValue, confNo, that.getView().getModel());
										break;
									case "pause":
										that._postPauseWork(inputValue, confNo, that.getView().getModel());
										break;
									case "finish":
										that._postFinishWork(inputValue, confNo, that.getView().getModel());
										break;
									default:
								}
							},
							error: function(oError) {
								var oMessageManager = sap.ui.getCore().getMessageManager();
								oMessageManager.addMessages(oError);
								oInput.setValue("");
								sap.m.MessageToast.show("User not Valid!");
							}
						});

					} else {
						oInput.setValue("");
						sap.m.MessageToast.show("Please Enter ID!");
					}
				}
			});

			var oDialog = new Dialog({
				title: 'ID Check',
				type: 'Message',
				content: [oInput],
				endButton: new sap.m.Button({
					text: 'Cancel',
					press: function() {
						oDialog.close();
					}
				}),
				afterClose: function() {
					oDialog.destroy();
				}
			});
			return oDialog;
		}
	});

});