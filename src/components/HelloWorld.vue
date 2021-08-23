<template>
  <div class="container" id="container">
  </div>
</template>

<script>
import G6 from '@antv/g6';
import {getGraph} from '../utils/api.js'

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
    this.initData();
    console.log(getGraph())
  },
  methods: {
    initData() {// 初始化
      const data = {
        // 点集
        nodes: [
          {
            id: 'node1', // String，该节点存在则必须，节点的唯一标识
            x: 100, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
          },
          {
            id: 'node2', // String，该节点存在则必须，节点的唯一标识
            x: 300, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
          },
        ],
        // 边集
        edges: [
          {
            source: 'node1', // String，必须，起始点 id
            target: 'node2', // String，必须，目标点 id
          },
        ],
      };
      const width = document.getElementById('container').scrollWidth
      const height = document.getElementById('container').scrollHeight || 500
      const graph = new G6.Graph({
        container: 'container',
        width,
        height,
        modes: {
          // 拖动，缩放
          default: ['drag-canvas', 'drag-node', 'zoom-canvas']
        },
        layout: {
          // 拓扑图的类型
          type: 'fruchterman',
          gravity: 7,
          speed: 5
        },
        animate: true,
        defaultNode: {
          size: 30,
          style: {
            lineWidth: 2,
            stroke: '#5B8FF9',
            fill: '#C6E5FF'
          },
          // 圈内字体大小
          labelCfg: {
            style: {
              fontSize: 10
            }
          }
        },
        defaultEdge: {
          size: 1,
          color: '#e2e2e2',
          style: {
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#e2e2e2'
            }
          }
        }
      })
      graph.data(data); // 读取 Step 2 中的数据源到图上
      graph.render(); // 渲染图
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
