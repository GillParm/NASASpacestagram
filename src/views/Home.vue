<template>
  <div  class="app-container">
    <div v-show="images.length < 1" class="loader"></div>
    <div v-show="images.length > 0" class="feed-container">
      <h1>Spacestagram</h1>
      <h2>Brought to you by NASA's Astronomy Photo of the Day (APOD) API</h2>
      <Post v-for="(img,i) in images"
            :key="i"
            :img="img.url"
            :title="img.title"
            :description="img.explanation"
            :date="img.date"
      />
      <div class="loader2"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import Post from '@/components/Post.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Post
  },
  data () {
    return {
      images: [] as Array<never>,
      datePicker: 6
    }
  },
  computed: {
    currentDate () {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${year}-${month}-${day}`
    },
    endDate () {
      const date = new Date()
      date.setDate(date.getDate() - this.datePicker)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${year}-${month}-${day}`
    }
  },
  methods: {
    getNextImages () {
      window.onscroll = async () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
          try {
            const prevEndDate = this.endDate
            this.datePicker += 6
            const response = await axios.get(`${process.env.VUE_APP_NASA_API_URL}?api_key=${process.env.VUE_APP_NASA_API_KEY}&start_date=${this.endDate}&end_date=${prevEndDate}`)
            response.data.pop()
            this.images = this.images.concat(response.data.reverse())
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
  },
  async beforeMount () {
    try {
      const response = await axios.get(`${process.env.VUE_APP_NASA_API_URL}?api_key=${process.env.VUE_APP_NASA_API_KEY}&start_date=${this.endDate}&end_date=${this.currentDate}`)
      this.images = response.data.reverse()
    } catch (error) {
      console.log(error)
    }
  },
  mounted () {
    this.getNextImages()
  }
})
</script>
<style scoped lang="scss">
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  max-width:450px;
  margin: 0 auto;
}
.feed-container {
  width: 90%;
}
h2 {
  font-size: 0.8rem;
  font-weight: normal;
  margin-bottom: 1rem;
  color: #777777;
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
}

h1 {
  font-size: 1.5rem;
}
//loader css from https://codepen.io/ivillamil/pen/dokmG
.loader  {
  animation: rotate 1s infinite;
  height: 50px;
  width: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}

.loader:before,
.loader:after {
  border-radius: 50%;
  content: '';
  display: block;
  height: 20px;
  width: 20px;
}
.loader:before {
  animation: ball1 1s infinite;
  background-color: #cb2025;
  box-shadow: 30px 0 0 #f8b334;
  margin-bottom: 10px;
}
.loader:after {
  animation: ball2 1s infinite;
  background-color: #00a096;
  box-shadow: 30px 0 0 #97bf0d;
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg) scale(0.8);
    -moz-transform: rotate(0deg) scale(0.8);
  }
  50% {
    -webkit-transform: rotate(360deg) scale(1.2);
    -moz-transform: rotate(360deg) scale(1.2);
  }
  100% {
    -webkit-transform: rotate(720deg) scale(0.8);
    -moz-transform: rotate(720deg) scale(0.8);
  }
}

@keyframes ball1 {
  0% {
    box-shadow: 30px 0 0 #f8b334;
  }
  50% {
    box-shadow: 0 0 0 #f8b334;
    margin-bottom: 0;
    -webkit-transform: translate(15px,15px);
    -moz-transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #f8b334;
    margin-bottom: 10px;
  }
}

@keyframes ball2 {
  0% {
    box-shadow: 30px 0 0 #97bf0d;
  }
  50% {
    box-shadow: 0 0 0 #97bf0d;
    margin-top: -20px;
    -webkit-transform: translate(15px,15px);
    -moz-transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #97bf0d;
    margin-top: 0;
  }
}
.loader2  {
  animation: rotate 1s infinite;
  height: 50px;
  width: 50px;
  margin: 0 auto;
}

.loader2:before,
.loader2:after {
  border-radius: 50%;
  content: '';
  display: block;
  height: 20px;
  width: 20px;
}
.loader2:before {
  animation: ball1 1s infinite;
  background-color: #cb2025;
  box-shadow: 30px 0 0 #f8b334;
  margin-bottom: 10px;
}
.loader2:after {
  animation: ball2 1s infinite;
  background-color: #00a096;
  box-shadow: 30px 0 0 #97bf0d;
}
</style>
