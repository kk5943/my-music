<template>
  <div class="play">
    <div class="top">
      <span class="iconfont icon-fanhui1" @click="hide"></span>
      <div class="name" v-if="name">
        <div class="name">{{ name }}</div>
        <div class="geshou">{{ arname }}</div>
      </div>
    </div>
    <div class="wrapper">
      <div class="great" :class="{ rotate: !isplay }"></div>
      <div class="circle-bg" ref="circle">
        <div class="song-img">
          <img :src="imgurl" v-if="imgurl" alt="" />
          <!-- <img src="http://p2.music.126.net/ZpmLjbjYcTBqTEQht3WIpQ==/1375489050632477.jpg?param=200y200" alt=""> -->
        </div>
      </div>
    </div>
    <!-- <div class="video_playIcon" v-if="!initAudio.play" @click="playAudio">  按钮</div> -->

    <audio
      autoplay
      class="audio"
      ref="audio"
      :src="initAudio.url"
      @pause="handPlay(2, 2)"
      @play="handPlay(1)"
      @loadedmetadata="getAudioLength()"
      @timeupdate="audioTimeUpdate"
      @click="playAudio"
      :loop="xunhuan"
    ></audio>
    <!-- 歌词 -->
    <div class="middle-r" ref="lyricList">
      <div class="lyric-wrapper">
        <div v-if="currentLyric">
          <p ref="lyricLine" class="text" v-for="(line, index) in currentLyric.lines" :key="index">
            <span
              v-show="
                Math.floor(line.time / 1000) == Math.floor(initAudio.currentTime) + 1 ||
                  Math.floor(line.time / 1000) == Math.floor(initAudio.currentTime) - 1 ||
                  Math.floor(line.time / 1000) == Math.floor(initAudio.currentTime) ||
                  Math.floor(line.time / 1000) == Math.floor(initAudio.currentTime) + 2 ||
                  Math.floor(line.time / 1000) == Math.floor(initAudio.currentTime) + 3 ||
                  Math.floor(line.time / 1000) == Math.floor(initAudio.currentTime) + 4 ||
                  Math.floor(line.time / 1000) == Math.floor(initAudio.currentTime) + 5 ||
                  Math.floor(line.time / 1000) == Math.floor(initAudio.currentTime) + 6
              "
              >{{ line.txt }}</span
            >
          </p>
        </div>
      </div>
    </div>
    <div class="bootm">
      <div class="iconbox  love">
        <span class="iconfont icon-shoucang1"></span>
        <span class="iconfont icon-xiazai"></span>
        <span class="iconfont icon-pinglun"></span>
      </div>
      <div class="ft">
        <div class="slider">
          <span class="time">{{ Math.floor(initAudio.currentTime * 1000) | date }}</span>
          <van-slider
            active-color="#fff"
            inactive-color="#666"
            bar-height="2px"
            v-model="initAudio.currentTime"
            :max="initAudio.audioLength"
            @change="changeAudioTime"
          >
            <div slot="button" class="custom-button">
              {{ initAudio.currentTime }}
            </div>
          </van-slider>
          <span class="time">{{ Math.floor(initAudio.audioLength * 1000) | date }}</span>
        </div>
        <div class="iconbox">
          <span class="iconfont icon-danquxunhuan" v-if="this.$store.state.for" @click="totalfor"></span>
          <span class="iconfont icon-liebiaoxunhuan" v-else @click="totalfor"></span>
          <span class="iconfont icon-shangyishoushangyige" @click="lastmusic"></span>
          <span class="iconfont icon-bofang2" style="font-size:50px" v-if="!isplay" @click="playAudio"></span>
          <span class="iconfont icon-zanting" style="font-size:50px" v-else @click="playAudio"></span>
          <span class="iconfont icon-xiayigexiayishou" @click="nextmusic"></span>
          <span class="iconfont icon-chazhaobiaodanliebiao" @click="showPopup"></span>
        </div>
      </div>
    </div>

    <van-popup v-model="show" round position="bottom" :style="{ height: '36%' }">
      <div class="list-title" v-if="$store.state.songlist">
        <span class="iconfont icon-danquxunhuan" v-if="this.$store.state.for" @click="totalfor">
          <span class="xunhuan">单曲循环</span>
        </span>
        <span class="iconfont icon-liebiaoxunhuan" v-else @click="totalfor">
          <span class="xunhuan"> 列表循环</span>
        </span>
        <span class="txt">（共{{ $store.state.songlist.length }}首）</span>
      </div>
      <div v-for="(item, index) in $store.state.songlist" :key="index" class="listbox">
        <div class="left">
          <div class="name">{{ item.name }}</div>
          <div class="geshou">
            <span v-if="item.fee == 8" class="sq">SQ </span>
            {{ item.ar[0].name }}
            <span v-if="item.al.name"> {{ '-' + item.al.name }}</span>
          </div>
        </div>
        <div class="log">
          <span v-if="item.mv != 0" class="iconfont icon-MV"></span>
          <span class="iconfont icon-bofang2" @click="play(item.id)"></span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Lyric from 'lyric-parser'
export default {
  data() {
    return {
      url: '',
      name: '',
      imgurl: '',
      arname: '',
      isplay: false,
      geci: [],
      isboxshow: true,
      show: false,
      xunhuan: false,
      currentLyric: null,
      currentLineNum: 0,
      initAudio: {
        audioLength: 0,
        url: '',
        currentTime: 0, //当前播放时间
        lastTime: null, //标记时间戳
        name: ''
      }
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    playAudio() {
      //播放视频
      if (this.isplay) {
        this.$refs.audio.pause()
      } else {
        Math.abs(this.initAudio.currentTime - this.$refs.audio.currentTime) > 2
          ? (this.$refs.audio.currentTime = this.initaudio.currentTime)
          : ''
        this.$refs.audio.play()
        this.$refs.audio.muted = false
      }
    },
    audioTimeUpdate() {
      //更新时间。节流，每秒触发一次
      let nowTime = Date.now()
      let gapTime = 1000
      if (!this.initAudio.lastTime || nowTime - this.initAudio.lastTime > gapTime) {
        if (this.$refs.audio) {
          let time = this.$refs.audio.currentTime
          this.initAudio.currentTime = time
        }
        this.initAudio.lastTime = nowTime
        console.log(Math.floor(this.initAudio.currentTime))
      }
    },
    changeAudioTime(val) {
      //改变时间
      console.log(val, 'audio')
      if (this.$refs.audio) {
        this.$refs.audio.currentTime = val
        this.currentLyric.seek(val * 1000)
      }
    },
    getAudioLength() {
      //获取音频时长

      this.initAudio.audioLength = this.$refs.audio.duration
      console.log('获取音频时长', this.$refs.audio.duration)
    },
    handPlay(status) {
      //音视频播放暂停

      status == 1 ? (this.isplay = true) : (this.isplay = false)
    },
    hide() {
      this.$store.state.boxshow = false
    },
    getdata() {
      this.$http.get(`/song/url?id=${this.$store.state.id}`).then((res) => {
        this.initAudio.url = res.data.data[0].url
        // 获取歌词
        this.$http.get(`/lyric?id=${this.$store.state.id}`).then((res) => {
          this.geci = res.data.lrc.lyric
          // console.log( this.geci)
          this.currentLyric = new Lyric(this.geci, this.handleLyric)
          console.log(this.currentLyric)
          //    if(this.isplay){
          //     this.currentLyric.play()
          // }
        })
        this.$http.get(`/song/detail?ids=${this.$store.state.id}`).then((res) => {
          this.name = res.data.songs[0].name
          // console.log(res)
          this.$store.state.name = res.data.songs[0].name
          this.imgurl = res.data.songs[0].al.picUrl
          this.$store.state.imgurl = res.data.songs[0].al.picUrl
          this.arname = res.data.songs[0].ar[0].name
          this.$store.state.arname = res.data.songs[0].ar[0].name
        })
      })
    },
    nextmusic() {
      if (this.$store.state.index == this.$store.state.songlist.length - 1) {
        this.$store.state.index = 0
        this.$store.state.id = this.$store.state.songlist[this.$store.state.index].id
      }
      this.$store.state.index++
      this.$store.state.id = this.$store.state.songlist[this.$store.state.index].id
    },
    lastmusic() {
      if (this.$store.state.index == 0) {
        this.$store.state.index = this.$store.state.songlist.length - 1
        this.$store.state.id = this.$store.state.songlist[this.$store.state.index].id
      }
      this.$store.state.index--
      this.$store.state.id = this.$store.state.songlist[this.$store.state.index].id
    },
    showPopup() {
      this.show = true
    },
    play(id) {
      this.$store.state.id = id
      this.show = false
    },
    totalfor() {
      this.$store.state.for = !this.$store.state.for
      this.xunhuan = !this.xunhuan
      if (this.xunhuan) {
        this.$toast('单曲循环')
      } else {
        this.$toast('列表循环')
      }
      //  console.log(  this.$store.state.for)
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum
    }
  },

  watch: {
    isplay(val) {
      if (val) {
        this.$refs.circle.style.animationPlayState = 'running'
      } else {
        this.$refs.circle.style.animationPlayState = 'paused'
      }
    },
    '$store.state.id'() {
      this.getdata()
      this.initAudio.currentTime = 0
    },
    'initAudio.currentTime'() {
      if (this.initAudio.currentTime >= this.initAudio.audioLength - 1 && !this.$store.state.for) {
        this.nextmusic()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.middle-r {
  position: fixed;
  bottom: 160px;
  width: 100%;
}
.lyric-wrapper {
  text-align: center;
}
.text {
  // display: none;
  color: #ddd;
}
.current {
  display: block;
  color: #eee;
}
.top {
  display: flex;
  align-items: center;
  .iconfont {
    font-size: 24px;
    color: #fff;
    margin-right: 5px;
  }
  .name {
    .name {
      color: #fff;
      font-size: 16px;
    }
    .geshou {
      color: #bdc3c7;
    }
  }
}
.ft {
  position: relative;
  bottom: 0;
}
// audio{
//     height: 30px;
//     width: 100%;
//      background-color: #7f8c8d;
// }
.play {
  position: relative;
  background-color: #7f8c8d;
  height: 100%;
}
.wrapper {
  // height: 7.6rem;
  //   height: 80%;
  //   margin: 0.6rem 0;
  position: relative;
  overflow: hidden;
  .great {
    position: absolute;
    z-index: 1;
    left: 50%;
    transform-origin: top left;
    transform: translate(-50%) rotate(0deg);
    transition: transform 0.2s;
    width: 2rem;
    height: 0;
    padding-bottom: 2.5rem;
    background-image: url('https://s2.ax1x.com/2019/09/13/nrJyJP.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &.rotate {
      transform: translate(-50%) rotate(-16deg);
    }
  }
  .circle-bg {
    display: flex;
    justify-content: center;
    width: 80vw;
    margin: 1.4rem auto;
    height: 0;
    padding-bottom: 80vw;
    background-image: url('https://s2.ax1x.com/2019/09/12/n0yYqK.md.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    animation: rotating 24s linear infinite;
    transform-origin: center;
    .song-img {
      border: 1px solid #000;
      width: 3.6rem;
      height: 0;
      padding-bottom: 3.6rem;
      border-radius: 50%;
      margin-top: 1rem;
      overflow: hidden;
      img {
        width: 3.6rem;
        height: 3.6rem;
      }
    }
  }
}
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.custom-button {
  width: 10px;
  color: #fff;
  font-size: 0;
  line-height: 10px;
  text-align: center;
  background-color: #fff;
  border-radius: 100px;
}
.van-slider {
  width: 72%;
}
.slider {
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .time {
    font-size: 13px;
    color: #bdc3c7;
  }
}
.iconbox {
  margin: 9px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  span {
    font-size: 30px;
    color: #bdc3c7;
  }
}

.geci {
  position: absolute;
}
.xunhuan {
  font-size: 17px;
}
// .love{
//   position: absolute;
//   width: 100%;
//   bottom: 160px
// }
.bootm {
  position: fixed;
  bottom: 5px;
  width: 100%;
}
</style>
