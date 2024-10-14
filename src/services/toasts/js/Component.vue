<template>
  <transition
    :enter-active-class="transition.enter"
    :leave-active-class="transition.leave"
  >
    <div class=" px-4 py-2 pointer-events-none sm:p-1 sm:items-start sm:justify-end  flex justify-end items-center">
      <div
        v-show="isActive"
        :class="[{
          'border border-ocean_green' :type ==='success',
          'border border-red-700' :type ==='error',
          'border border-boston_blue' :type ==='info',
          'border border-yellow-600' :type ==='warning',
        },`v-toast__item--${position}`]"
        class="max-w-md w-full shadow-lg rounded-lg pointer-events-auto justify-end"
        @click="whenClicked"
        @mouseleave="toggleTimer(false)"
        @mouseover="toggleTimer(true)"
      >
        <div class="flex rounded-lg ring-1 ring-black ring-opacity-5 ">
          <div class="w-0 flex-1 p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0 pt-0.5">
                <template v-if="type==='success'">
                  <div class="text-green-500 rounded-full toast-success mr-3 border border-ocean_green">
                    <svg
                      class="bi bi-check"
                      fill="currentColor"
                      height="1.8em"
                      viewBox="0 0 16 16"
                      width="1.8em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </div>
                </template>
                <template v-else-if="type==='error'">
                  <div class="text-red-500 rounded-full toast-danger mr-3 border border-red-500">
                    <svg
                      class="bi bi-x"
                      fill="currentColor"
                      height="1.8em"
                      viewBox="0 0 16 16"
                      width="1.8em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </div>
                </template>
                <template v-else-if="type==='info'">
                  <div class="text-blue-500 rounded-full toast-info mr-3 border border-boston_blue ">
                    <svg
                      class="bi bi-info"
                      fill="currentColor"
                      height="1.8em"
                      viewBox="0 0 16 16"
                      width="1.8em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                      <circle
                        cx="8"
                        cy="4.5"
                        r="1"
                      />
                    </svg>
                  </div>
                </template>
                <template v-else>
                  <div class="text-orange-500 rounded-full bg-red-300 mr-3 border border-orange-500 ">
                    <svg
                      class="bi bi-exclamation"
                      fill="currentColor"
                      height="1.8em"
                      viewBox="0 0 16 16"
                      width="1.8em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                    </svg>
                  </div>
                </template>
              </div>
              <div class="ml-3 w-0 flex-1">
                <p
                  class="text-sm leading-5 font-medium text-gray-100"
                  v-html="message"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { removeElement } from './helpers.js'
import Timer from './timer.js'
import Positions from './positions.js'
import eventBus from './bus.js'

export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success'
    },
    position: {
      type: String,
      default: Positions.BOTTOM_RIGHT,
      validator (value) {
        return Object.values(Positions).includes(value)
      }
    },
    duration: {
      type: Number,
      default: 3000
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    onDismiss: {
      type: Function,
      default: () => {
      }
    },
    onClick: {
      type: Function,
      default: () => {
      }
    },
    queue: Boolean,
    pauseOnHover: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isActive: false,
      parentTop: null,
      parentBottom: null,
      isHovered: false
    }
  },
  computed: {
    correctParent () {
      switch (this.position) {
        case Positions.TOP:
        case Positions.TOP_RIGHT:
        case Positions.TOP_LEFT:
          return this.parentTop

        case Positions.BOTTOM:
        case Positions.BOTTOM_RIGHT:
        case Positions.BOTTOM_LEFT:
          return this.parentBottom
      }
      return this.parentBottom
    },
    transition () {
      switch (this.position) {
        case Positions.TOP:
        case Positions.TOP_RIGHT:
        case Positions.TOP_LEFT:
          return {
            enter: 'v-toast--fade-in-down',
            leave: 'v-toast--fade-out'
          }

        case Positions.BOTTOM:
        case Positions.BOTTOM_RIGHT:
        case Positions.BOTTOM_LEFT:
          return {
            enter: 'v-toast--fade-in-up',
            leave: 'v-toast--fade-out'
          }
      }
      return {
        enter: 'v-toast--fade-in-up',
        leave: 'v-toast--fade-out'
      }
    }
  },
  beforeMount () {
    this.setupContainer()
  },
  mounted () {
    this.showNotice()
    eventBus.on('toast-clear', this.dismiss)
  },
  beforeUnmount () {
    eventBus.off('toast-clear', this.dismiss)
  },
  methods: {
    setupContainer () {
      this.parentTop = document.querySelector('.v-toast.v-toast--top')
      this.parentBottom = document.querySelector('.v-toast.v-toast--bottom')
      // No need to create them, they already exists
      if (this.parentTop && this.parentBottom) return

      if (!this.parentTop) {
        this.parentTop = document.createElement('div')
        this.parentTop.className = 'v-toast v-toast--top'
      }

      if (!this.parentBottom) {
        this.parentBottom = document.createElement('div')
        this.parentBottom.className = 'v-toast v-toast--bottom'
      }

      const container = document.body
      container.appendChild(this.parentTop)
      container.appendChild(this.parentBottom)
    },

    shouldQueue () {
      if (!this.queue) return false

      return (
        this.parentTop.childElementCount > 0 ||
          this.parentBottom.childElementCount > 0
      )
    },

    dismiss () {
      this.timer.stop()
      clearTimeout(this.queueTimer)
      this.isActive = false

      // Timeout for the animation complete before destroying
      setTimeout(() => {
        this.onDismiss.apply(null, arguments)
        this.$destroy()
        removeElement(this.$el)
      }, 150)
    },

    showNotice () {
      if (this.shouldQueue()) {
        // Call recursively if should queue
        this.queueTimer = setTimeout(this.showNotice, 250)
        return
      }
      this.correctParent.insertAdjacentElement('afterbegin', this.$el)
      this.isActive = true

      this.timer = new Timer(this.dismiss, this.duration)
    },

    whenClicked () {
      if (!this.dismissible) return
      this.onClick.apply(null, arguments)
      this.dismiss()
    },
    toggleTimer (newVal) {
      if (!this.pauseOnHover) return
      newVal ? this.timer.pause() : this.timer.resume()
    }
  }
}
</script>
<style lang="scss">
    $toast-colors: () !default;
    $toast-colors: map-merge(
                    (
                            "success": #28a745,
                            "info": #17a2b8,
                            "warning": #ffc107,
                            "error": #dc3545,
                            "default": #343a40
                    ),
                    $toast-colors
    );

    .toast-danger{
      background: radial-gradient(100% 7876.56% at 0% 50%, rgba(255, 0, 0, 0.05) 0%, rgba(255, 0, 0, 0) 100%), #0E1423;
      border-radius: 12px;
    }
    .toast-info{
      background: radial-gradient(100% 7876.56% at 0% 50%, rgba(0, 194, 255, 0.05) 0%, rgba(0, 194, 255, 0) 100%), #0E1423;
    }
    .toast-success{
      background: radial-gradient(100% 7876.56% at 0% 50%, rgba(128, 255, 0, 0.05) 0%, rgba(128, 255, 0, 0) 100%), #0E1423;
    }

    .v-toast {
        position: fixed;
        display: flex;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 2em;
        overflow: hidden;
        z-index: 1052;
        pointer-events: none;

        &__item {
            display: inline-flex;
            align-items: center;
            animation-duration: 150ms;
            margin: 0.5em 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
            border-radius: 0.25em;
            pointer-events: auto;
            opacity: 0.92;
            color: #fff;
            min-height: 3em;
            cursor: pointer;

            // Colors
            @each $color, $value in $toast-colors {
                &--#{$color} {
                    background-color: $value;
                }
            }

            // Individual toast position
            &.v-toast__item--top, &.v-toast__item--bottom {
                align-self: center;
            }

            &.v-toast__item--top-right, &.v-toast__item--bottom-right {
                align-self: flex-end;
            }

            &.v-toast__item--top-left, &.v-toast__item--bottom-left {
                align-self: flex-start;
            }
        }

        &__text {
            margin: 0;
            padding: 0.5em 1em;
            word-break: break-word;
        }

        &__icon {
            display: none;
        }

        // Notice container positions
        &.v-toast--top {
            flex-direction: column;
        }

        &.v-toast--bottom {
            flex-direction: column-reverse;
        }

        &.v-toast--custom-parent {
            position: absolute;
        }

        @media screen and (max-width: 768px) {
            padding: 0;
            position: fixed !important;
        }
    }

</style>
