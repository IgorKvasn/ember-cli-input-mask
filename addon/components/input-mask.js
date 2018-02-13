/* global moment */

import { scheduleOnce } from '@ember/runloop';

import { isPresent } from '@ember/utils';
import { on } from '@ember/object/evented';
import TextField from '@ember/component/text-field';

export default TextField.extend({


  initializeMask: on('didInsertElement', function() {
    var mask = this.get('mask');

    this.$().inputmask(mask, {
      onBeforeMask: function(value) {
        if (mask === 'mm/dd/yyyy') {
          return moment(new Date(value)).format('L');
        }
      }
    });

    // The input mask changes the value of the input from the original to a
    // formatted version. We need to manually send that change back to the
    // controller.
    // But do this only if initial value is not null/undefined, otherwise
    if (isPresent(this.get('value'))) {
      scheduleOnce('afterRender', this, function(){
        this.set('value',this.$().val());
      });
   }
  }),

  removeMask: on('willDestroyElement', function() {
    this.$().inputmask('remove');
  })
});
