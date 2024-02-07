<template>
  <div>
    <div style="height: 100vh">
      <el-table
        :data="resultdata"
        stripe
        style="width: 100%"
        height="100%">
        <el-table-column
          prop="devicename"
          label="姓名"
          fixed
          align="center"
          width="150">
        </el-table-column>

        <el-table-column
          v-for="(item, i) in newfordata"
          :label="item.lable"
          align="center">
          <el-table-column
            align="center"
            prop="province"
            label="回答正确数"
            width="120">
            <template slot-scope="scope">
              <span>
                {{ scope.row[`gametype${i}`] ? scope.row[`gametype${i}`].correct_count : "/" }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="city"
            label="回答错误数"
            width="120">
            <template slot-scope="scope">
              <span class="errcolor">
                {{ scope.row[`gametype${i}`] ? scope.row[`gametype${i}`].incorrect_count : "/" }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <!-- <el-table-column
          align="center"
          prop="creect"
          label="正确率"
          width="150">
          <template slot-scope="scope">
            <el-tag
              :type="Number(scope.row.creect) >= 60 ? 'primary' : 'danger'"
              disable-transitions
              >{{ scope.row.creect }}%</el-tag
            >
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
import { gethxyList } from "../../api/table.js";
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      resultdata: [],
      newfordata: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // gethxyList({
    //   headers: {
    //     "X-Requested-With": "XMLHttpRequest",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // }).then((res) => {
    //   console.log("测试", res);
    // });
    axios({
      method: "get",
      url: "https://miniprogram.v5ky.com/api/v1/mqtt/getKeyboardDataImpl",
    }).then((res) => {
      console.log("测试", res.data.data);
      this.questionsNum = 0; //总题目数量
      res.data.data.forEach((item, i) => {
        if (item.gametype > this.questionsNum) {
          this.questionsNum = item.gametype;
        }
      });
      this.questionsNum++;
      console.log(this.questionsNum);
      for (let index = 1; index <= this.questionsNum; index++) {
        this.newfordata.push({
          lable: `问答游戏${index}`,
        });
      }
      const transformedData = res.data.data.reduce((acc, obj) => {
        const { accuracy, devicename, gametype, correct_count, incorrect_count, id } = obj;

        if (!acc[devicename]) {
          acc[devicename] = { accuracy, devicename, id };
        }

        acc[devicename][`gametype${gametype}`] = { correct_count, incorrect_count };

        return acc;
      }, {});

      this.resultdata = Object.values(transformedData);
      console.log(this.resultdata);
    });
    // this.fordatas.forEach((item, i) => {
    //   if (item.gametype > questionsNum) {
    //     questionsNum = item.gametype;
    //   }
    // });
    // console.log("总题目数量=", questionsNum);
    // for (let index = 1; index <= questionsNum; index++) {
    //   // const element = array[index];
    //   console.log(index);
    //   this.fordatas.forEach((item, i) => {
    //     if(index == 1){
    //       newfordata.push({
    //         name:item.devicename,
    //         `gametype${index}`:{
    //           incorrect_count:item.incorrect_count,
    //           correct_count:itemcorrect_count.
    //         }
    //       })
    //     }else{
    //       if()
    //     }
    //     if(item.gametype == index){

    //     }
    //   });
    // }
  },
  methods: {},
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.errcolor {
  color: #f56c6c;
}
</style>
