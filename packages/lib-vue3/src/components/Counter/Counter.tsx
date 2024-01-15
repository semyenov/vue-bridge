import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Counter',

  props: {
    max: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
  },

  emits: {
    change: (value: number) => {
      return typeof value === 'number'
    },
  },

  setup({ max, min }, { emit }) {
    const counter = ref(0)

    const increment = () => {
      if (counter.value >= max)
        return

      counter.value++
      emit('change', counter.value)
    }

    const decrement = () => {
      if (counter.value <= min)
        return

      counter.value--
      emit('change', counter.value)
    }

    return {
      counter,

      increment,
      decrement,
    }
  },

  render() {
    return (
      <div class="counter-wrapper">
        <h1 class="counter-title">Counter</h1>
        <div class="counter-buttons">
          <button class="btn" onClick={this.increment}>
            +
          </button>
          <button class="btn" onClick={this.decrement}>
            -
          </button>
        </div>
        <hr />
        <div class="counter-display">
          {this.counter}
        </div>
      </div>
    )
  },
})
