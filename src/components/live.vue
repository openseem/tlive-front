<template>
  <video class="full-height full-width" ref="video" controls></video>
</template>

<script>
import Hls from "hls.js";

export default {
  name: "live",
  components: {},
  data() {
    return {};
  },
  mounted() {
    let hls = new Hls();
    // hls.loadSource("http://127.0.0.1:8088/" + this.courseId + ".m3u8")
    hls.loadSource("http://www.streambox.fr/playlists/test_001/stream.m3u8");
    hls.attachMedia(this.$refs.video);
  },
  computed: {},
  props: {
    courseId: Number,
  },
  methods: {
    videoPause() {
      if (this.Hls) {
        this.$refs.video.pause();
        this.Hls.destroy();
        this.Hls = null;
      }
    },
    beforeDestroy() {
      this.videoPause();
    },
  },
};
</script>

<style scoped>
video::-webkit-media-controls-fullscreen-button {
  display: none;
}

/* //进度条 */
video::-webkit-media-controls-timeline {
  display: none;
}

/* //观看的当前时间 */
video::-webkit-media-controls-current-time-display {
  display: none;
}

/* //剩余时间 */
video::-webkit-media-controls-time-remaining-display {
  display: none;
}

video {
  height: 80%;
  width: 80%;
  right: 10%;
  object-fit: fill;
  position: absolute;
}
</style>
