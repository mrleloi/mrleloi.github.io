/*!
 * mandatoryIcon add-on
 * This add-ons shows required icons for mandatory fields
 *
 * @link        http://formvalidation.io/addons/mandatoryIcon/
 * @license     http://formvalidation.io/license/
 * @author      https://twitter.com/formvalidation
 * @copyright   (c) 2013 - 2015 Nguyen Huu Phuoc
 * @version     v0.1.1, built on 2015-04-08 3:37:58 PM
 */
!function(a){FormValidation.AddOn.mandatoryIcon={html5Attributes:{icon:"icon"},init:function(b,c){if(c&&c.icon){var d=this,e=b.getNamespace(),f=b.getOptions();for(var g in f.fields)b.getFieldElements(g).each(function(){var h=a(this),i=h.data(e+".icon"),j=f.fields[g].validators;j.notEmpty&&j.notEmpty.enabled!==!1&&f.fields[g].enabled!==!1&&d._isEmpty(b,h)&&i.addClass(c.icon).show()});var h=c.icon.split(" "),i={};if(i[b.STATUS_VALID]=[],i[b.STATUS_INVALID]=[],i[b.STATUS_VALIDATING]=[],f.icon){var j={};j[b.STATUS_VALID]=f.icon.valid?f.icon.valid.split(" "):[],j[b.STATUS_INVALID]=f.icon.invalid?f.icon.invalid.split(" "):[],j[b.STATUS_VALIDATING]=f.icon.validating?f.icon.validating.split(" "):[];for(var k in j){for(var l=0;l<h.length;l++)-1===a.inArray(h[l],j[k])&&i[k].push(h[l]);i[k]=i[k].join(" ")}}b.getForm().on(f.events.fieldStatus,function(a,g){var h=g.element.data(e+".icon"),j=g.fv.getOptions(g.field).validators;j.notEmpty&&j.notEmpty.enabled!==!1&&f.fields[g.field].enabled!==!1&&(h.removeClass(f.icon&&(f.icon.valid||f.icon.invalid||f.icon.validating)?i[g.status]:c.icon),g.status===b.STATUS_NOT_VALIDATED&&d._isEmpty(b,g.element)&&h.addClass(c.icon).show())})}},_isEmpty:function(a,b){return!FormValidation.Validator.notEmpty.validate(a,b)}}}(jQuery);