import $ from 'jquery'
import Slick from "vue-slick"
import {
  EventBus
} from "../event-bus";
import "../../../node_modules/slick-carousel/slick/slick.css";

export default {
  name: 'Youtube',
  components: {
    Slick
  },
  props: {},
  data() {
    return {
    }
  },
  computed: {

  },
  mounted() {

    // Youtube slick initialization
    $(".youtube-slick").slick({
      // dots: true, FIXME: if we want dots or not
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear'
    });

    // Event Bus's to update information in real time
    EventBus.$on("response-event", currentGame => {
      this.getYoutube(currentGame);

    });
  },
  methods: {

    // After user serches this will populate the YouTube viewer
    getYoutube: function (game) {
      // youtube ajax call
      $.ajax({
        type: "get",
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=review " + game + "&type=videos&key=" + process.env.VUE_APP_YOUTUBE_KEY,
        success: function (data1) {

          var itemNo = 0;
          for (var index = 0; index < data1.items.length; index++) {

            if (itemNo < 5) {
              $(".Slide" + (index + 1) + "youtube").attr("src", "https://www.youtube.com/embed/" + data1.items[index].id.videoId);
              itemNo++;
            }
          }
        },
        fail: function () {}
      });
    }
  }
}