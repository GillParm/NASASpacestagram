<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <h3>
          Share Image
        </h3>
      </header>
      <div class="button-holder">
        <button
          type="button"
          class="btn-modal"
          @click="share"
        >
          Copy URL
        </button>
        <button
          type="button"
          class="btn-modal"
          @click="close"
        >
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
export default {
  name: 'ShareModal',
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    close () {
      this.$emit('close')
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    share () {
      const notyf = new Notyf(
        {
          ripple: true,
          position: {
            x: 'center',
            y: 'top'
          }
        }
      )
      navigator.clipboard.writeText(this.img)
        .then(() => {
          notyf.success('Image URL copied to clipboard')
        })
      this.close()
    }
  },
  props: {
    img: {
      type: String,
      required: true
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
      notyf: new Notyf()
    }
  }
}
</script>
<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
}
.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  text-align: center;
}
.modal-body {
  position: relative;
  padding: 20px 10px;
}
.button-holder {
  position: relative;
  display: flex;
  flex-direction: column;
}

.btn-modal {
  background: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 5px;
  color: #000000;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 10px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background: #000000;
    color: #FFFFFF;
  }
}

</style>
