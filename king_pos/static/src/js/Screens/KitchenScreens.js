odoo.define('king_pos.KitchenScreens', function (require) {
    'use strict';

    const ReceiptScreen = require('point_of_sale.ReceiptScreen');
    const Registries = require('point_of_sale.Registries');

    const KitchenScreens = (ReceiptScreen) => {
        class KitchenScreens extends ReceiptScreen {
            confirm() {
                this.props.resolve({ confirmed: true, payload: null });
                this.trigger('close-temp-screen');
            }
            whenClosing() {
                this.confirm();
            }
            /**
             * @override
             */
            async printReceipt() {
                await super.printReceipt();
                this.currentOrder._printed = false;
            }
        }
        KitchenScreens.template = 'KitchenScreens';
        return KitchenScreens;
    };

    Registries.Component.addByExtending(KitchenScreens, ReceiptScreen);

    return KitchenScreens;
});