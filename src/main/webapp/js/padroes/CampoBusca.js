/**
 * Created with IntelliJ IDEA.
 * User: diego
 * Date: 18/07/13
 * Time: 14:11
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ext.pad.CampoBusca', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.campoBusca',
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',
    hasSearch : false,
    paramName : 'query',
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        me.on('specialkey', function(f, e){
            if (e.getKey() == e.ENTER) {
                me.onTrigger2Click();
            }
        });
        me.store.remoteFilter = true;
    },

    afterRender: function(){
        this.callParent();
        this.triggerCell.item(0).setDisplayed(false);
    },

    onTrigger1Click : function(){
        var me = this;

        if (me.hasSearch) {
            me.setValue('');
            me.store.load();
            me.hasSearch = false;
            me.triggerCell.item(0).setDisplayed(false);
            me.updateLayout();
        }
    },

    onTrigger2Click : function(){
        var me = this,
            value = me.getValue();
        if (value.length > 0) {
            me.store.load({
                params: {
                    paramName: me.paramName,
                    value: value,
                    start: 0
                }
            });
            me.hasSearch = true;
            me.triggerCell.item(0).setDisplayed(true);
            me.updateLayout();
        } else {
            if (me.hasSearch) {
                me.setValue('');
                me.store.load();
                me.hasSearch = false;
                me.triggerCell.item(0).setDisplayed(false);
                me.updateLayout();
            }
        }
    }
});