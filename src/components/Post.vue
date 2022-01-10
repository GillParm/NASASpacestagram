<template>
  <div class="post-container">
    <ShareModal class="share-modal" v-show="isShareVisible" @close="closeModal" :img="img"/>
    <div class="image-container">
      <img class="image" loading="lazy" :src="img" :alt="title">
      <div v-show="likeAnimation" class="lds-heart"><div></div></div>
    </div>
    <div class="text-container">
      <h3>{{ title }} - {{ date }}</h3>
      <p v-show="!readMore">{{ description.slice(0, 300) }}...
        <a class="read-more" @click.prevent="activateReadMore" href="#">read more</a>
      </p>
      <p v-show="readMore">{{ description }}
        <a class="read-more" @click.prevent="activateReadMore" href="#">read less</a>
      </p>
      <div class="button-holder">
        <button v-show="!liked" class="btn-like" v-on:click="like">Like</button>
        <button v-show="liked" class="btn-liked" v-on:click="unlike">Liked</button>
        <button class="btn-share" v-on:click="showModal">Share</button>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ShareModal from './ShareModal.vue'

export default defineComponent({
  name: 'Post',
  components: {
    ShareModal
  },
  data () {
    return {
      liked: false,
      likeAnimation: false,
      isShareVisible: false,
      readMore: false
    }
  },
  props: {
    img: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  methods: {
    like () {
      this.liked = !this.liked
      this.likeAnimation = true
      this.$store.dispatch('addToLiked', this.title)
      setTimeout(() => {
        this.likeAnimation = false
      }, 800)
    },
    unlike () {
      this.liked = !this.liked
      this.$store.dispatch('removeFromLiked', this.title)
    },
    showModal () {
      this.isShareVisible = true
    },
    closeModal () {
      this.isShareVisible = false
    },
    activateReadMore () {
      this.readMore = !this.readMore
    }
  },
  mounted () {
    // check if post is liked already
    const likedObject = window.localStorage.getItem('vuex')
    if (likedObject) {
      const liked = JSON.parse(likedObject).liked
      this.liked = !!liked.includes(this.title)
    }
  }
}
)
</script>

<style scoped lang="scss">
.share-modal{
  z-index: 10;
}
.post-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 15px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
}
.image-container {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.image {
  max-width: 100%;
  max-height: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.text-container {
  padding: 0 15px 0 15px;
}
h3 {
  font-size: 1rem;
}
p {
  font-size: 0.8rem;
}
.btn-like {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  cursor: pointer;
  border-width: thin;
  border-color: lightgray;
  margin-bottom: 15px;
  &:hover {
    background: #000000;
    color: #FFFFFF;
  }
}
.btn-liked {
  padding: 5px 10px;
  border-radius: 5px;
  background-color: rgb(255, 109, 112);
  font-size: 0.8rem;
  cursor: pointer;
  color: white;
  border-width: thin;
  border-color: rgb(255, 109, 112);
  margin-bottom: 15px;
}
.btn-share {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  cursor: pointer;
  border-width: thin;
  border-color: lightgray;
  margin-bottom: 15px;
  margin-left: 10px;
  &:hover {
    background: #000000;
    color: #FFFFFF;
  }
}
.read-more {
  cursor: pointer;
  color: grey;
}
//  heart from https://loading.io/css/
.lds-heart {
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
  transform-origin: 40px 40px;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}
.lds-heart div {
  top: 32px;
  left: 32px;
  position: absolute;
  width: 32px;
  height: 32px;
  background: #ff6464;
  animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}
.lds-heart div:after,
.lds-heart div:before {
  content: " ";
  position: absolute;
  display: block;
  width: 32px;
  height: 32px;
  background: #ff6464;
}
.lds-heart div:before {
  left: -24px;
  border-radius: 50% 0 0 50%;
}
.lds-heart div:after {
  top: -24px;
  border-radius: 50% 50% 0 0;
}
@keyframes lds-heart {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
}

</style>
